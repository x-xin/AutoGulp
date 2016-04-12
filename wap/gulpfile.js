var gulp            =   require("gulp"),                 // gulp
    less            =   require('gulp-less'),            // 将LESS编译成CSS
    minifycss       =   require('gulp-minify-css'),      // 压缩css
    sprite          =   require("gulp.spritesmith"),     // 切片合并成雪碧图的工具
    imagemin        =   require("gulp-imagemin");        // 压缩图片
    clean           =   require('gulp-clean'),           // 清空文件夹
    plumber         =   require("gulp-plumber"),         // 任务错误中断自动重传
    jshint          =   require("gulp-jshint"),          // JS 语法检查
    concat          =   require("gulp-concat");          // JS 合并
    uglify          =   require("gulp-uglify"),          // JS 压缩
    cache           =   require("gulp-cache");           // 缓存
    
    path        	=   {    
					        dev: 'dev/',                 // dev
					        dest: 'dest/'                // dest
				        };

// less
gulp.task("less",function(){
	gulp
	    .src(path.dev+'less/styles.less')                // 选择要编译的文件
	    .pipe(plumber(function(error){                   // 错误信息
	    	console.log(error);
	    	console.log('--------------------------  less Syntax Error! --------------------------');
	    }))
	    .pipe(less())                                    // 编译
	    .pipe(minifycss())                               // 压缩
	    .pipe(gulp.dest(path.dest+'css'));               // 压缩完毕存放的路径
});

// clean
gulp.task('clean', ['clean:imagesDefault', 'clean:imagesSprite']);

gulp.task('clean:css', function() {
	gulp
		.src([
			path.dest+'css/**'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:js', function() {
	gulp
		.src([
			path.dest+'js/**/*'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:imagesDefault', function() {
	gulp
		.src([
			path.dest+'img/default/*.{png,jpg,jpeg,gif}'
		], {read: false})
		.pipe(clean({force: true}));
});

gulp.task('clean:imagesSprite', function() {
	gulp
		.src([
			path.dest+'img/sprite/*.{png,jpg}'
		], {read: false})
		.pipe(clean({force: true}));
});


// handle JS And images
gulp.task("handle", ['clean','handle:js','handle:images']);

gulp.task("handle:js",function(){
	gulp
	    .src(path.dev+'js/**.js')                        // 选择要编译的文件
	    .pipe(plumber(function(error){                   // 错误信息
	    	console.log(error);
	    	console.log('--------------------------  Js Syntax Error! --------------------------');
	    }))
	    // .pipe(jshint())                               // Js 语法检查
	    .pipe(concat("all.js"))                          // 合并为all.js
	    .pipe(uglify())                                  // 压缩
	    .pipe(gulp.dest(path.dest+'js/'))                // 压缩完毕存放的路径
});

gulp.task("handle:images",function(){                    // 如果需要图片(非大图)的, 请放置default
	gulp
		.src(path.dev + 'img/default/**/*.{png,jpg,jpeg,gif}')
		.pipe(cache(imagemin({
			optimizationLevel: 3,                        // 类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true,                           // 类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true,                            // 类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true                              // 类型：Boolean 默认：false 多次优化svg直到完全优化
		})))
		.pipe(gulp.dest(path.dest+'img/'))               // 压缩完毕存放的路径
});

// sprite 
gulp.task("sprite", ['sprite:png', 'sprite:jpg']);
// png
gulp.task('sprite:png',['clean:imagesSprite'],function(){
	var spriteData = gulp
						.src(path.dev+'img/sprite/**.png') // 源图片素材
						.pipe(sprite({
							imgName: 'sprite.png',        // 合成的雪碧图名
							cssName: 'sprite-png.css',    // 生成的样式名
							// cssTemplate: path.dev+'less/core/handlebarsStr.css.handlebars',
							imgPath: '../img/sprite.png', // 生成的图片路径
							padding: 10
						}));
		spriteData
			.img
			.pipe(gulp.dest(path.dest+'img/'));
		spriteData
			.css
			.pipe(gulp.dest(path.dev+'less/core/'));
});
// jpg
gulp.task('sprite:jpg', ['clean:imagesSprite'], function () {
	var spriteData = gulp
						.src(path.dev+'img/sprite/*.jpg')
						.pipe(sprite({
							imgName: 'sprite.jpg',
							cssName: 'sprite-jpg.css',
							// cssTemplate: path.dev+'less/core/handlebarsStr.css.handlebars',
							imgPath: '../img/sprite.jpg' //生成的图片路径
						}));
		spriteData
			.img
			.pipe(gulp.dest(path.dest+'img/'));
		spriteData
			.css
			.pipe(gulp.dest(path.dev+'less/core/'));
});

// default
gulp.task("default",['clean','handle','sprite'],function(){  // 先执行一次

	//监听图片
	gulp.watch(path.dev+'img/**/*.*', ['handle:images']);

	//监听sprite png
	gulp.watch(path.dev+'img/sprite/*.png', ['sprite:png']);

	// 监听less
    gulp.watch(path.dev+'less/**/*.*', ['less']);

    // 监听JS
    gulp.watch(path.dev+'js/**.js', ['handle:js']);
});