// There are a million ways to look at the moon, but the moon is always the same.

// Click or hit Space to get a new artwork.
// Press 1...9 to select the auto update speed, press 0 to stop.

// generative art,pixel,interactive,regex

import { generate } from 'css-tree';
import * as p5 from 'p5'
const s = (p) => {

  let outCol, size, st, commonLetter


  let regex = (str) => {
    let r = p.random([
      {
        rx: /(\w)(\w)(\w)(\w)/g,
        tmpl: "$4$3$2$1",
      },
      {
        rx: /(\w)(\w)(\w)/g,
        tmpl: "$3$2$1",
      },
      {
        rx: /(\w)\w/g,
        tmpl: "$1$1",
      },
      // {
      //   rx: /\w(\w)\w/g,
      //   tmpl: "$1$1$1",
      // },
    ]);
    str = str.replaceAll(r.rx, r.tmpl);
    return str;
  };


  let upscale = (str, times) => {
    let size = p.floor(p.sqrt(str.length));
    let res = "";
    for (let i = 0; i < size; i++) {
      res += str.slice(0, size).repeat(times);
      str = str.slice(size);
    }
    return res.replaceAll(/(\w)/g, "$1".repeat(times));
  };

  let rotate = (str) => {
    let size = p.floor(p.sqrt(str.length));
    let res = "";
    for (let i = 0; i < size * size; i++) {
      let x = i % size;
      let y = p.floor(i / size);
      res += str[x * size + size - y - 1];
    }
    return res;
  };

  let getRandomLetter = (str) => str[p.floor(p.random(str.length))];

  let mutate = (str) => {
    let randomLetter = getRandomLetter("0123456789abcdef");
    str = str.split("");
    str[p.floor(p.random(str.length))] = randomLetter;
    str = str.join("");
    return str;
  };

  let extend = (str) => {
    return str
      .split("")
      .map((s, i) => s + (i < 2 ? "_" : ""))
      .join("");
  };



  function findTheMostCommonLetter(str) {
    let obj = {};
    let amount = 0;
    let letter = "";
    str
      .toLowerCase()
      .split("")
      .forEach((letter) => {
        if (obj[letter]) {
          obj[letter]++;
        } else {
          obj[letter] = 1;
        }
      });

    for (let l in obj) {
      if (obj[l] > amount) {
        amount = obj[l];
        letter = l;
      }
    }

    return letter;
  }

  let getColorByLetter = (letter) => {
    let dict = {
      0: "#000001",
      1: "#1D2B52",
      2: "#7E2552",
      3: "#008750",
      4: "#AB5235",
      5: "#5F574E",
      6: "#C2C3C8",
      7: "#FFF1E7",
      8: "#FF014D",
      9: "#FFA300",
      a: "#FFEC28",
      b: "#01E435",
      c: "#30ADFF",
      d: "#83769D",
      e: "#FF77A7",
      f: "#FFCCAB",
    };
    return dict[letter] ? dict[letter] : "#fff0";
  };

  p.windowResized = () => {
    let size = p.min(window.innerWidth, window.innerHeight);
    p.resizeCanvas(size, size);
    // g=createGraphics(size, size)
    if (outCol) p.draw()
  }


  let g;


  let generate = () => {
    // document.querySelector('canvas').style.opacity = .3
    st = "0123456789abcdef"
      .split("")
      .sort(() => p.random() - 0.5)
      .slice(0, 4)
      .join(); // precious bug! Do not fix
    for (let i = 0; i < 6; i++) {
      // st = extend(st);
      st = mutate(st);
      // if (random() < 0.5) st = regex(st);
      // if (random() < 0.5) st = regex(st);
      if (p.random() < 0.5) st = rotate(st);
      st = upscale(st, 2);
    }

    commonLetter = findTheMostCommonLetter(st);

    outCol = getColorByLetter(getRandomLetter("123458bcde"));
    size = p.floor(p.sqrt(st.length));
  }

  p.setup = () => {
    p.createCanvas(100, 100);
    g = p.createGraphics(100, 100);
    p.windowResized();
    p.noStroke();
    p.frameRate(1 / 4);
    p.noLoop();
    generate()
    p.draw();
  };

  p.mouseClicked = () => {
    generate()
    p.draw()
  }

  let blink = () => {
    document.querySelector('canvas').style.opacity = 0
    setTimeout(() => document.querySelector('canvas').style.opacity = 1, 100)
  }

  let timer
  p.keyPressed = (key) => {
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
        generate();
        p.draw()
        timer = setInterval(() => { generate(); p.draw() }, 1.5 ** digit * 400)
      }
    }
    if (key.code == 'Space') {
      p.mouseClicked()
    }
    // console.log(key)
  }



  p.draw = () => {
    p.background(outCol);
    document.body.style.backgroundColor = p.color(outCol).toString();
    if (g) g.remove()
    g = p.createGraphics(p.width, p.height);
    g.noStroke();

    // background('black');
    for (let i = 0; i < 1; i += 0.5) {
      p.fill(p.lerpColor(p.color(outCol), p.color("white"), i));
      p.circle(p.width / 2, p.height / 2, p.height * (1 - i ** 8));
    }

    g.scale(g.width / size);
    for (let i = 0; i < size * size; i++) {
      let x = i % size;
      let y = p.floor(i / size);
      // push()
      // translate(x,y)
      // console.log(st[i])
      // if (st[i] == commonLetter) noFill();
      // else fill("#000");
      // beginShape()
      // vertex(1,0)
      // vertex(0,1)
      // vertex(.5,1.5)
      // vertex(1.5,1.5)
      // vertex(1.5,.5)
      // endShape()
      if (st[i] == commonLetter) g.noFill();
      else g.fill(getColorByLetter(st[i]));
      g.rect(x, y, 1.05, 1.05);
      // pop()
    }



    p.tint(...p.color(outCol).levels.slice(0, 3), 40);
    p.image(g, p.width / size / 4, p.height / size / 4, p.width, p.height);
    p.tint(255, 255);
    p.image(g, 0, 0, p.width, p.height);
    // setTimeout(() => document.querySelector('canvas').style.opacity = 1, 100)
    // document.querySelector('canvas').style.opacity = 1
  };
};
let myp5 = new p5(s);





