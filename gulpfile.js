var gulp = require('gulp'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    beeper = require('beeper'),
    notifier = require('node-notifier'),
    cleanCSS = require('gulp-clean-css')
    /*babel =require('gulp-babel')*/
    
gulp.task('SassCompile', function () {
    return gulp.src(['sass/main_ltr.scss', 'sass/main_rtl.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', function (err) {
            console.log(`-----------------------------------------------------------------`);
            console.log(err.message);
            console.log(`-----------------------------------------------------------------`);
            beeper();

            notifier.notify(
                {
                    title: 'Sass Error Compiling',
                    message: `Error in File : ${err.relativePath} \nError in Line : ${err.line} , Column : ${err.column} `,
                    sound: false,
                    wait: false,
                    timeout: 1
                },
                function (err, response) {
                    // Response is response from notification
                }
            );
            this.emit('end');
        }))
        .pipe(prefix('last 2 versions'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));
});

////////////////////////////////////////////////////////////////////
gulp.task('minifyrtlcss', function () {
    return gulp.src(['css/vendor/rtl/*.css','css/vendor/all.min.css','css/vendor/owl.carousel.min.css','css/vendor/owl.theme.default.min.css','fonts/style.css','css/main_rtl.css'])
        .pipe(sourcemaps.init())
        .pipe(concat('rtlstyle.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css/minifiedStyle'));
});

gulp.task('minifyltrcss', function () {
    return gulp.src(['css/vendor/ltr/*.css','css/vendor/all.min.css','css/vendor/owl.carousel.min.css','css/vendor/owl.theme.default.min.css','fonts/style.css','css/main_ltr.css'])
        .pipe(sourcemaps.init())
        .pipe(concat('ltrstyle.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css/minifiedStyle'));
});

/*//////////////////////////////////////////////////////////////////
gulp.task('default', () =>
	gulp.src('js/main.js')
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(gulp.dest('js/app'))
);
//////////////////////////////////////////////////////////////////////////////

gulp.task('minifyJs', function () { 
    return gulp.src(['scripts/vendor/jquery-3.3.1.min.js','scripts/vendor/all.min.js ','scripts/vendor/bootstrap.bundle.min.js','scripts/vendor/jquery.validate.min.js','scripts/vendor/additional-methods.min.js','scripts/vendor/owl.carousel.min.js','scripts/main.js'])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify()) 
    .pipe(gulp.dest('scripts/MinifiedJs'));
});
//////////////////////////////////////////////////////**********//////

gulp.task('watch', function () {
    gulp.watch(['sass/*.scss','sass/*/*.scss','scripts/*.js'], 
    gulp.series(['SassCompile','minifyltrcss','minifyrtlcss','minifyJs']));
});
