{%- extends "_layout.swig" -%}
{%- import '_macro/post.swig' as post_template -%}

{%- block title -%} {{ page.title }} - {{ config.title }} {%- endblock -%}

{%- block content -%}
  {{ post_template.render(page) }}
{%- endblock -%}

            <div style="width:300px;margin:0 auto; padding:20px 0;">
                                            <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=14070202000111" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">晋公网安备 14070202000111号</p></a>
                                                                                        </div>
