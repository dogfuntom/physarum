import * as d3 from "d3"
import * as Spline from "svg-catmull-rom-spline"

export function pointsToSplinePath(points, closed) {
    points = [...points];

    if(points.length < 2) return ''

    // add some extra points to make spline close nicely.
    // we will remove these segments later
    if (closed)
        points.push(...points.slice(0, 3))

    let bezierCortages = Spline.toPoints(points)
    let splinePath = d3.path()

    if (closed) {
        splinePath.moveTo(points[1][0], points[1][1])
        bezierCortages.shift()
        bezierCortages.pop()
    }
    else {
        splinePath.moveTo(points[0][0], points[0][1])
    }
    
    // last bezier cortage is useless
    bezierCortages.pop()

    bezierCortages.forEach(bezierCortage => {
        splinePath.bezierCurveTo(...bezierCortage)
    })

    return splinePath.toString()
}
