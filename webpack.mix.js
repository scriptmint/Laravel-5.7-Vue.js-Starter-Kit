let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

var plugin =  'resources/assets/plugins/';

mix.js('resources/assets/js/app.js', 'public/js/app.js')
  .combine([
    plugin + 'jquery/jquery.min.js',
    plugin + 'popper/popper.min.js',
    plugin + 'bootstrap/bootstrap.min.js',
    plugin + 'moment/moment.min.js',
    plugin + 'toastr/toastr.min.js',
    plugin + 'slimscroll/jquery.slimscroll.js',
    plugin + 'waves/waves.js',
    plugin + 'sidebarmenu.js',
    plugin + 'sticky-kit/sticky-kit.min.js',
    'resources/assets/js/custom.js',
    'public/js/app.js',
  ],'public/js/bundle.min.js')
    .sass('resources/assets/sass/style.scss', 'public/css')
    .browserSync('laravue');
