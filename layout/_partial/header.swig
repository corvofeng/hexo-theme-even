<div class="logo-wrapper">
  <a href="{{ url_for('.') }}" class="logo">{{ config.title }}</a>
</div>

<gcse:search></gcse:search>

<div class="popup">
 <span class="search-icon fa fa-search"></span>
 <input type="text" id="local-search-input" placeholder="search my blog...">
 <div id="local-search-result"></div>
</div>

<nav class="site-navbar">
  {%- if theme.menu -%}
    <ul id="menu" class="menu">
      {%- for name, path in theme.menu -%}
        <li class="menu-item">
          <a class="menu-item-link" href="{{ url_for(path) }}">
            {%- set itemName = __('menu.' + name.toLowerCase()) -%}
            {%- if itemName.startsWith('menu') -%}
              {{ name }}
            {%- else -%}
              {{ itemName }}
            {%- endif -%}
          </a>
        </li>
      {%- endfor -%}
    </ul>
  {%- endif -%}
</nav>

