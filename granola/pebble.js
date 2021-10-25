import * as Matter from "matter-js"
import { pointsToSplinePath } from "./pointsToSplinePath.js"
import * as d3 from "d3"

const mouse = { x: 0, y: 0 }
document.body.addEventListener('pointermove', function (e) {
    mouse.x = e.pageX
    mouse.y = e.pageY
})

export class Pebble {
    constructor({ x, y, world, points, parent }) {
        this.drawScale = 1.
        this.points = points.map(p => ({ x: p[0], y: p[1] }))
        // this.centre = Matter.Vertices.centre(this.points)
        // this.body = Matter.Bodies.fromVertices(this.centre.x, this.centre.y, this.points, {
        this.body = Matter.Bodies.fromVertices(0, 0, this.points, {
            // position: {x: x, y: y},
        })
        // this.body.frictionAir = .1
        // this.body.slop = -1.1
        this.body.restitution = .5
        this.body.mass = this.body.area
        this.body.slop = 0
        Matter.World.add(world, this.body)
        Matter.Body.translate(this.body, { x, y })
    }

    draw(sketch) {
        var pos = this.body.position
        sketch.circle(pos.x, pos.y, 10)
        var angle = this.body.angle
        // translate(${pos.x} ${pos.y}) scale(${this.drawScale}) rotate(${angle * 180 / Math.PI}) translate(${-this.centre.x} ${-this.centre.y})`)
        // .append('path')
        this.body.parts.slice(1).forEach(p => {
            sketch.beginShape()
            p.vertices.forEach(v => {
                sketch.vertex(v.x, v.y)
            })
            sketch.endShape(sketch.CLOSE)
        })
    }
}