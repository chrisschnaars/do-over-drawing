import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    eleventyConfig.addPassthroughCopy("/src/css/style.css");
    eleventyConfig.addPassthroughCopy("/src/js/sketch.js");

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',

        dir: {
            input: 'src',
            output: '_site',
        },
    };
};