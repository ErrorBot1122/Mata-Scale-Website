// gulp stuff
const browserify = require('browserify'),
      clean = require('gulp-clean'),
      concat = require('gulp-concat'),
      del = require('del'),
      exit = require('gulp-exit'),
      flatmap = require('gulp-flatmap'),
      glob = require('glob'),
      gulp = require('gulp'),
      path = require('path'),
      pump = require('pump'),
      reneme = require('gulp-rename'),
      sourcemaps = require('gulp-sourcemaps'),
      source_stream = require('vinyl-source-stream'),
      uglyify = require('gulp-uglify')

// gulp requires      
const {series, dest, src, watch} = gulp

// other
const process = require("process")

function createBuildEachFile(stream, file) {

    // Starts by creating a var -- (Not This is not optimizes, but mad for readability)
    let currentFileName =  path.basename(file.path, ".js")
    
    // Creates a browerify instance
    let browserifyInst = browserify({
        entries: file.path,
        fullPaths: true
    });

    return browserifyInst.bundle()

        // Gets the bundle
        .pipe(source_stream('bundle.js'))

        // Appends 'Build.min.js' to the current file name
        .pipe(reneme(`${currentFileName}.min.js`))
}

function cleanBuilds() {
    // Deletes all old files
    return del(['./public/builds/*.js', '.public/builds/maps/*.map'])
}

function createBuildTask() {

    // Gets all the website's original js files
    return src('./public/javascripts/*.js')

        // Starts maping
        //.pipe(sourcemaps.init({ largeFile: true }))

        // Creates the build file
        .pipe(flatmap(createBuildEachFile))

        // Finishes by moving all the file the build directory
        .pipe(dest('./public/builds'))
}

function minifyBuildTask(cb) {
    
    pump([
        // Gets all websites 'build' files
        src('./public/builds/*.js'),

        // Compresses the files
        uglyify(),

        // Finishes writing and oututs to sourse maps
        //sourcemaps.write('maps'),

        // Finishes by moving all the file the build directory
        dest('./public/builds')
    
    // Ends the task
    ], cb());

    process.exit(0);
}

// returns all the taskes in order
exports.default = series(cleanBuilds, createBuildTask, minifyBuildTask)