'use strict';
let twgl = require('twgl.js')
// let chroma = require('chroma-js')
const mousepos = [0, 0];
let pause = false
let tick = 0

let params

let isCanvasSquare = false
////////////////////
// CUSTOM CODE BELOW
////////////////////

dartTheme = true
let svg = document.querySelector('svg')

import { grammar } from "calyx"

const rules = grammar({
  "start": ['{g}', '{g} {start}'],
  'g': ['{kebab}',
  '{kebab} {g}',
  '{kebab} {g}',
  '{kebab} {g}',
  '{kebab} {g}',
  '{kebab} {g}',
  '{kebab} {g}',
'{kebab} {g}'],
  'kebab': [`<g transform='translate(r-100:101:20 r-100:101:20)'>{kebabLine}{kebabCircles}</g>`],
  'kebabLine': `<line x1=0 x2=0 y1="-120" y2="120" />`,
  'kebabCircles': ['{circles}'],
  'circles': [`{circle} {circles}`, 
  `{circle} {circles}`,
  `{circle} {circles}`,
  `{circle} {circles}`,
  `{circle} {circles}`,
  `{circle} {circles}`,
  `{circle} {circles}`,
  `{circle} {circles}`,
  `{circle} {circles}`,
`{circle}`],
  'circle': [`<circle cx='0' cy='0' r='r10:41:10' stroke-width='r1:3:1' />`],
  // "AB": ['A', 'B'],
})
svg.setAttribute('fill', 'none')
svg.setAttribute('stroke', 'black')
svg.setAttribute('stroke-width', '1.5')
svg.setAttribute('viewBox', '-256 -256 512 512')

function randomize(str) {
  // str.replace(/r\d+/,/)
}

function replacer(match, p1, offset, string) {
  // p1 - не цифры, p2 - цифры, p3 - не буквы и не цифры
  // console.log(p1)
  let n = p1.split(':').map(Number)
  // console.log(n)
  if (n.length == 3)
    return n[0] + Math.floor((n[1] - n[0]) * Math.random() / n[2]) * n[2];
  if (n.length == 2)
    return n[0] + (n[1] - n[0]) * Math.random();
  else
    return n[0] * Math.random();
}
// var newString = "you 'r50-60-2'  'r0-60-10'  'r50' this".replace(/'r([\d-]+)'/g, replacer)
// console.log(newString)


////////////////////
// CUSTOM CODE END
////////////////////


mouseClicked()
windowResized()








function draw() {
  tick++
}

function animate() {
  // if (pause) return;
  // let timeCurrent = +new Date()
  // time += timeCurrent - timePrev
  // timePrev = timeCurrent
  // draw()
  // requestAnimationFrame(animate)
}
animate()

function setMousePos(e) {
  mousepos[0] = e.clientX / gl.canvas.clientWidth;
  mousepos[1] = 1 - e.clientY / gl.canvas.clientHeight;
}

// canvas.addEventListener('mousemove', setMousePos);

// canvas.addEventListener('mouseleave', () => {
//   mousepos[0] = .501;
//   mousepos[1] = .501;
// });

function handleTouch(e) {
  e.preventDefault();
  setMousePos(e.touches[0]);
}



window.addEventListener('click', mouseClicked)
window.addEventListener('touchstart', mouseClicked)
function mouseClicked() {
  // palette = palettes[Math.floor(palettes.length * Math.random())].map(c => chroma(c).gl())
  // palette = palette.sort((a, b) => chroma(a).get('lch.l') - chroma(b).get('lch.l'))
  params = [Math.random(), Math.random(), Math.random(), Math.random(),]

  ////////////////////
  // CUSTOM CODE BELOW
  ////////////////////
  let html = rules.generate().text.replace(/r([\d-:]+)/g, replacer)
  document.querySelector('svg').innerHTML = html
  console.log(html)

  ////////////////////
  // CUSTOM CODE END
  ////////////////////
  draw()
}

window.addEventListener('resize', windowResized)
function windowResized() {
}

let blink = () => {
  // document.querySelector('canvas').style.opacity = 0
  // setTimeout(() => document.querySelector('canvas').style.opacity = 1, 100)
}

let timer
window.addEventListener('keypress', keyPressed)
function keyPressed(key) {
  if (key.code.slice(0, 5) == 'Digit') {
    let digit = Number(key.key)
    if (digit == 0) {
      blink()
      clearInterval(timer)
    }
    else {
      if (!digit) return // NaN check, just in case
      clearInterval(timer)
      blink()
      mouseClicked()
      timer = setInterval(() => { mouseClicked() }, 1.5 ** digit * 400)
    }
  }
  if (key.code == 'Space') {
    pause = !pause
    if (pause) {
    }
    else {
      timePrev = +new Date()
      animate()
    }
  }
  // if (key.code == 'KeyS') {
  //   saveImage()
  // }
}

// function saveImage() {
//   let size = 10000
//   let splits = Math.ceil(size / 512)
//   let step = 1 / splits
//   let splitSize = size / splits
//   canvas.width = splitSize
//   canvas.height = splitSize

//   var dynamicCanvas = document.createElement("canvas");
//   var dynamicContext = dynamicCanvas.getContext("2d")
//   dynamicCanvas.height = size;
//   dynamicCanvas.width = size;

//   let date = new Date()
//   for (let i = 0; i < 1; i += step) {
//     for (let j = 0; j < 1; j += step) {
//       gl.useProgram(program.program);
//       twgl.setBuffersAndAttributes(gl, program, positionBuffer);
//       twgl.setUniforms(program, {
//         // prevStateCells: shader.attachments[0],
//         tick: tick,
//         // palette: palette.flat(),
//         u_time: time / 1000,
//         u_resolution: [gl.canvas.width, gl.canvas.height],
//         u_mouse: mousepos,
//         params: params,
//         viewbox: [i, j, step, step],
//         dartTheme: dartTheme,
//       });
//       twgl.bindFramebufferInfo(gl, null);
//       twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);

//       dynamicContext.drawImage(canvas, i * size, size - (j + step) * size);
//     }
//   }


//   let link = document.getElementById('link');
//   link.setAttribute('download', `image.png`);
//   link.setAttribute('href', dynamicCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
//   link.click();

//   // resume
//   windowResized()
//   draw()
// }