const fs = require('fs')
const minifyJs = require("terser").minify;
const { GlslMinify } = require('webpack-glsl-minify/build/minify')

/*glsl*/    /*glsl*/

const minifyOptions = {
  compress: {
    dead_code: true,
    drop_console: true,
    // drop_console: false, // FIXME
    drop_debugger: true, // FIXME
    keep_classnames: false,
    keep_fargs: false,
    keep_fnames: false,
    keep_infinity: false,
    passes: 2,
    booleans_as_integers: false,
    ecma: 2015,
    // pure_getters: true,
  },
  mangle: {
    eval: true,
    properties: false,
    // properties: {
    //   reserved: ['image', 'setUniform', 'shader','pixelDensity','quad']
    //   // regex: /^(size|span)$/,
    // },
    keep_classnames: false,
    keep_fnames: false,
    // keep_fnames: /^(setup|draw)$/,
    toplevel: true,
  },
  format: {
    wrap_func_args: false,
  },
  module: false,
  sourceMap: false,
  // output: {
  //   comments: 'some',
  // },
}

try {
  (async () => {
    let data = fs.readFileSync('./index.js', 'utf8')
    let [dataJs1, dataGlsl, dataJs2] = data.split('/*glsl*/')
    // dataGlsl = ''
    dataGlsl = dataGlsl.slice(1, -1)
    dataGlsl = dataGlsl.replaceAll('${', '${gl_z_')
    new GlslMinify().execute(dataGlsl).then(result => {
      dataGlsl = result.sourceCode // comment to avoid GLSL minification
      dataGlsl = dataGlsl.replaceAll('gl_z_', '')
      dataGlsl = dataGlsl.replace(/\n#define /g, '@')
      data = dataJs1 + '`' + dataGlsl + '`' + dataJs2

      let dataArt = data.replaceAll(/\/\*begin features\*\/(.|\n)*?\/\*end features\*\//gm, '');
      minifyJs(dataArt, minifyOptions).then((c) => {
        let art = c.code
        art += `'tx shvembldr piter stranger'`
        fs.writeFileSync("dist_/art.js", art);
      })

      let dataFeatures = data.replaceAll(/\/\*begin render\*\/(.|\n)*?\/\*end render\*\//gm, '');
      fs.writeFileSync("dist_/features.js", dataFeatures);
      //   minifyJs(dataArt, minifyOptions).then((c) => {
      //   let features = c.code
      //   fs.writeFileSync("dist/features.js", features);
      // })

    });
  })();

} catch (err) {
  console.error(err)
}