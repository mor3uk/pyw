export const deepClone = function (obj) {
  var copy;
  if (null == obj || "object" != typeof obj) return obj;
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }
  if (obj instanceof Function) {
    copy = function () {
      return obj.apply(this, arguments);
    }
    return copy;
  }
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
    }
    return copy;
  }
  throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name);
}