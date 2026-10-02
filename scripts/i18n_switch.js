'use strict';

/**
 * Bilingual (zh <-> en) post switch helpers.
 *
 * Convention used by the blog:
 *   - Chinese posts are regular Hexo posts under `source/_posts/`.
 *   - The English version of a post is a Hexo *page* under
 *     `source/en/<slug>.md` with the following front-matter:
 *
 *       layout: post
 *       lang: en
 *       origin: /2019/01/19/<chinese-post-path>/
 *
 * Because English versions are pages (not posts), they never enter
 * `site.posts`, so RSS / index / archives / search stay exactly the
 * same as the pure Chinese blog.
 */

function normalizePath(p) {
  if (!p) return '';
  return String(p)
    .replace(/^\/+/, '')
    .replace(/index\.html$/, '')
    .replace(/\/+$/, '');
}

/**
 * Return the language switch info for the current page/post:
 *   { current: 'zh'|'en', altLang, altUrl, altUrlAbs }
 * or null when there is no translation pair.
 */
hexo.extend.helper.register('lang_switch', function (page) {
  if (!page) return null;

  if (page.lang === 'en') {
    // English page -> link back to the original Chinese post.
    const origin = normalizePath(page.origin);
    if (!origin) return null;
    return {
      current: 'en',
      altLang: 'zh-CN',
      altUrl: this.url_for('/' + origin + '/'),
      altUrlAbs: this.full_url_for('/' + origin + '/'),
    };
  }

  // Chinese post -> look for an English page pointing back at it.
  if (!page.__post) return null;
  const target = normalizePath(page.path);
  if (!target) return null;

  const enPage = this.site.pages.toArray().find(
    (p) => p.lang === 'en' && normalizePath(p.origin) === target
  );
  if (!enPage) return null;

  const enPath = normalizePath(enPage.path);
  return {
    current: 'zh',
    altLang: 'en',
    altUrl: this.url_for(enPath + '/'),
    altUrlAbs: this.full_url_for(enPath + '/'),
  };
});

/**
 * English pages carry plain string tags in front-matter (pages have no
 * tag models). Map them back to the site tag archives when possible.
 */
hexo.extend.helper.register('lang_tag_links', function (tags) {
  if (!tags || !Array.isArray(tags)) return [];
  const site = this.site;
  return tags.map((name) => {
    const tag = site.tags.findOne({ name: String(name) });
    return {
      name: String(name),
      url: tag ? this.url_for(tag.path) : null,
    };
  });
});

/**
 * Grouped list of English pages for the `/en/` index, newest first:
 *   [ { year: '2026', items: [ { title, url, date: 'MM-DD' } ] } ]
 */
hexo.extend.helper.register('en_post_list', function () {
  const pages = this.site.pages
    .toArray()
    .filter((p) => p.lang === 'en' && p.origin)
    .sort((a, b) => {
      const da = a.date ? a.date.valueOf() : 0;
      const db = b.date ? b.date.valueOf() : 0;
      return db - da;
    });

  const groups = [];
  let current = null;
  for (const p of pages) {
    const date = p.date || p.updated;
    const year = date ? date.format('YYYY') : 'Unknown';
    if (!current || current.year !== year) {
      current = { year, items: [] };
      groups.push(current);
    }
    current.items.push({
      title: p.title || normalizePath(p.path),
      url: normalizePath(p.path),
      date: date ? date.format('MM-DD') : '',
    });
  }
  return groups;
});
