"use strict"

// /*

// // - самому рендерить на СВГ
// - градиенты камушкам рандомные
// - гранолой раскидать
// - запаковка на хик

// - строить пирамидки из них, заблокировать перемещение по оси у
// - раскраска прикольная
// - разнообразить форму
// - СВГ маски для каких-нибудь эффектов.
// - СВГ фильтры для зергистой поверхности и псевдообъёма
// - разобраться, почему из СВГ можно элемент парсить, а из памяти —  нет.

// */

import * as p5 from 'p5'
import "pathseg"
import * as Matter from "matter-js"
// let decomp = require('poly-decomp')
Matter.Common.setDecomp(require('poly-decomp'))


const data = Object.values(require('./n.json').n);

import { Pebble } from "./pebble.js"
import { image } from 'd3-fetch'

document.addEventListener("DOMContentLoaded", () => {

    let pebbles = []

    var Engine = Matter.Engine,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies;

    let engine = Engine.create()
    let world = engine.world
    world.gravity.y = 0.0

    const numberOfPebbles = data.length

    let tPrev

    const s = (s) => {

        let img
        s.preload = () => {
            img = s.loadImage('/n.png')
        };

        s.setup = () => {
            s.createCanvas(600, 600);
            // s.fill(0)
            s.noFill()
            // s.noStroke()

            for (let i = 0; i < numberOfPebbles; i++) {
                let points = data[i].points.map(p => p[0])
                let imgRect = { x: data[i].x, y: data[i].y, width: data[i].width, height: data[i].height }
                let pebbleMask = s.createGraphics(data[i].width, data[i].height)
                let pebbleImg = s.createGraphics(data[i].width, data[i].height)

                pebbleImg.image(img, 0, 0, pebbleImg.width, pebbleImg.height,
                    imgRect.x, imgRect.y, imgRect.width, imgRect.height);

                // pebbleImg.fill('green')
                // pebbleMask.fill(0)

                pebbleMask.beginShape()
                // pebbleImg.beginShape()
                points.forEach(v => {
                    pebbleMask.vertex(v[0] - data[i].x, v[1] - data[i].y)
                    // pebbleImg.vertex(v[0] - data[i].x, v[1] - data[i].y)
                    // console.log(v[0]-data[i].x, v[1]-data[i].y)
                })
                pebbleMask.endShape(s.CLOSE)
                // pebbleImg.endShape(s.CLOSE)

                ;(pebbleImg = pebbleImg.get()).mask(pebbleMask)
                let pebble = new Pebble({
                    x: s.random(-1000, 1000),//data[i].centroid[0],
                    y: s.random(-1000, 1000),//data[i].centroid[1],
                    world,
                    points,
                    centroid: data[i].centroid,
                    imgRect: imgRect,
                    img: pebbleImg,
                })
                Composite.add(world, pebble.body)
                pebbles.push(pebble)
            }


        };

        s.draw = () => {
            s.background(255);
            // s.image(img,0,0)
            s.translate(s.width / 2, s.height / 2);
            s.scale(.8)

            let t = Number(new Date())
            Engine.update(engine, (t - tPrev) * .2)

            world.bodies.forEach((b, i) => {
                let pos = { x: b.position.x, y: b.position.y }
                if (i == 0) console.log(b)
                let dist = (Math.hypot(pos.x, pos.y) + 50) / 512
                dist = Math.min(dist, 1)
                let target = {
                    x: 0,
                    y: 0,
                }
                let force = .000002 * b.mass
                Matter.Body.applyForce(b, pos, {
                    x: - force * (pos.x - target.x),
                    y: - force * (pos.y - target.y),
                })
            })

            tPrev = t
            pebbles.forEach(p => p.draw(s))
        };
    };

    let myp5 = new p5(s);

});


