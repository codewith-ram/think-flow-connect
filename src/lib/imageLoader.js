// Simple image loader that returns the original src
// This is used with the 'custom' image loader in next.config.js
// to bypass image optimization during static export

module.exports = function customLoader({ src, width, quality }) {
  return `${src}?w=${width}&q=${quality || 75}`;
};
