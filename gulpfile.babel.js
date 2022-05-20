import gulp from "gulp";
import del from "del";
import ws from "gulp-webserver";
import htmlmin from "gulp-htmlmin";
import autoprefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";

// gulp-sass는 gulp와 동작하고 node-sass는 node와 동작
// gulp-sass가 node-sass로 sass 파일을 전달해준다.
const sass = require("gulp-sass")(require("node-sass"));

const routes = {
  scss: {
    watch: "scss/**/*.scss",
    src: "scss/index.scss",
    dest: "docs/css",
  },
  js: {
    watch: "js/*.js",
    src: "js/*.js",
    dest: "docs/js",
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
    // 에러가 발생하면 sass만의 에러 출력, 시스템을 다운시키는 에러가 아닌 css 관련 에러를 의미
    .pipe(sass().on("error", sass.logError))
    // 작성한 코드를 구형 브라우저에서도 호환가능하도록
    .pipe(autoprefixer())
    // 파일에 있는 공백 하나가 1byte를 의미한다. 배포시에는 필요없기에 공백을 없애 css 파일 최소화하여 브라우저 로딩속도를 높인다.
    .pipe(miniCSS())
    .pipe(gulp.dest(routes.scss.dest));

const js = () =>
  // 자바스크립트를 babel에서 실행, browserlify안에다 babel 실행
  gulp
    .src(routes.js.src)
    .pipe(
      // browserlify는 개발자들이 브라우저에서 Node.js 스타일의 모듈을 사용하기 위한 오픈소스 JS 툴 (출처: 위키피디아)
      bro({
        transform: [
          // 코드에 babel 적용
          babelify.configure({ presets: ["@babel/preset-env"] }),
          // 코드 압축 및 최소화
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
