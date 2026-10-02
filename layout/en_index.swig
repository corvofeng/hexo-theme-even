{%- extends "_layout.swig" -%}

{%- block title -%} {{ page.title }} - {{ config.title }} {%- endblock -%}

{%- block content -%}
  <section id="archive" class="archive">
    <div class="archive-title">
      <h2 class="archive-name">{{ page.title }}</h2>
    </div>

    {%- for group in en_post_list() -%}
      <div class="collection-title">
        <h2 class="archive-year">{{ group.year }}</h2>
      </div>

      {%- for item in group.items -%}
        <div class="archive-post">
          <span class="archive-post-time">
            {{ item.date }}
          </span>
          <span class="archive-post-title">
            <a href="{{ url_for(item.url) }}" class="archive-post-link">
              {{ item.title }}
            </a>
          </span>
        </div>
      {%- endfor -%}
    {%- endfor -%}
  </section>
{%- endblock -%}
