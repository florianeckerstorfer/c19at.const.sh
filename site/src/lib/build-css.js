const path = require("path");
const postcss = require("postcss");
const md5 = require("md5");
const fs = require("fs");

module.exports = async function (fileName) {
  const cssDir = path.join(__dirname, "..", "css");
  const rawFilepath = path.join(cssDir, fileName);

  const css = await postcss([
    require("postcss-import"),
    require("postcss-clean"),
  ])
    .process(fs.readFileSync(rawFilepath), { from: rawFilepath })
    .then((result) => result.css);

  const hash = md5(css).slice(0, 8);
  const base = fileName.replace(path.extname(fileName), "");
  const permalink = `css/${base}.${hash}.css`;
  const href = `/${permalink}`;

  return { css, permalink, href };
};
