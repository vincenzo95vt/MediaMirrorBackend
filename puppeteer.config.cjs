const { join } = require("path");

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  cacheDirectory: join(__dirname, ".cache", "puppeteer"), // 🔥 Guarda la caché en una carpeta persistente
};