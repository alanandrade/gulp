
//https://css-tricks.com/gulp-for-beginners/

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	stylus = require('gulp-stylus'),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create();
	
//RETIRAR COMENTÁRIO PARA ATIVAR SASS
//gulp.task('sass', function(){
	//return gulp.src('app/scss/**/*.scss')
	//.pipe (sass())
	//.pipe(cleanCSS({compatibility: 'ie8'}))
    //.pipe(autoprefixer())
    //.pipe(concat('style.min.css'))
	//.pipe(gulp.dest('app/css/'))
	//.pipe(browserSync.reload({
		//stream: true
	//}))
//});

//ADICIONAR COMENTÁRIO PARA DESATIVAR STYLUS
gulp.task('stylus', function(){
	return gulp.src('app/stylus/**/*.styl')
	.pipe (stylus())
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(autoprefixer())
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest('app/css/'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'app'
		},
			port: 8080,
   			startPath: 'index.html',
	});
});


gulp.task('watch', ['browserSync', 'sass', 'stylus'], function(){
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/stylus/**/*.styl', ['stylus']);
	// Recarrega o navegador sempre que os arquivos HTML ou JS forem alterados
	gulp.watch('app/*.html', browserSync.reload); 
  	gulp.watch('app/js/**/*.js', browserSync.reload);
  	gulp.watch('app/css/**/*.css', browserSync.reload);
  	gulp.watch('app/css/**/*.min', browserSync.reload);
});