'use strict';


hexo.extend.tag.register("site_url", function (args, content) {
    console.log("Get args", args, content)
    return "http://example.com";
});

/** 
 * In the markdown file, please use it like this:
 *   <script>
 *    const all_posts = JSON.parse('{% all_posts %}');
 *    all_posts.forEach((p) => {
 *        console.log(p.title, p.slug, p.url);
 *    });
 *   </script>
 */
hexo.extend.tag.register("all_posts", function (args, content) {
    // console.log("Get args", hexo.locals.get('posts'))
    let all_posts = hexo.locals.get('posts');
    let ret_data = [];

    all_posts.forEach((post) => {
        // Please refer to node_modules/hexo/lib/models/post.js
        // console.log(post.title, post.slug, post.link, post.permalink);
        ret_data.push({
            'title': post.title,
            'slug': post.slug,
            'url': post.permalink,
        });
    });

    return JSON.stringify(ret_data);
});

/**
 * It will create a file.
 */
hexo.extend.generator.register('all_posts', function(locals) {
    console.log("In generate all posts");
    let all_posts = hexo.locals.get('posts');
    let ret_data = [];

    all_posts.forEach((post) => {
        // Please refer to node_modules/hexo/lib/models/post.js
        // console.log(post.title, post.slug, post.link, post.permalink);
        ret_data.push({
            'title': post.title,
            'slug': post.slug,
            'url': post.permalink,
        });
    });

    return {
        path: 'all_posts.json',
        data:  JSON.stringify(ret_data),
    }
});


