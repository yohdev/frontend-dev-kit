# lp-prototype

**Note: This kit is designed to be run locally on Node v12+. This will not build on our CentOS VMs on AWS.**

## Uses

- gulp
  - gulp-sass
  - gulp-sourcemaps
  - gulp-clean-css
  - gulp-autoprefixer
  - gulp-include
  - gulp-uglify
  - gulp-changed
- live-server


## Folder Structure

`source` - all source assets (HTML, CSS, JS) go in here, yo

`build` - all compiled assets are dumped here for packaging, nothing should be
directly edited in this folder. Any changes need to be made in the source
files (or they will be overwritten)

`source/static` - All folders and files in this folder will be moved to the
build folder to allow a consistent sourcing path. Use this to include static
JS files (jQuery, Modernizr) into the final js folder. Also good for static
images, SVGs, etc.

`source/html` - Houses all HTML before piped through the `gulp-include`
module. Follows basic static HTML rules (autoserves index.html). To create
pretty links, create a directory with index.html inside (ex about/index.html)


## Workflow

**Note: This kit is designed to be run locally on Node v12+. This will not build on our CentOS VMs on AWS.**

To get building:

1. Clone the repo
2. `cd` to the repo in the command line
3. `npm install` to install all node_modules locally
4. `gulp` to build assets, start a server, and begin watching files

All files will recompile on a change, and the server will automatically reload
once the built files are updated.

If we have to hand off these assets, `gulp build` will produce minified assets
that can be easily packaged.


## Gulp Tasks

`gulp` - default task, builds all assets, then starts a simple webserver and
watches files for changes

`gulp styles` - build CSS using libSASS and auto vendor-prefixing from
Autoprefixer

`gulp scripts` - build JS using includes from
[gulp-include](https://www.npmjs.com/package/gulp-include)

`gulp html` - build HTML using includes from
[gulp-include](https://www.npmjs.com/package/gulp-include)

`gulp build` -  will run all compile tasks, then minify the output

`gulp watch` - will watch files for changes, bundled into the default task

`gulp server` - starts a local server at http://127.0.0.1:8181/ that refreshes
itself when changes are detected

## Other stuff

* Refer to [_mixins.scss](source/sass/base/_mixins.scss) for the preferred way
  of writing media queries for a selector.
* By default, the bundled Bootstrap files (css/js) are included. If you find
  you need to override a section, the full bootstrap sources are included in
  the `source/vendor` folder
