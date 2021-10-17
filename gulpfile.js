//gul, gulp-rename, gulp-sass, sass, gulp-notify, browser-sync
var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass')(require('sass')); //npm install --save-dev sass
var notify = require('gulp-notify');	
var browserSync = require('browser-sync').create();	

//css congig
function cssconfig(done) {
	
	gulp.src('./project/assets/scss/main.scss')
		.pipe(sass({
			errorLogToConsole:true,
			outputStyle:'compressed'
		}))
		.on('error', console.error.bind(console))
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('./project/assets/css/'))
		.pipe(notify({
			title: 'Gulp',
			subtitle: 'sass success',
			message: 'sass update OK',
			sound: false
		}))
		.pipe(browserSync.stream());
	
	done();
}
//Server
function sync(done){
	browserSync.init({
		server:{
			baseDir:'./project'
		},
		port:3000
	});
	done();
}
//ServerReload
function borwserReload(done){
	browserSync.reload()
	done();
}
// watch
function watch(){
	gulp.watch('./project/assets/scss/main.scss',cssconfig);
	gulp.watch('./project/*.html',borwserReload);
	gulp.watch('./project/*.php',borwserReload);
	gulp.watch('./project/*.js',borwserReload);

}
gulp.task('default', gulp.parallel(sync, watch));

