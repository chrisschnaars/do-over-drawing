
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "./src/css/": "/" });
    eleventyConfig.addPassthroughCopy({ "./src/js/": "/" });
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin)
};

export const config = {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    pathPrefix: "do-over-drawing",

    dir: {
        input: 'src',
        output: '_site',
    },
}