import { image } from "d3-fetch"
import * as Matter from "matter-js"

const mouse = { x: 0, y: 0 }
document.body.addEventListener('pointermove', function (e) {
    mouse.x = e.pageX
    mouse.y = e.pageY
})

export class Pebble {
    constructor({ x, y, world, points, centroid, imgRect, img }) {
        this.drawScale = 1.
        this.points = points.map(p => ({ x: p[0], y: p[1] }))
        this.imgRect = imgRect
        this.centroid = centroid
        this.img = img
        // this.centre = Matter.Vertices.centre(this.points)
        // this.body = Matter.Bodies.fromVertices(this.centre.x, this.centre.y, this.points, {
        this.body = Matter.Bodies.fromVertices(0, 0, this.points, {
            // position: {x: x, y: y},
        })
        this.body.frictionAir = .002
        this.body.slop = .1
        this.body.restitution = .0
        // this.body.torque = .1
        this.body.mass = this.body.area
        Matter.World.add(world, this.body)
        // Matter.Body.translate(this.body, { x: 200, y: 0 })
        Matter.Body.translate(this.body, { x, y })
    }

    draw(s) {
        var pos = this.body.position
        var angle = this.body.angle
        // translate(${pos.x} ${pos.y}) scale(${this.drawScale}) rotate(${angle * 180 / Math.PI}) translate(${-this.centre.x} ${-this.centre.y})`)
        s.push()
        // s.translate(this.imgRect.width / 2, this.imgRect.height / 2)
        s.translate(pos.x, pos.y)
        // s.translate(this.imgRect.x+this.imgRect.width/2, this.imgRect.y+this.imgRect.height/2)
        s.rotate(this.body.angle)
        // s.translate(-this.imgRect.width / 2, -this.imgRect.height / 2)
        s.translate(-(this.centroid[0] - this.imgRect.x), -(this.centroid[1] - this.imgRect.y))
        s.image(this.img,
            0, 0)//, this.imgRect.width, this.imgRect.height),
        // this.imgRect.x, this.imgRect.y, this.imgRect.width, this.imgRect.height)
        s.pop()
        
        // s.circle(pos.x, pos.y, 10)

        // this.body.parts.slice(1).forEach(p => {
        //     s.beginShape()
        //     p.vertices.forEach(v => {
        //         s.vertex(v.x, v.y)
        //     })
        //     s.endShape(s.CLOSE)
        // })
    }
}