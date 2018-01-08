const gulp = require('gulp')
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Compile Sass (Bootstrap Sass & Our Sass file) and Inject into browser

gulp.task('sass', () => { 
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream())
});

// Move Js Files to src/js
gulp.task('js', () => {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
     'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
     .pipe(gulp.dest("src/js"))
     .pipe(browserSync.stream())

})

// Watch Sass, Html & Serve. Also reload browser if any changes was made.
gulp.task('serve', ['sass'], () => {
    browserSync.init({
        server: "./src"
    });
    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
})

// Move Fonts Awesome Fonts Folder to src/fonts
gulp.task('fonts', () => {
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
})

// Move Fonts Awesome Css Folder to src/css
gulp.task('fa', () => {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
});

// Create a default file, so when we run gulp, it runs all we need. 
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);