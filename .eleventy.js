
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "/src/js/sketch.js": '/' });
    eleventyConfig.addPassthroughCopy({ "/src/css/style.css": '/' });

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