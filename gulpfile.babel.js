import gulp from "gulp";
import del from "del";
import ws from "gulp-webserver";
import htmlmin from "gulp-htmlmin";
import autoprefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";

const sass = require("gulp-sass")(require("node-sass"));

const routes = {
  scss: {
    watch: "scss/**/*.scss",
    src: "scss/style.scss",
    dest: "docs/",
  },
  js: {
    watch: "js/**/*.js",
    src: "js/main.js",
    dest: "docs/",
  },
  html: {
    watch: "index.html",
    src: "index.html",
    dest: "docs/",
  },
};

const clean = () => del(["docs/"]);

const webserver = () =>
  gulp.src("docs").pipe(ws({ livereload: true, open: true }));

const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(miniCSS())
    .pipe(gulp.dest(routes.scss.dest));

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dest));

const html = () =>
  gulp
    .src(routes.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(routes.html.dest));

const watch = () => {
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.js.watch, js);
  gulp.watch(routes.html.watch, html);
};

const prepare = gulp.series([clean]);

const assets = gulp.series([html, styles, js]);

const live = gulp.parallel([webserver, watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build]);
