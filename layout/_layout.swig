<!DOCTYPE html>
<html lang="{{ config.language }}">
  <head>
    {%- include '_partial/head.swig' %}
    <title>{%- block title -%}{%- endblock -%}</title>
  </head>

  <body>
    {%- include '_partial/slideout.swig' -%}
    <div class="container" id="mobile-panel">
      <header id="header" class="header">
        {%- include '_partial/header.swig' -%}
      </header>

      <main id="main" class="main">
        <div class="content-wrapper">
          <div id="content" class="content">
            {%- block content -%}{%- endblock -%}
          </div>
          {%- include '_partial/comments.swig' -%}
        </div>
      </main>

      <div style="width:300px;margin:0 auto; padding:20px 0;">
      <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">晋公网安备 14070202000111号</p>
     </div>
      <footer id="footer" class="footer">
        {%- include '_partial/footer.swig' -%}
      </footer>

      <div class="back-to-top" id="back-to-top">
        <i class="iconfont icon-up"></i>
      </div>
    </div>

    {%- include '_script/comments.swig' -%}
    {%- include '_script/libs.swig' -%}
    {%- include '_script/theme.swig' -%}
  </body>
</html>
