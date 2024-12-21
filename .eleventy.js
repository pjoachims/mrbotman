module.exports = function (eleventyConfig) {
  // Existing BrowserSync configuration
  eleventyConfig.setBrowserSyncConfig({
    files: './public/static/**/*.css',
  });

  // Copy assets for Pawsome veterinary clinic
  eleventyConfig.addPassthroughCopy({'src/pawsome/assets': 'pawsome/assets'});  

  // Add markdown image shortcode for easier image handling
  eleventyConfig.addShortcode('image', function(src, alt, caption) {
    return `
      <figure>
        <img src="/pawsome/assets/images/${src}" alt="${alt}" class="responsive-image">
        ${caption ? `<figcaption>${caption}</figcaption>` : ''}
      </figure>
    `;
  });

  return {
    dir: {
      input: 'src',
      output: 'public',
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
};