let s
let g
let tex
function preload() {
  s = loadShader('s.vert', 's.frag');
}
let minWinSize


const depth = 4

function a(i=0,x=0,y=0,seed=random()*1e7) {
  randomSeed(seed*1000)
  let size=1/(3**i)
  if(i>depth || random() > .3 && i > 2){
    return [{x:x, y:y, size: size, color: random(
      // [...Array(5)].map((_,i,a)=>i/(a.length-1)*255)
      ["5f0f40","9a031e","cb793a","fcdc4d","321325",].map(s=>'#'+s)
      // random(256)
    )}]
  }
  else{
    i++
    let c=random([a])
    let seedC = random()
    let d=random([a])
    let seedD = random()
    let s=random([a])
    let seedS = random()
    return [
      d(i,x+0,y+0,seedD),     s(i,x+size,y+0,seedS),     d(i,x+size*2,y+0,seedD),
      s(i,x+0,y+size,seedS),  c(i,x+size,y+size,seedC),  s(i,x+size*2,y+size,seedS),
      d(i,x+0,y+size*2,seedD),s(i,x+size,y+size*2,seedS),d(i,x+size*2,y+size*2,seedD),
    ]
  }
}

function setup() {
  minWinSize = min(windowWidth,windowHeight)
  createCanvas(minWinSize, minWinSize, WEBGL);
  g = createGraphics(900, 900)//, WEBGL);

  g.noStroke()
  let size = 1/depth**2
  g.scale(g.width/3)
  
  let data=a().flat(8)
    
  data.forEach(d=>{
    g.fill(d.color)
    g.rect(d.x,d.y,d.size*3+1/g.width)
  })
  
  shader(s);
  g.fill(0)
  s.setUniform('g', g);
}

function windowResized(){
  
}

function draw() {
  s.setUniform('t', millis()/1000);
  s.setUniform('res', [minWinSize*pixelDensity(),minWinSize*pixelDensity()]);

  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}