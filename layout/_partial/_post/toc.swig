{%- if not is_home() and toc(page.content) and theme.toc -%}
  <div class="post-toc" id="post-toc">
    <h2 class="post-toc-title">{{ __('posts.toc') }}</h2>
    <div class="post-toc-content">
      {{ toc(page.content, {list_number: false}) }}
    <div id="clustrmaps-container">
    </div>
    <script>
     // 定义一个函数来加载脚本
      function loadClustrMaps() {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.id = 'clstr_globe';
          script.src = '//clustrmaps.com/globe.js?d=9N806REq1XHgMD7JjcVCOezrPrKd6nmaVUGtpztnr4U';
          var container = document.getElementById('clustrmaps-container');
          if (container) {
              container.appendChild(script);
          }
      }
      // 在DOM完全加载后调用该函数
      document.addEventListener('DOMContentLoaded', loadClustrMaps);
    </script>
    </div>
  </div>
{%- endif -%}
