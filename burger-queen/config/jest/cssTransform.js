//cssTransform.js
"use strict";

module.exports = {
  process(/* src, filename, config, options */) {
    return {
      code: "module.exports = {};",
    };
  },
  getCacheKey() {
    return "cssTransform";
  },
};
