/**
 * Scale `img` to fit within `width` / `height`
 * and and invoke `fn(err, img)`.
 *
 * @param {String|Image} img or data uri
 * @param {Number} width
 * @param {Number} height
 * @param {Function} fn
 * @api public
 */
(function (global) {
  function thumb(img, width, height, fn, quality) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    if ('string' == typeof img) {
      fromURI(img, resize);
    } else {
      resize(null, img);
    }

    function resize(err, img) {
      if (err) return fn(err);
      var ratio = img.width / width > img.height / height
        ? img.width / width
        : img.height / height;

      if (ratio > 1) {
        width = Math.ceil(img.width / ratio);
        height = Math.ceil(img.height / ratio);
      } else {
        width = img.width;
        height = img.height;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      fromURI(canvas.toDataURL('image/jpeg', quality || .9), fn);
    }
  }

  /**
   * Return `Image` from data uri `str`
   * and invoke `fn(err, img)`.
   *
   * @param {String} str
   * @param {Function} fn
   * @api private
   */

  function fromURI(str, fn) {
    var img = new Image
    img.onerror = fn;
    img.onload = function(e){ fn(null, img, str) };
    img.src = str;
  }
  global.thumb = thumb;
}).call(this, this);


