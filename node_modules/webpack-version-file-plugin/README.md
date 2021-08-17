Webpack Version File Plugin
============

Plugin for Webpack which allows you to generate a static version file that can be deployed. Inspired by [morficus/version-file](https://github.com/morficus/version-file)

## Use case
This plugin can be used to automatically let Webpack generate a file containing version information, based on the information in your NPM package.json.

Can be used to let your webapp detect when a new version is available.


## Sample outfile file content

	{
		"version" : {
			"name":      "My AngularJS App",
			"buildDate": "Mon Nov 23 2015 14:26:25 GMT+0100 (CET)",
			"version":   "5.37.0"
		}
	}

## Available config options:

- outputFile: the path and filename of where to store the output
- template: path to your template
- templateString: an [EJS](https://www.npmjs.org/package/ejs) template string
- packageFile: path to your package.json. 
- extras: {}: an object for any extra information you want to use in your template

## Templating

This modules uses [EJS](https://www.npmjs.org/package/ejs) as its templating system.
As indicated in the config options section, you can utilize your own template by either (a) passing in a path to an external file or (b) typing the template in-line.

The available options are:
- package: contains all keys of your package.json
- buildDate: a human-readable time stamp
- extras: an object containing any custom / additional data that is needed in the template

### Sample Webpack Configuration:

```
var path = require('path'),
    webpack = require("webpack"),
    libPath = path.join(__dirname, 'src'),
    wwwPath = path.join(__dirname, 'www'),
    pkg = require('./package.json'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
	VersionFile = require('webpack-version-file-plugin'),




module.exports = {
    entry: path.join(libPath, 'index.js'),
    output: {
        path: path.join(wwwPath),
        filename: 'bundle-[hash:6].js'
    },
    module: {
        loaders: [
			{
	            test: /\.html$/,
	            loader: 'file?name=templates/[name]-[hash:6].html'
	        }, {
	            test: /\.(png|jpg)$/,
	            loader: 'file?name=img/[name].[ext]'
	        }, {
	            test: /\.css$/,
	            loader: "style!css"
	        }
		]
    },
    resolve: {
        root: [path.join(__dirname, "src/libs")]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            pkg: pkg,
            template: path.join(libPath, 'index.html')
        }),
		new VersionFile({
			packageFile:path.join(__dirname, 'package.json'),
			template: path.join(__dirname, 'version.ejs'),
			outputFile: path.join(wwwPath, 'version.json')
		})
	],
    externals: {
    }
};
```

### Sample NPM Configuration:
Adding a script which will automatically update the version before building.
```
{
  "name": "My AngularJS App",
  "version": "17.1.0",
  "description": "App descriptions",
  "author": "...",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npm version minor && rm -rf www/* && webpack",
    "devserver": "webpack-dev-server --port 9100 --progress --colors --no-minimize"
  }
  ... etc
}  
```
Usage
	npm run-script build
