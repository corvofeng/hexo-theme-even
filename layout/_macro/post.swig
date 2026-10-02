{%- macro render(post) -%}
  <article class="post">
    <header class="post-header">
      <h1 class="post-title">
        {%- if is_home() -%}
          <a class="post-link" href="{{ url_for(post.path) }}">{{ post.title }}</a>
        {%- else -%}
          {{ post.title }}
        {%- endif -%}
      </h1>

      <div class="post-meta">
        <span class="post-time">
          {{ full_date(post.date, 'YYYY-MM-DD') }}
        </span>
        {%- if post.author -%}
        <span class="post-author">
          / {{ post.author }}
        </span>
        {%- endif -%}
        {%- if post.__post and post.categories and post.categories.length -%}
          <span class="post-category">
            {%- for category in post.categories -%}
              <a href="{{ url_for(category.path) }}">{{ category.name }}</a>
            {%- endfor -%}
          </span>
        {%- endif -%}
        {%- if theme.leancloud.app_id and theme.leancloud.app_key -%}
        <span class="post-visits"
             data-url="{{ url_for(post.path) }}"
             data-title="{{ post.title }}">
          {{ __('posts.visits') }} 0
        </span>
        {%- endif -%}
      </div>

      {#- Language switch (zh <-> en), detail view only -#}
      {%- if not is_home() -%}
        {%- set langSwitch = lang_switch(post) -%}
        {%- if langSwitch -%}
          <div class="post-lang-switch">
            {%- if langSwitch.current == 'zh' -%}
              <span class="lang-item current">中文</span>
              <a class="lang-item" href="{{ langSwitch.altUrl }}" rel="alternate">English</a>
            {%- else -%}
              <a class="lang-item" href="{{ langSwitch.altUrl }}" rel="alternate">中文</a>
              <span class="lang-item current">English</span>
            {%- endif -%}
          </div>
        {%- endif -%}
      {%- endif -%}
    </header>

    {#- Post TOC -#}
    {%- include "../_partial/_post/toc.swig" -%}

    <div class="post-content">
      {%- if is_home() -%}
        {%- set excerpt = "" -%}
        {%- if post.description -%}
          {%- set excerpt = '<p>' + post.description + '</p>' -%}
        {%- elif post.excerpt -%}
          {%- set excerpt = post.excerpt -%}
        {%- endif -%}

        {%- if excerpt -%}
          {{ excerpt }}
          <div class="read-more">
            <a href="{{ url_for(post.path) }}" class="read-more-link">{{ __('posts.readmore') }}</a>
          </div>
        {%- else -%}
          {{ post.content }}
        {%- endif -%}
      {%- else -%}
        {%- if post.__post -%}
          {%- if post.tags and post.tags.length -%}
            <div class="head-tags">
              {%- for tag in post.tags -%}
                <a href="{{ url_for(tag.path) }}">{{ tag.name }}</a>
              {%- endfor -%}
            </div>
          {%- endif -%}
        {%- elif post.lang == 'en' and post.tags and post.tags.length -%}
          {#- English pages keep plain string tags in front-matter -#}
          <div class="head-tags">
            {%- for t in lang_tag_links(post.tags) -%}
              {%- if t.url -%}
                <a href="{{ t.url }}">{{ t.name }}</a>
              {%- else -%}
                <span>{{ t.name }}</span>
              {%- endif -%}
            {%- endfor -%}
          </div>
        {%- endif -%}
        {{ post.content }}
      {%- endif -%}
    </div>

    {%- if not is_home() -%}
      {#- Post Copyright -#}
      {%- include "../_partial/_post/copyright.swig" -%}

      {#- Reward -#}
      {%- include "../_partial/_post/reward.swig" -%}
    {%- endif -%}

    {%- if not is_home() -%}
      <footer class="post-footer">
        {#
        {%- if post.tags and post.tags.length -%}
          <div class="post-tags">
            {%- for tag in post.tags -%}
              <a href="{{ url_for(tag.path) }}">{{ tag.name }}</a>
            {%- endfor -%}
          </div>
        {%- endif -%}
        #}
        {#- Post Pagination -#}
        {%- include "../_partial/pagination.swig" -%}
      </footer>
    {%- endif -%}

  </article>
{%- endmacro -%}
