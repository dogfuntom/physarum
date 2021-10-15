const fs = require('fs')
const minifyJs = require("terser").minify;

try {
  // console.log(data)
  (async () => {
    let data = fs.readFileSync('./index.js', 'utf8')
    let result = await minifyJs(
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
            reserved: ['image','setUniform']
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
    )//.then(()=>{       
    fs.writeFileSync("dist/script.js", result.code);
    // });
  })();

} catch (err) {
  console.error(err)
}