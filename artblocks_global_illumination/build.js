const fs = require('fs')
const minifyJs = require("terser").minify;
const { GlslMinify } = require('webpack-glsl-minify/build/minify')

try {
  (async () => {
    let data = fs.readFileSync('./index.js', 'utf8')
    // console.log(data.split('/*glsl*/').map(s=>s.slice(0,100)))
    let [dataJs1, dataGlsl, dataJs2] = data.split('/*glsl*/')
    dataGlsl = dataGlsl.slice(1, -1)
    dataGlsl = dataGlsl.replaceAll('${', '${gl_z_')
    // console.log(dataGlsl)
    new GlslMinify().execute(dataGlsl).then(result => {
      dataGlsl = result.sourceCode
      dataGlsl = dataGlsl.replaceAll('gl_z_', '')
      data = dataJs1 + '`' + dataGlsl + '`' + dataJs2
      // console.log(data.slice(0,100))

      let code = minifyJs(
        data,
        {
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
            keep_classnames: true,//false,
            keep_fnames: /^(setup|draw)$/,
            toplevel: true,
          },
          module: false,
          sourceMap: false,
          output: {
            comments: 'some',
          },
        }
      ).then((c) => {
        console.log(c.code)
        fs.writeFileSync("dist/script.js", c.code);
    })

    });
  })();

} catch (err) {
  console.error(err)
}