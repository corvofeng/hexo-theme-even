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


<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@corvo-publish/heartsteel@0.0.1/dist/assets/plugin-0.0.0.js"></script>
<!--
<link rel="stylesheet" crossorigin href="http://localhost:4173/assets/plugin.css">
-->
