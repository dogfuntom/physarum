"use strict"

/*

// - самому рендерить на СВГ
- градиенты камушкам рандомные
- гранолой раскидать
- запаковка на хик

- строить пирамидки из них, заблокировать перемещение по оси у
- раскраска прикольная
- разнообразить форму
- СВГ маски для каких-нибудь эффектов.
- СВГ фильтры для зергистой поверхности и псевдообъёма
- разобраться, почему из СВГ можно элемент парсить, а из памяти —  нет.

*/

import "pathseg"
import * as d3 from "d3"
import * as Matter from "matter-js"

import { Pebble } from "./pebble.js"
import { AddGradientsToSvg } from "./addGradientsToSvg.js"
import { color } from "d3"

document.addEventListener("DOMContentLoaded", () => {

    const svg = d3.select('svg')
    svg.attr('viewBox', "-512 -512 1024 1024")
    svg.attr('width', "100%")
    svg.attr('height', "100%")
    let mask = svg.append('mask').attr('id', 'mask')
    let visible = svg.append('g').attr('id', 'visible').attr('mask', 'url(#mask)')
    mask.append('rect')
        .attr('x', '-5120')
        .attr('y', '-5120')
        .attr('width', '10240')
        .attr('height', '10240')
        .attr('fill', 'black')

    visible.append('rect')
        .attr('x', '-5120')
        .attr('y', '-5120')
        .attr('width', '10240')
        .attr('height', '10240')
        .attr('fill', 'black')

    AddGradientsToSvg(svg)
    let pebbles = []

    var Engine = Matter.Engine,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies;

    let engine = Engine.create()
    let world = engine.world
    world.gravity.y = 0.0
    let engine2 = Engine.create()
    let world2 = engine2.world
    world2.gravity.y = 0.0

    console.log(world)
    console.log(world2)


    let getSize = (indexPercent) => {
        // return 200
        return 200 * Math.pow(indexPercent, 1) + 10
    }

    const numberOfPebbles = 10

    for (let i = 0; i < numberOfPebbles; i++) {
        // const points = new Array(3).fill(0).map(() => [500 * Math.random(), 500 * Math.random()])
        let points = []
        for (let j = 0; j < 3; j++) {
            let angle = j * Math.PI * 2 / 3
            let amp = (.5 + 1.5 * Math.random()) * getSize((i + 1) / numberOfPebbles)
            let x = amp * Math.sin(angle)
            let y = amp * Math.cos(angle)
            points.push([x, y])
        }
        let radius = Math.random() * 512
        let angle = Math.random() * 2 * Math.PI
        let colorId = `url(#gradient${Math.floor(Math.random() * 10)})`
        let pebble = new Pebble({
            x: radius * Math.sin(angle),
            y: radius * Math.cos(angle),
            world, points, color: colorId, parent: visible
        })
        let points2 = points.map(p => p.map(x => x * 3))
        console.log('points', points)
        console.log('points2', points2)
        Composite.add(world, pebble.body)
        let pebble2 = new Pebble({
            y: radius * Math.sin(angle) + 1,
            x: radius * Math.cos(angle) - 1,
            world: world2, points: points2, color: `white`, parent: mask
        })
        Composite.add(world2, pebble2.body)

        pebbles.push(pebble)
        pebbles.push(pebble2)
    }
    // document.querySelector('svg').onclick = function() {
    //     console.log('h')
    //     pebbles.forEach( pebble => {
    //         let center = {x: 0, y: 0}
    //         Matter.Body.applyForce(pebble.body, pebble.body.position, {
    //             x: .001 * pebble.body.mass * (pebble.body.position.x - center.x),
    //             y: .001 * pebble.body.mass * (pebble.body.position.y - center.y),
    //         })
    //     })
    // }

    let tPrev
    function frame(_timestamp) {
        svg.selectAll('g.pebble').remove()
        svg.selectAll('circle').remove()
        let t = Number(new Date())

        Engine.update(engine, (t - tPrev) * .2)
        Engine.update(engine2, (t - tPrev) * .2)
        // debugger
        world.bodies.forEach(b => {
            let centre = { x: 256, y: 256 }
            let pos = { x: b.position.x, y: b.position.y }

            let dist = (Math.hypot(pos.x, pos.y) + 50) / 512
            dist = Math.min(dist, 1)
            let angle = Math.atan2(pos.x, pos.y)
            let radius = 512 * Math.floor(dist * 5) / 5
            let target = {
                x: 0,//radius * Math.sin(angle),
                y: 0,//radius * Math.cos(angle)
            }

            let force = .00001 * b.mass
            Matter.Body.applyForce(b, pos, {
                x: - force * (pos.x - target.x),
                y: - force * (pos.y - target.y),
            })
            // b.frictionAir = .05
        })
        world2.bodies.forEach(b => {
            let centre = { x: 256, y: 256 }
            let pos = { x: b.position.x, y: b.position.y }

            let dist = (Math.hypot(pos.x, pos.y) + 50) / 512
            dist = Math.min(dist, 1)
            let angle = Math.atan2(pos.x, pos.y)
            let radius = 512 * Math.floor(dist * 5) / 5
            let target = {
                x: 0,//radius * Math.sin(angle),
                y: 0,//radius * Math.cos(angle)
            }

            let force = .00001 * b.mass
            Matter.Body.applyForce(b, pos, {
                x: - force * (pos.x - target.x),
                y: - force * (pos.y - target.y),
            })
            // b.frictionAir = .05
        })

        tPrev = t
        pebbles.forEach(p => p.draw())
        window.requestAnimationFrame(frame)
    }
    frame()
});

