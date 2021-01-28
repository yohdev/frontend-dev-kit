const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const include = require('gulp-include');
const uglify = require('gulp-uglify');
const changed = require('gulp-changed');
const rename= require('gulp-rename');
const svgmin= require('gulp-svgmin');
const svgstore= require('gulp-svgstore');
const path = require('path');

var paths = {
	styles: {
		src: "assets/source/sass/main.scss",
		dest: "assets/build/css",
		minifySrc: "assets/build/css/*.css",
		watchDir: "assets/source/sass/**/*.scss",
	},
	scripts: {
		src: "assets/source/js/main.js",
		dest: "assets/build/js",
		minifySrc: "assets/build/js/*.js",
		watchDir: "assets/source/js/**/*.js",
	},
	static: {
		src: "assets/source/static/**/*",
		dest: "assets/build"
	},
	icons: {
		src: "assets/source/svg-icons/*.svg",
		dest: "assets/build/svg"
	}
};

// Runs SASS on main scss file, handles vendor prefixes through autoprefixer
function styles() {
	return src(paths.styles.src)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on("error", sass.logError)
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(dest(paths.styles.dest));
}

// Minify all css
function stylesMinify() {
	return src(paths.styles.minifySrc)
		.pipe(cleanCSS())
		.pipe(dest(paths.styles.dest));
}

// Runs includes on javascript, exports to build
function scripts() {
	return src(paths.scripts.src)
		.pipe(sourcemaps.init())
		.pipe(include())
		.on("error", console.log)
		.pipe(rename('all.js'))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.scripts.dest));
}

// Minify all js
function scriptsMinify() {
	return src(paths.scripts.minifySrc)
		.pipe(uglify())
		.pipe(dest(paths.scripts.dest));
}

// Grab svg icons and create a single svg sprite
function svgIcons() {
	return src(paths.icons.src)
		.pipe(svgmin(function(file) {
			let prefix = path.basename(file.relative, path.extname(file.relative));
			return {
				plugins: [
					{removeViewBox: false},
					{removeDoctype: true},
					{removeXMLProcInst: true},
					{cleanupIDs: {prefix: prefix + '-', minify: true}}
				]
			};
		}))
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(dest(paths.icons.dest))
}

// Move any static files into the build folder to allow sourcing
function static() {
	return src(paths.static.src)
		.pipe(changed("build"))
		.pipe(dest(paths.static.dest));
}

function watchFiles() {
	watch(paths.styles.watchDir, styles),
	watch(paths.scripts.watchDir, scripts),
	watch(paths.static.src, static),
	watch(paths.icons.src, svgIcons)
}

// Expose tasks
exports.styles = styles;
exports.stylesMinify = stylesMinify;
exports.scripts = scripts;
exports.scriptsMinify = scriptsMinify;
exports.static = static;
exports.svgIcons = svgIcons;
exports.watchFiles = watchFiles;

// Default task - builds, then watches assets and recompiles
exports.default = series(
	parallel(
		styles,
		scripts,
		static,
		svgIcons
	),
	parallel(
		watchFiles
	)
);

exports.build = series(
	parallel(
		styles,
		scripts,
		static,
		svgIcons
	),
	parallel(
		stylesMinify,
		scriptsMinify
	)
);
