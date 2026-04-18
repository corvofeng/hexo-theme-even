(function (window) {
  'use strict';

  function Even(config) {
    this.config = config;
  }

  Even.prototype.setup = function() {
    var leancloud = this.config.leancloud;

    this.navbar();
    this.responsiveTable();

    if (this.config.toc) {
      this.scrollToc();
      this.tocFollow();
    }
    var fancyboxConfig = this.getFancyboxConfig();
    if (fancyboxConfig.enable) {
      this.fancybox(fancyboxConfig);
    }
    if (leancloud.app_id && leancloud.app_key) {
      this.recordReadings();
    }
    if(this.config.latex) {
      this.renderLaTeX();
    }
    this.backToTop();
  };

  Even.prototype.getFancyboxConfig = function () {
    var fancybox = this.config.fancybox;

    if (fancybox === false || fancybox === null || fancybox === undefined) {
      return { enable: false };
    }

    if (fancybox === true) {
      return { enable: true, type: 'fancyapps' };
    }

    if (typeof fancybox === 'string') {
      return { enable: true, type: fancybox };
    }

    if (typeof fancybox === 'object') {
      return {
        enable: fancybox.enable !== false,
        type: fancybox.type || 'fancyapps',
        selector: fancybox.selector,
        options: fancybox.options
      };
    }

    return { enable: false };
  };

  Even.prototype.getDefaultFancyboxSelector = function () {
    return '.post-content [data-fancybox], .post-content img';
  };

  Even.prototype.getDefaultFancyboxOptions = function () {
    return {
      dragToClose: false,
      wheel: false,
      groupAll: true,
      Toolbar: {
        display: {
          left: ['close'],
          middle: ['counter'],
          right: ['slideshow', 'fullscreen', 'thumbs']
        }
      },
      Carousel: {
        transition: 'fade',
        friction: 0.96,
        preload: 10
      },
      template: {
        closeButton: '<svg><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>'
      },
      Hash: {
        getSlug: function (slide) {
          return (slide && slide.triggerEl && slide.triggerEl.dataset && slide.triggerEl.dataset.slug) ? slide.triggerEl.dataset.slug : '';
        }
      },
      l10n: {
        CLOSE: '关闭',
        NEXT: '下一张',
        PREV: '上一张',
        MODAL: '你可以使用 ESC 键关闭此窗口',
        ERROR: '出错了，请稍后再试',
        IMAGE_ERROR: '图片未找到',
        ELEMENT_NOT_FOUND: '未找到 HTML 元素',
        TOGGLE_SLIDESHOW: '切换幻灯片播放',
        TOGGLE_FULLSCREEN: '切换全屏',
        TOGGLE_THUMBS: '切换缩略图',
        TOGGLE_ZOOM: '切换缩放级别',
        ITERATE_DOWNLOAD: '下载'
      }
    };
  };

  Even.prototype.mergeDeep = function (target, source) {
    if (source === null || source === undefined) return target;
    if (typeof source !== 'object') return target;

    var output = Array.isArray(target) ? target.slice() : Object.assign({}, target);
    Object.keys(source).forEach(function (key) {
      var srcValue = source[key];
      if (srcValue && typeof srcValue === 'object' && !Array.isArray(srcValue)) {
        var base = output[key] && typeof output[key] === 'object' ? output[key] : {};
        output[key] = Even.prototype.mergeDeep(base, srcValue);
      } else {
        output[key] = srcValue;
      }
    });
    return output;
  };

  Even.prototype.navbar = function () {
    var $nav = $('#mobile-navbar');
    var $navIcon = $('.mobile-navbar-icon');

    var slideout = new Slideout({
      'panel': document.getElementById('mobile-panel'),
      'menu': document.getElementById('mobile-menu'),
      'padding': 180,
      'tolerance': 70
    });
    slideout.disableTouch();

    $navIcon.click(function () {
      slideout.toggle();
    });

    slideout.on('beforeopen', function () {
      $nav.addClass('fixed-open');
      $navIcon.addClass('icon-click').removeClass('icon-out');
    });

    slideout.on('beforeclose', function () {
      $nav.removeClass('fixed-open');
      $navIcon.addClass('icon-out').removeClass('icon-click');
    });

    $('#mobile-panel').on('touchend', function () {
      slideout.isOpen() && $navIcon.click();
    });
  };

  Even.prototype.responsiveTable = function () {
    var tables = $('.post-content > table')
    tables.wrap('<div class="table-responsive">')
  };

  Even.prototype.scrollToc = function () {
    var SPACING = 20;
    var $toc = $('.post-toc');
    var $footer = $('.post-footer');

    if ($toc.length) {
      var minScrollTop = $toc.offset().top - SPACING;
      $(window).scroll(function () {
        var tocState = {
          start: {
            'position': 'absolute',
            'top': minScrollTop
          },
          process: {
            'position': 'fixed',
            'top': SPACING
          }
        }
        var scrollTop = $(window).scrollTop();
        if (scrollTop < minScrollTop) {
          $toc.css(tocState.start);
        } else {
          $toc.css(tocState.process);
          
          if($(".post-toc").css("display") != "none"){
            var maxTocTop = $footer.offset().top - $toc.height() - SPACING;
            var tocCenterThreshold = document.documentElement.scrollTop + window.innerHeight / 2;
            if ($(".toc-link.active").offset() != undefined && $(".toc-link.active").offset().top > tocCenterThreshold) {
              var distanceBetween = $(".post-toc").offset().top - $(".toc-link.active").offset().top;
              $(".post-toc").offset({
                  top: Math.min(maxTocTop, tocCenterThreshold + distanceBetween),
              });
            }
            if (maxTocTop < $(".post-toc").offset().top) {
              $(".post-toc").offset({ top: maxTocTop });
            }
          }
        }
      })
    }
  };

  Even.prototype.tocFollow = function () {
    var HEADERFIX = 30;
    var $toclink = $('.toc-link'),
      $headerlink = $('.headerlink');

    $(window).scroll(function () {
      var headerlinkTop = $.map($headerlink, function (link) {
        return $(link).offset().top;
      });
      var scrollTop = $(window).scrollTop();

      for (var i = 0; i < $toclink.length; i++) {
        var isLastOne = i + 1 === $toclink.length,
          currentTop = headerlinkTop[i] - HEADERFIX,
          nextTop = isLastOne ? Infinity : headerlinkTop[i + 1] - HEADERFIX;

        if (currentTop < scrollTop && scrollTop <= nextTop) {
          $($toclink[i]).addClass('active');
        } else {
          $($toclink[i]).removeClass('active');
        }
      }
    });
  };

  Even.prototype.fancybox = function (fancyboxConfig) {
    var type = fancyboxConfig && fancyboxConfig.type ? fancyboxConfig.type : 'fancyapps';

    if (type !== 'jquery' && window.Fancybox && typeof window.Fancybox.bind === 'function') {
      var selector = (fancyboxConfig && fancyboxConfig.selector) ? fancyboxConfig.selector : this.getDefaultFancyboxSelector();
      var options = this.mergeDeep(this.getDefaultFancyboxOptions(), (fancyboxConfig && fancyboxConfig.options) ? fancyboxConfig.options : {});

      try {
        var images = document.querySelectorAll(selector);
        for (var i = 0; i < images.length; i++) {
          var el = images[i];
          if (el && el.tagName === 'IMG' && el.dataset) {
            if (!el.dataset.fancybox) el.dataset.fancybox = 'gallery';
            if (el.alt && !el.dataset.caption) el.dataset.caption = el.alt;
          }
        }
      } catch (e) {
      }

      window.Fancybox.bind(selector, options);
      return;
    }

    if ($.fancybox) {
      $('.post').each(function () {
        $(this).find('.post-content img').each(function () {
          if ($(this).parent('a').length) return;
          var href = 'href="' + this.src + '"';
          var title = 'title="' + this.alt + '"';
          $(this).wrap('<a class="fancybox" ' + href + ' ' + title + '></a>');
        });
      });

      $('.fancybox').fancybox({
        openEffect: 'elastic',
        closeEffect: 'elastic'
      });
    }
  };

  Even.prototype.recordReadings = function () {
    if (typeof AV !== 'object') return;

    var $visits = $('.post-visits');
    var Counter = AV.Object.extend('Counter');
    if ($visits.length === 1) {
      addCounter(Counter);
    } else {
      showTime(Counter);
    }

    function updateVisits(dom, time) {
      var readText = dom.text().replace(/(\d+)/i, time)
      dom.text(readText);
    }

    function addCounter(Counter) {
      var query = new AV.Query(Counter);

      var url = decodeURI($visits.data('url').trim());
      var title = $visits.data('title').trim();

      query.equalTo('url', url);
      query.find().then(function (results) {
        if (results.length > 0) {
          var counter = results[0];
          counter.save(null, {
            fetchWhenSave: true
          }).then(function (counter) {
            counter.increment('time', 1);
            return counter.save();
          }).then(function (counter) {
            updateVisits($visits, counter.get('time'));
          });
        } else {
          var newcounter = new Counter();
          newcounter.set('title', title);
          newcounter.set('url', url);
          newcounter.set('time', 1);

          var acl = new AV.ACL();
          acl.setWriteAccess('*', true)
          acl.setReadAccess('*', true)
          newcounter.setACL(acl)

          newcounter.save().then(function () {
            updateVisits($visits, newcounter.get('time'));
          });
        }
      }, function (error) {
        // eslint-disable-next-line
        console.log('Error:' + error.code + ' ' + error.message);
      });
    }

    function showTime(Counter) {
      const urls = [];
      const counterDict = {};
      $visits.each((i, item) => {
        urls.push(decodeURI($(item).data('url').trim()));
      });

      var query = new AV.Query("Counter");
      query.containedIn('url', urls);
      query.find().then((rlt) => {
        rlt.forEach((rlt) => {
          counterDict[rlt.get('url')] = rlt.get('time');
        });

        $visits.each((i, item) => {
          let title = decodeURI($(item).data('url').trim());
          let count = counterDict[title] || 0
          updateVisits($(item), count);
        });
      });
    }
  };

  Even.prototype.backToTop = function () {
    var $backToTop = $('#back-to-top');

    $(window).scroll(function () {
      if ($(window).scrollTop() > 100) {
        $backToTop.fadeIn(1000);
      } else {
        $backToTop.fadeOut(1000);
      }
    });

    $backToTop.click(function () {
      $('body,html').animate({ scrollTop: 0 });
    });
  };

  Even.prototype.renderLaTeX = function () {
    var loopID = setInterval(function () {
      if(window.MathJax) {
        var jax = window.MathJax;
        jax.Hub.Config({ tex2jax: { inlineMath: [['$', '$'], ['\\(', '\\)']] }});
        jax.Hub.Queue(['Typeset', jax.Hub, $(document.body)[0]]);
        clearInterval(loopID);
      }
    }, 500);
  }

  var config = window.config;
  var even = new Even(config);
  even.setup();
}(window))
