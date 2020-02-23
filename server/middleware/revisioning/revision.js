const gulp = require('gulp')
const rev = require('gulp-rev')
const revReplace = require('gulp-rev-replace')
const revDelOrig = require('gulp-rev-delete-original')

gulp.task('revision-js', () => {
  const srcJS = ['../../../build/assets/js/*.js']
  const buildJsFolder = '../../../build/assets/js'
  const buildManifestFolder = '../../../build/assets'

  return gulp
    .src(srcJS)
    .pipe(rev())
    .pipe(revDelOrig())
    .pipe(gulp.dest(buildJsFolder))
    .pipe(
      rev.manifest(`${buildManifestFolder}/rev-manifest.json`, {
        base: buildManifestFolder,
        merge: true,
      }),
    )
    .pipe(gulp.dest(buildManifestFolder))
})

gulp.task('revision-css', () => {
  const srcCSS = ['../../../build/assets/css/*.css']
  const buildCssFolder = '../../../build/assets/css'
  const buildManifestFolder = '../../../build/assets'

  return gulp
    .src(srcCSS)
    .pipe(rev())
    .pipe(revDelOrig())
    .pipe(gulp.dest(buildCssFolder))
    .pipe(
      rev.manifest(`${buildManifestFolder}/rev-manifest.json`, {
        base: buildManifestFolder,
        merge: true,
      }),
    )
    .pipe(gulp.dest(buildManifestFolder))
})

gulp.task('replace-js', ['revision-js'], () => {
  const buildFolder = '../../../build/assets'
  const revisionFile = '../../views/layouts/default.html'
  const layoutFolder = '../../views/rev-layouts'
  const manifest = gulp.src(`${buildFolder}/rev-manifest.json`)

  return gulp
    .src(revisionFile)
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest(layoutFolder))
})

gulp.task('replace-css', ['revision-css'], () => {
  const buildFolder = '../../../build/assets'
  const revisionFile = '../../views/layouts/default.html'
  const layoutFolder = '../../views/rev-layouts'
  const manifest = gulp.src(`${buildFolder}/rev-manifest.json`)

  return gulp
    .src(revisionFile)
    .pipe(revReplace({ manifest: manifest }))
    .pipe(gulp.dest(layoutFolder))
})
