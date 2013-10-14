imaging
=======

Drawing image in your terminal whithout node-canvas

## Installing

For [node](http://nodejs.org) with [npm](http://npmjs.org):

__windows__
```bash
npm install imaging -g
```
__Mac/Linux__

```bash
sudo npm install imaging -g
```

## Usage


### Command line:

```bash
imaging https://www.google.com.hk/images/srpr/logo11w.png
```

Use in mac/linux sometime need `sudo`:
```bash
sudo imaging https://www.google.com.hk/images/srpr/logo11w.png
```

Specifies the `width` of the image：
```bash
sudo imaging https://www.google.com.hk/images/srpr/logo11w.png -w 20
```

### Nodejs module

```javascript
var imaging = require('imaging');
imaging.draw('1.jpg', function (resp) {
    /*
      resp is the image charater string.
      conols.log(resp) to render the image in your terminal
    */
    console.log(resp);
});

// limit the width for rendering
imaging.draw('1.jpg', { width: 50}, function (resp) {
    /*
      resp is the image charater string.
      conols.log(resp) to render the image in your terminal
    */
    console.log(resp);
});
```

## API

```javascript
imaging.draw(path, [options], callback) //path could be a remote link or local resource
```


## Example

__Source image:__

![source](http://switer.github.io/live/imaging_img.png)

__Draw into terminal:__

![imaging](http://switer.github.io/live/imaging_render.png)

