const path = require("path");
const CracoLessPlugin = require("craco-less");

const pathResolve = (pathname) => path.resolve(__dirname, pathname);

module.exports = {
  plugins: {
    plugin: CracoLessPlugin,
  },

  webpack: {
    alias: {
      "@": pathResolve(__dirname, "src"),
    },
  },
};
