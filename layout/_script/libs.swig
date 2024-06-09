{%- if theme.fancybox -%}
  {%- set fancybox_js = 'fancybox/jquery.fancybox.pack.js' -%}
{%- endif -%}

{%-
  set js_libs = {
    jquery: 'jquery/jquery.min.js',
    slideout: 'slideout/slideout.js',
    fancybox: fancybox_js,
    nprogress: nprogress_js,
  }
-%}

{%- for lib in js_libs -%}
  {%- if lib -%}
    <script type="text/javascript" src="{{ url_for('lib') }}/{{ lib }}"></script>
  {%- endif -%}
{%- endfor -%}


<div id="heartsteel-container">
<!--
<script type="text/javascript" src="//cdn.jsdelivr.net/npm/@corvo-publish/heartsteel@latest/dist/assets/heartsteel.js" ></script>
-->
<script>
  function loadHeartsteel() {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//cdn.jsdelivr.net/npm/@corvo-publish/heartsteel@latest/dist/assets/heartsteel.js';
      var container = document.getElementById('heartsteel-container');
      if (container) {
          container.appendChild(script);
      }
  }
  // 在DOM完全加载后调用该函数
  document.addEventListener('DOMContentLoaded', loadHeartsteel);
</script>
