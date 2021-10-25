import * as Matter from "matter-js"
import { pointsToSplinePath } from "./pointsToSplinePath.js"
import * as d3 from "d3"

const mouse = { x: 0, y: 0 }
document.body.addEventListener('pointermove', function (e) {
    mouse.x = e.pageX
    mouse.y = e.pageY
  })

export class Pebble {
    constructor({ x, y, world, points, color, parent }) {
        console.log(world)
        this.drawScale = 1.
        this.points = points
        this.path = pointsToSplinePath(points, true)
        let pathElement = d3.create('svg:path')
            .attr('d', this.path)

        let vertices = Matter.Svg.pathToVertices(pathElement.node(), 10);
        this.centre = Matter.Vertices.centre(vertices)
        this.body = Matter.Bodies.fromVertices(0, 0, vertices)
        this.body.frictionAir = .1
        this.body.slop = 10.1
        Matter.World.add(world, this.body)
        Matter.Body.translate(this.body, { x, y })
        this.color = color
        this.parent = parent
    }

    draw() {
        var pos = this.body.position
        var angle = this.body.angle

        this.parent.append('g')
        .attr('class', 'pebble')
        .attr('transform', `
        translate(${pos.x} ${pos.y}) scale(${this.drawScale}) rotate(${angle * 180 / Math.PI}) translate(${-this.centre.x} ${-this.centre.y})`)
            .append('path')
            // .attr('fill', `url(#gradient${this.colorId})`)
            .attr('fill', this.color)
            .attr('d', this.path)
    }
}