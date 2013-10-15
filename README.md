imaging
=======

Drawing image in your terminal whithout node-canvas,and the outputing image is more clear than using `picture-tube`.

__Imaging__, let your  terminal outputs more interesting.

![imaing](https://raw.github.com/switer/live/gh-pages/imaging.png)

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
imaging https://www.google.com.hk/images/srpr/logo11w.png -w 20
```

### Nodejs module

```javascript
var imaging = require('imaging');
imaging.draw('1.jpg', function (resp, status) {
    /*
      if status == 'success', resp is the image charater string.
      conols.log(resp) to render the image in your terminal
      else if if status == 'fail', resp is the error message
    */
    console.log(status);
    console.log(resp);
});

// limit the width for rendering
imaging.draw('1.jpg', { width: 50}, function (resp, status) {
    /*
      if status == 'success', resp is the image charater string.
      conols.log(resp) to render the image in your terminal
      else if if status == 'fail', resp is the error message
    */
    (status == 'success') && console.log(resp);
});
```

## API

```javascript
imaging.draw(path, [options], callback) //path could be a remote link or local resource
```
__options:__ `object`
* `width` -  the width of image for rendering 

__callback:__ `function (resp, status)`
* `status == "fail"` - resp: error msg
* `status == "success"` - resp:imaging string in color format

## Example

__Source image:__

![source](http://switer.github.io/live/imaging_img.png)

__Draw into terminal:__

![imaging](http://switer.github.io/live/imaging_render.png)

