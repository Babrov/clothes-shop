let projectFolder = "dist";
let sourceFolder = "src";

let path = {
    build: {
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        img: projectFolder + "/img/",
        fonts: projectFolder + "/fonts/"
    },
    src: {
        html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
        css: sourceFolder + "/scss/*",
        js: sourceFolder + "/js/script.js",
        img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: sourceFolder + "/fonts/"
    },
    watch: {
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/scss/**/*",
        js: sourceFolder + "/js/**/*.js",
        img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean:"./" + projectFolder + "/"
}

let {src,dest} = require("gulp");
let gulp = require("gulp");
let browsersync = require("browser-sync").create();
let fileinclude = require("gulp-file-include");
let del = require("del")
let scss = require("gulp-sass")

function browserSync(param) {

    browsersync.init({
        server: {
            baseDir: "./" + projectFolder + "/"
        },
        port: 3000,
        notify:false
    })
}
function html(){
    return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}
function css(){
    return src(path.src.css)
    .pipe(dest(path.build.css))
    .pipe(
        scss({
            outputStyle:"expanded"
        })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js(){
    return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function watchFiles(param){
    gulp.watch([path.watch.html],html);
    gulp.watch([path.watch.css],css);
    gulp.watch([path.watch.js],js);

}
function clean(param) {
    return del(path.clean);
}
let build = gulp.series(clean, gulp.parallel(js,css,html));
let watch = gulp.parallel(build,watchFiles,browserSync);

exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
