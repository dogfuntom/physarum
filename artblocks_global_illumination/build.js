const fs = require('fs')
const minifyJs = require("terser").minify;
const { GlslMinify } = require('webpack-glsl-minify/build/minify')

const minifyOptions = {
  compress: {
    dead_code: true,
    drop_console: true,
    drop_debugger: true,
    keep_classnames: false,
    keep_fargs: false,
    keep_fnames: false,
    keep_infinity: false,
    passes: 5,
    booleans_as_integers: true,
    ecma: 2015,
  },
  mangle: {
    eval: true,
    properties: {
      reserved: ['image', 'setUniform']
    },
    keep_classnames: false,
    keep_fnames: /^(setup|draw)$/,
    toplevel: true,
  },
  module: false,
  sourceMap: false,
  output: {
    comments: 'some',
  },
}

try {
  (async () => {
    let data = fs.readFileSync('./index.js', 'utf8')
    let [dataJs1, dataGlsl, dataJs2] = data.split('/*glsl*/')
    // dataGlsl = ''
    dataGlsl = dataGlsl.slice(1, -1)
    dataGlsl = dataGlsl.replaceAll('${', '${gl_z_')
    new GlslMinify().execute(dataGlsl).then(result => {
      dataGlsl = result.sourceCode
      dataGlsl = dataGlsl.replaceAll('gl_z_', '')
      data = dataJs1 + '`' + dataGlsl + '`' + dataJs2

      let dataArt = data.replaceAll(/\/\*begin features\*\/(.|\n)*?\/\*end features\*\//gm, '');
      minifyJs(dataArt, minifyOptions).then((c) => {
        let art = c.code
        art += `'tx shvembldr piter'`
        fs.writeFileSync("dist/art.js", art);
      })

      let dataFeatures = data.replaceAll(/\/\*begin render\*\/(.|\n)*?\/\*end render\*\//gm, '');
      fs.writeFileSync("dist/features.js", dataFeatures);
      //   minifyJs(dataArt, minifyOptions).then((c) => {
      //   let features = c.code
      //   fs.writeFileSync("dist/features.js", features);
      // })

    });
  })();

} catch (err) {
  console.error(err)
}