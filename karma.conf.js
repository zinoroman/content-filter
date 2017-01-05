module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            // paths loaded via module imports
            {
                pattern: 'node_modules/requirejs/require.js', 
                included: true, 
                watched: true
            },
            {
                pattern: 'test/**/*.spec.js', 
                included: true, 
                watched: true
            }
        ],
        preprocessors: {
            // add webpack as preprocessor
            'test/**/*.spec.js': ['webpack']
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    })
}