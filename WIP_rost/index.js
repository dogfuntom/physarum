import * as p5 from 'p5'
const s = (p) => {
  let ar

  let rot = (x, y, a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];

  let sdf = (point) => {
    let pt = [...point]
    let size = Math.min(p.width, p.height)
    pt[0] = (pt[0] * 2 - p.width) / size
    pt[1] = (pt[1] * 2 - p.height) / size
    pt[2] = (pt[2] * 2 - p.height) / size
    // return Math.abs(Math.hypot(...pt) - .9)

    // // rotating cage
    // {
    //   let [x, y] = rot(pt[0], pt[1], p.millis() / 5000)
    //   pt[0] = x
    //   pt[1] = y
    // }
    // {
    //   let [x, z] = rot(pt[0], pt[2], p.millis() / 10000)
    //   pt[0] = x
    //   pt[2] = z
    // }
    // pt = pt.map(v => Math.abs(v));
    // pt = pt.map(v => v - .5);
    // if (pt[2] > pt[0]) ([pt[0], pt[2]] = [pt[2], pt[0]])
    // if (pt[1] > pt[0]) ([pt[0], pt[1]] = [pt[1], pt[0]])
    // return Math.abs(Math.hypot(pt[0], pt[2]) - .1)

    {
      let [y, z] = rot(pt[1], pt[2], Math.atan(1/2**.5))
      pt[1] = y
      pt[2] = z
    }
    {
      let [x, z] = rot(pt[0], pt[2], Math.PI/4)
      pt[0] = x
      pt[2] = z
    }
    pt = pt.map(x => x - Math.min(.5,Math.max(-.5,x)))
    return Math.abs(Math.hypot(...pt) - .01)
  }

  let grad = (pt) => {
    let orig = sdf(pt)
    return [
      (orig - sdf([pt[0] - .001, pt[1], pt[2]])) / .001,
      (orig - sdf([pt[0], pt[1] - .001, pt[2]])) / .001,
      (orig - sdf([pt[0], pt[1], pt[2] - .001])) / .001,
    ]
  }

  let makeTriplet = () => {
    let center = [Math.random() * p.width, Math.random() * p.height, Math.random() * p.height];
    return [...Array(1)].map(() => {
      console.log('center', center)
      return center.map(c => c + (Math.random() - .5) * 200)
    })
  }

  let processAr = () => {
    ar.forEach(triplet => {
      console.log('triplet', JSON.stringify(triplet))
      // triplet = triplet.sort((a,b)=>-a[1]+b[1])
      triplet = triplet.sort((a, b) => sdf(a) - sdf(b))
      let last = triplet.pop()
      let e = sdf(last);
      // p.fill(e*255)
      // p.circle(last[0], last[1], 10)
      console.log(...last)
      let gr = grad(last)
      last = last.map((v, i) => v - gr[i] * 10000)
      triplet.unshift(last)

      // pull toward the center

        // let center = [
        //   (triplet[0][0] + triplet[1][0] + triplet[2][0]) / 3,
        //   (triplet[0][1] + triplet[1][1] + triplet[2][1]) / 3,
        //   (triplet[0][2] + triplet[1][2] + triplet[2][2]) / 3,
        // ]
        // triplet[0][0] += (center[0]-triplet[0][0]) * .005
        // triplet[0][1] += (center[1]-triplet[0][1]) * .005
        // triplet[0][2] += (center[2]-triplet[0][2]) * .005
        // triplet[1][0] += (center[0]-triplet[1][0]) * .005
        // triplet[1][1] += (center[1]-triplet[1][1]) * .005
        // triplet[1][2] += (center[2]-triplet[1][2]) * .005
        // triplet[2][0] += (center[0]-triplet[2][0]) * .005
        // triplet[2][1] += (center[1]-triplet[2][1]) * .005
        // triplet[2][2] += (center[2]-triplet[2][2]) * .005
    })
  }

  let drawAr = () => {
    ar.forEach((triplet, i) => {
      p.randomSeed(i * 1e4)
      p.fill(p.random(255))
      p.beginShape()
      triplet.forEach(vertex => {
        p.vertex(vertex[0], vertex[1])
      })
      p.endShape(p.CLOSE)
    })
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    // p.noStroke()
    p.stroke('white')
    ar = [...Array(1000)].map(() => makeTriplet())
    console.log('ar', JSON.stringify(ar))
  }

  p.draw = () => {
    p.background('black')
    // for (let i = 0; i++ < 100;) {
    //   let x = p.random(p.width)
    //   let y = p.random(p.height)
    //   p.fill(sdf([x, y, 0]) * 255)
    //   p.rect(x, y, 3, 40)
    // }
    processAr()
    drawAr()
    if(p.frameCount == 100)p.noLoop()
  }
};
let myp5 = new p5(s);





