'use strict';

var fs = require('fs');

module.exports = function(grunt) {

    function generateFiles() {
        var urls = JSON.parse(fs.readFileSync('./urls.js', 'utf8'));
        var viewports = [{
            width: 375,
            height: 667
        }, {
            width: 768,
            height: 1024
        }, {
            width: 1024,
            height: 768
        }, {
            width: 1440,
            height: 900
        }, {
            width: 1920,
            height: 1080
        }];

        var files = {};
        for (var i = 0; i < urls.length; i++) {
            for (var t = 0; t < viewports.length; t++) {
                var path = urls[i].replace(/http(s*):\/\//, '').replace(/\/$/, '').replace(/[\.\/]/g, '-');
                var uniqueKey = './output/screenshot_' + viewports[t].width + 'x' + viewports[t].height + '_' + path;
                files[uniqueKey] = {
                    options: {
                        siteType: 'url',
                        site: urls[i],
                        savePath: './' + uniqueKey + '.png',
                        windowSize: {
                            width: viewports[t].width,
                            height: viewports[t].height
                        },
                        shotSize: {
                            width: viewports[t].width,
                            height: 'all'
                        },
                        renderDelay: 1000,
                        quality: 85
                    }
                };
            }
        }

        return files;
    }

    grunt.loadNpmTasks('grunt-webshot');

    grunt.initConfig({
        webshot: generateFiles()
    });

    grunt.registerTask('default', ['webshot']);
};
