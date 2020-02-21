const gulp = require('gulp')
const rev = require('gulp-rev')
const revReplace = require('gulp-rev-replace')
const revDel = require('rev-del')
const revDelOrig = require('gulp-rev-delete-original')

gulp.task('revision', () => {
  const srcFiles = ['../../../build/assets/css/*.css', '../../../build/assets/js/*.js']
  const buildFolder = '../../../build/assets'

  return gulp
    .src(srcFiles, { base: buildFolder })
    .pipe(rev())
    .pipe(revDelOrig())
    .pipe(gulp.dest(buildFolder))
    .pipe(rev.manifest())
    .pipe(revDel({ dist: buildFolder }))
    .pipe(gulp.dest(buildFolder))
})

gulp.task('replace', ['revision'], () => {
  const buildFolder = '../../../build/assets'
  const layoutFile = '../../views/layouts/default.html'
  const layoutFolder = '../../views/layouts'
  const manifest = gulp.src(`${buildFolder}/rev-manifest.json`)

  return gulp
    .src(layoutFile)
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest(layoutFolder))
})

// gulp.task('clean', ['revision'], () => {
//   const buildFolder = '../../../build/assets'

//   return gulp
//     .src([`${buildFolder}/**/*`], { read: false })
//     .pipe(revDistClean(`${buildFolder}/rev-manifest.json`))
// })
