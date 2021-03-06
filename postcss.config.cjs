module.exports = {
  // TODO: chain following plugins in a single plugin
  // precss is a pack of list of plugins, options here can be a mix of these plugin's options
  // for details pls cheouk out: https://github.com/jonathantneal/precss/blob/master/src/index.js
  plugins: [
    require('postcss-import'),
    // wipe off nestings before 'postcss-extend-rule' plugin
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'nesting-rules': true,
        'color-mod-function': { unresolved: 'warn' }
      }
    }),
    require('postcss-extend-rule')({ name: 'extend' }),
    require('postcss-advanced-variables'),
    // https://tailwindcss.com/docs/using-with-preprocessors
    require('tailwindcss'),
    require('autoprefixer'),
    // purgecss configurations: https://purgecss.com/configuration.html
    // Issues that matter: https://github.com/FullHuman/purgecss/issues/110
    require('@fullhuman/postcss-purgecss')({
      content: ['./config/**/*.js', './src/**/*.js', './src/**/*.html', './src/**/*.wxml', './src/**/*.json', './src/**/*.hbs', './src/**/*.handlebars'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      fontFace: false,
      keyframes: false,
      variables: false,
      whitelistPatterns: [/^mobius/],
      whitelistPatternsChildren: [/^mobius/],
      verbose: true,
      rejected: true
    }),
    // https://www.npmtrends.com/cssnano-vs-csso-vs-clean-css-vs-postcss-clean
    // https://goalsmashers.github.io/css-minification-benchmark/
    // cssnano optimisations: https://cssnano.co/guides/optimisations
    // ! cssnano is not support the postcss v8, use csso instead
    // require('cssnano')(['default', {
    //   normalizeUnicode: false
    // }]),
    // refer: https://github.com/lahmatiy/postcss-csso
    require('postcss-csso')({ restructure: true })
  ]
}
