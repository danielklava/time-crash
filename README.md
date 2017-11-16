# Time Crash

In a post-apocalyptic period that happened after the first Time Crash happened, you must reach the origin point of the catastrophe to turn off the lab expriment responsible for all the destruction - but you must face elements out-of-time to reach it, like velociraptors (with feathers, since this is a scientific acurate game), and Napoleon's soldiers.

_Earth cannot survive another Time Crash. You have 30 seconds!_


## Installation

Since this project uses Daniel Belohlavek's Phaser ES6 Boilerplate[es6], the installation instructions are the same as [his][1].

You need [Node.js and npm](https://nodejs.org/). You should also have git installed, but it's not mandatory.

Clone the repository (or download the ZIP file)

`git clone https://github.com/danielklava/time-crash.git`

Install dependencies by running npm

`npm install`

From there you can run either a development build or a production build:
* Development build:
  `npm start`

* Production build:
  `npm run production`

Development builds will copy `phaser.min.js` together with `phaser.map` and `phaser.js`
Your ES6 code will be transpiled into ES5 and concatenated into a single file.
A sourcemap for your code will also be included (by default `game.map.js`).

Production builds will only copy `phaser.min.js`. Your ES6 code will be transpiled and
minified using UglifyJS.

Any modification to the files inside the `./src` and `./static` folder will trigger a full page reload.

If you modify the contents of other files, please manually restart the server.

## Credits

*  This projects uses the Phaser ES6 Boilerplate by Daniel Belohlavek:
  https://github.com/joshuamorony/phaser-es6-boilerplate

## License

This project is released under the MIT License.

[1]: https://github.com/joshuamorony/phaser-es6-boilerplate/blob/master/README.md "Phaser ES6 Boilerplate"
