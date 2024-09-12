const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addCollection("post", function (collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/*.md")
      .filter(post => !post.data.draft)
      .sort((a, b) => b.date - a.date);
    // console.log(`Found ${posts.length} posts in the 'post' collection.`);
    return posts;
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "rss",
    outputPath: "rss.xml",
    collection: {
      name: "post",
      limit: 10,
    },
    metadata: {
      language: "pt-br",
      title: "Blog do Camilo",
      subtitle: "Blog de um cara aí.",
      base: "https://camilotk.dev.br/",
      author: {
        name: "Camilo de Azevedo",
        email: "camilotk@gmail.com",
      }
    }
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    }
  };
};
