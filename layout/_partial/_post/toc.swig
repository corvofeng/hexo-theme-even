{%- if not is_home() and toc(page.content) and theme.toc -%}
  <div class="post-toc" id="post-toc">
    <h2 class="post-toc-title">{{ __('posts.toc') }}</h2>
    <div class="post-toc-content">
      {{ toc(page.content, {list_number: false}) }}
      <script type="text/javascript" id="clstr_globe" src="//clustrmaps.com/globe.js?d=9N806REq1XHgMD7JjcVCOezrPrKd6nmaVUGtpztnr4U"></script>
    </div>
  </div>
{%- endif -%}
