const gulp = require("gulp");
const minify = require("gulp-minify");
const concat = require("gulp-concat");
const sourceMaps = require("gulp-sourcemaps");
const cleanCss = require("gulp-clean-css");
const htmlMin = require("gulp-htmlmin");
const babel = require("gulp-babel");
const autoPrefixer = require("gulp-autoprefixer");
const unCss = require("gulp-uncss");

gulp.task("copyHTML", function() {
  return gulp.src("src/template/*.html").pipe(gulp.dest("templates"));
});
gulp.task("copyErrorHTML", function() {
  return gulp
    .src("src/template/errors/*.html")
    .pipe(gulp.dest("templates/errors"));
});
gulp.task("copyCSS", function() {
  return gulp
    .src("src/css/*.css")
    .pipe(autoPrefixer())
    .pipe(cleanCss())
    .pipe(gulp.dest("static/css"));
});
gulp.task("copyJS", function() {
  return (
    gulp
      .src([
        "src/js/account.js",
        "src/js/login.js",
        "src/js/error.js",
        "src/js/readMe.js"
      ])
      // .pipe(babel({ presets: ["@babel/preset-env"] }))
      .pipe(gulp.dest("static/js"))
  );
});

// concats codemirror css files into a single file.
gulp.task("joinCodeMirrorCss", function() {
  return gulp
    .src([
      "static/lib/codemirror/lib/codemirror.css",
      "static/lib/codemirror/addon/hint/show-hint.css",
      "static/lib/codemirror/addon/fold/foldgutter.css",
      "static/lib/codemirror/addon/dialog/dialog.css",
      "static/lib/codemirror/addon/search/matchesonscrollbar.css",
      "static/lib/codemirror/addon/scroll/simplescrollbars.css",
      "static/lib/codemirror/addon/lint/lint.css"
    ])
    .pipe(sourceMaps.init())
    .pipe(concat("vendor.css"))
    .pipe(cleanCss())
    .pipe(sourceMaps.write("maps/"))
    .pipe(gulp.dest("static/lib/codemirror/lib/"));
});

// concats codemirror js files into a single file.
gulp.task("joinCMAddons", function() {
  return gulp
    .src([
      "static/js/codemirror.js",
      "static/lib/codemirror/addon/edit/closetag.js",
      "static/lib/codemirror/addon/fold/xml-fold.js",
      "static/lib/codemirror/addon/fold/foldcode.js",
      "static/lib/codemirror/addon/scroll/simplescrollbars.js",
      "static/lib/codemirror/addon/fold/foldgutter.js",
      "static/lib/codemirror/addon/fold/markdown-fold.js",
      "static/lib/codemirror/addon/fold/brace-fold.js",
      "static/lib/codemirror/addon/fold/indent-fold.js",
      "static/lib/codemirror/addon/selection/active-line.js",
      "static/lib/codemirror/addon/hint/show-hint.js",
      "static/lib/codemirror/addon/hint/anyword-hint.js",
      "static/lib/codemirror/addon/hint/css-hint.js",
      "static/lib/codemirror/addon/hint/emoji-hint.js",
      "static/lib/codemirror/addon/hint/javascript-hint.js",
      "static/lib/codemirror/addon/edit/matchtags.js",
      "static/lib/codemirror/addon/edit/closebrackets.js",
      "static/lib/codemirror/addon/edit/matchbrackets.js",
      "static/lib/codemirror/addon/lint/lint.js",
      "static/lib/codemirror/addon/lint/javascript-lint.js",
      "static/lib/codemirror/addon/lint/coffeescript-lint.js",
      "static/lib/codemirror/addon/lint/html-lint.js",
      "static/lib/codemirror/addon/lint/css-lint.js",
      "static/lib/codemirror/addon/dialog/dialog.js",
      "static/lib/codemirror/addon/overlay/overlay.js",
      "static/lib/codemirror/addon/search/searchcursor.js",
      "static/lib/codemirror/addon/scroll/annotatescrollbar.js",
      "static/lib/codemirror/addon/search/matchesonscrollbar.js",
      "static/lib/codemirror/addon/search/jump-to-line.js",
      "static/lib/codemirror/addon/comment/comment.js",
      "static/lib/codemirror/keymap/vim.js",
      "static/lib/codemirror/keymap/sublime.js",
      "static/lib/codemirror/mode/xml/xml.js",
      "static/lib/codemirror/mode/pug/pug.js",
      "static/lib/codemirror/mode/markdown/markdown.js",
      "static/lib/codemirror/mode/gfm/gfm.js",
      "static/lib/codemirror/mode/clike/clike.js",
      "static/lib/codemirror/mode/meta.js",
      "static/lib/codemirror/mode/sass/sass.js",
      "static/lib/codemirror/mode/stylus/stylus.js",
      "static/lib/codemirror/mode/coffeescript/coffeescript.js",
      "static/lib/codemirror/mode/jsx/jsx.js",
      "static/lib/codemirror/mode/javascript/javascript.js",
      "static/lib/codemirror/mode/css/css.js",
      "static/lib/codemirror/mode/htmlmixed/htmlmixed.js",
      "static/lib/tools/emmet/emmet.js"
    ])
    .pipe(sourceMaps.init())
    .pipe(concat("vendor.js"))
    .pipe(minify())
    .pipe(sourceMaps.write("maps/"))
    .pipe(gulp.dest("static/lib/codemirror/lib"));
});

gulp.task("readme", function() {
  return gulp
    .src([
      "static/js/codemirror.js",
      "static/lib/codemirror/mode/xml/xml.js",
      "static/lib/codemirror/mode/markdown/markdown.js",
      "static/lib/codemirror/mode/gfm/gfm.js",
      "static/lib/codemirror/mode/clike/clike.js",
      "static/lib/codemirror/addon/fold/foldcode.js",
      "static/lib/codemirror/addon/scroll/simplescrollbars.js",
      "static/lib/codemirror/addon/fold/foldgutter.js",
      "static/lib/codemirror/addon/fold/markdown-fold.js",
      "static/lib/codemirror/addon/overlay/overlay.js",
      "static/lib/codemirror/addon/fold/indent-fold.js",
      "static/lib/codemirror/addon/selection/active-line.js",
      "static/lib/codemirror/mode/javascript/javascript.js",
      "static/lib/codemirror/mode/css/css.js",
      "static/lib/codemirror/mode/htmlmixed/htmlmixed.js",
      "static/lib/tools/prettier/parser-markdown.js",
      "static/lib/tools/prettier/parser-html.js",
      "static/lib/tools/prettier/standalone-min.js",
      "static/lib/transpilers/showdown.min.js"
    ])
    .pipe(sourceMaps.init())
    .pipe(concat("readme-editor.js"))
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(minify())
    .pipe(sourceMaps.write("maps/"))
    .pipe(gulp.dest("static/lib/codemirror/lib"));
});
// concats preprocessors  js files into a single file.
gulp.task("joinPre", function() {
  return gulp
    .src([
      "static/lib/transpilers/babel-standalone.min.js",
      "static/lib/transpilers/typescript.js",
      "static/lib/transpilers/coffee-script.js",
      "static/lib/transpilers/jade.js",
      "static/lib/transpilers/showdown.min.js",
      "static/lib/transpilers/stylus.min.js",
      "static/lib/transpilers/less.min.js",
      "static/lib/transpilers/sass-min.js"
    ])
    .pipe(sourceMaps.init())
    .pipe(concat("prepro.js"))
    .pipe(sourceMaps.write("../../maps/"))
    .pipe(gulp.dest("static/js"));
});

// concats linters js files into a single file.
gulp.task("linter", function() {
  return gulp
    .src([
      "static/lib/tools/linters/jshint-min.js",
      "static/lib/tools/linters/csslint-min.js",
      "static/lib/tools/linters/jsonlint-min.js",
      "static/lib/tools/linters/coffeelint.min.js",
      "static/lib/tools/linters/htmlhint.js"
    ])
    .pipe(sourceMaps.init())
    .pipe(concat("linters.js"))
    .pipe(sourceMaps.write("../../../maps/"))
    .pipe(gulp.dest("static/lib/tools/linters"));
});
gulp.task("xternCss", function() {
  return gulp
    .src([
      "static/lib/tools/splitjs/splitjs.css",
      "static/lib/tools/colorpicker/colorpicker.css",
      "static/lib/tools/font-awesome/all.min.css"
    ])
    .pipe(sourceMaps.init())
    .pipe(concat("xtern.css"))
    .pipe(cleanCss())
    .pipe(sourceMaps.write("../../../maps"))
    .pipe(gulp.dest("static/lib/tools/xtern"));
});

gulp.task("xternJs", function() {
  return gulp
    .src([
      "static/lib/tools/splitjs/split.min.js",
      "static/lib/tools/colorpicker/colorpicker.min.js",
      "static/lib/tools/xtern/esprima.js"
    ])
    .pipe(sourceMaps.init())
    .pipe(concat("xtern.js"))
    .pipe(minify())
    .pipe(sourceMaps.write("../../../maps"))
    .pipe(gulp.dest("static/lib/tools/xtern"));
});

// concats prettier standalone and parsers into a single file.
gulp.task("prettier", function() {
  return gulp
    .src([
      "static/lib/tools/prettier/parser-postcss.js",
      "static/lib/tools/prettier/parser-babylon.js",
      "static/lib/tools/prettier/parser-html.js",
      "static/lib/tools/prettier/parser-markdown.js",
      "static/lib/tools/prettier/standalone-min.js"
    ])
    .pipe(sourceMaps.init())
    .pipe(concat("prettify.js"))
    .pipe(sourceMaps.write("../../../maps/"))
    .pipe(gulp.dest("static/lib/prettier"));
});

// concats the mainjs and its utils into a single file
gulp.task("joinEditor-one", function() {
  return (
    gulp
      .src(["src/utils/define-mode.js", "src/js/app.js", "src/js/utils.js"])
      .pipe(sourceMaps.init())
      .pipe(concat("app.bundle.one.js"))
      // .pipe(babel({ presets: ["@babel/preset-env"] }))
      .pipe(sourceMaps.write("maps/"))
      .pipe(gulp.dest("static/js"))
  );
});
gulp.task("joinEditor-two", function() {
  return (
    gulp
      .src(["src/utils/define-mode.js", "src/js/app.two.js", "src/js/utils.js"])
      .pipe(sourceMaps.init())
      .pipe(concat("app.bundle.two.js"))
      // .pipe(babel({ presets: ["@babel/preset-env"] }))
      .pipe(sourceMaps.write("maps/"))
      .pipe(gulp.dest("static/js"))
  );
});

gulp.task("joinCrumb", function() {
  return gulp
    .src([
      "src/utils/define-mode.js",
      "src/utils/initialise-modes.js",
      "src/js/crumb.js",
      "src/utils/deferred.js"
    ])
    .pipe(sourceMaps.init())
    .pipe(concat("app.crumb.js"))
    .pipe(sourceMaps.write("maps/"))
    .pipe(gulp.dest("static/js"));
});

// concats codemirror themes into a single file.
gulp.task("jointheme", function() {
  return gulp
    .src([
      "static/lib/codemirror/theme/dracula.css",
      "static/lib/codemirror/theme/duotone-dark.css",
      "static/lib/codemirror/theme/3024-night.css",
      "static/lib/codemirror/theme/solarized.css",
      "static/lib/codemirror/theme/monokai.css",
      "static/lib/codemirror/theme/hopscotch.css",
      "static/lib/codemirror/theme/console-code.css",
      "static/lib/codemirror/theme/seti.css",
      "static/lib/codemirror/theme/paraiso-dark.css",
      "static/lib/codemirror/theme/gruvbox-dark.css",
      "static/lib/codemirror/theme/liquibyte.css",
      "static/lib/codemirror/theme/the-matrix.css",
      "static/lib/codemirror/theme/midnight.css",
      "static/lib/codemirror/theme/andromeda.css",
      "static/lib/codemirror/theme/material-ocean.css",
      "static/lib/codemirror/theme/summer-code.css"
    ])
    .pipe(sourceMaps.init())
    .pipe(concat("theme.css"))
    .pipe(cleanCss())
    .pipe(sourceMaps.write("maps/"))
    .pipe(gulp.dest("static/lib/codemirror/theme/"));
});

// concats utility files into a single file.
gulp.task("concatUtils", function() {
  return gulp
    .src([
      "src/utils/deferred.js",
      "src/utils/define-state.js",
      "src/utils/initialise-modes.js",
      "src/utils/initialise-state.js",
      "src/utils/compute-preview.js",
      "src/utils/animate.js",
      "src/utils/reset-tabs.js",
      "src/utils/setting-buttons.js",
      "src/utils/keyboardShortcuts.js",
      "src/utils/tidy.js",
      "src/utils/timer.js",
      "src/utils/proxyConsole.js",
      "src/utils/export.js"
    ])
    .pipe(sourceMaps.init())
    .pipe(concat("utils.js"))
    .pipe(sourceMaps.write("maps/"))
    .pipe(gulp.dest("src/js/"));
});

gulp.task(
  "copy",
  gulp.series("copyJS", "joinEditor-one", "joinEditor-two", "joinCrumb")
);

gulp.task("watch-html", () => {
  gulp.watch("src/template/**/*html", gulp.series("copyHTML"));
  gulp.watch("src/template/errors/**/*html", gulp.series("copyErrorHTML"));
});

gulp.task("watch-static", function() {
  gulp.watch("src/js/**/*js", gulp.series("copy"));
  gulp.watch(
    "src/utils/**/*js",
    gulp.series("concatUtils", "joinEditor-one", "joinEditor-two")
  );
});
gulp.task("watch-css", function() {
  gulp.watch("src/css/**/*css", gulp.series("copyCSS"));
});

gulp.task("min", function() {
  return gulp
    .src("static/preview/console.js")
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(minify())
    .pipe(gulp.dest("static/preview/"));
});
