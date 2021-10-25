// <defs>
//     <radialGradient id="g1"
//         cx="0.5" cy="0.5" r="0.5" fx="0.25" fy="0.25">
//         <stop offset="0%" stop-color="red" />
//         <stop offset="100%" stop-color="blue" />
//     </radialGradient>
// </defs>

import * as d3 from "d3"

export function AddGradientsToSvg(svg) {
    let defs = svg.append('defs')
    // let colors = [
    //     '#F8B195',
    //     '#F67280',
    //     '#C06C84',
    //     '#6C5B7B',
    //     '#355C7D',
    // ]

    let colors = [
        '#FFF',
        '#666',
        '#444',
        '#222',
    ]    
    for (let i = 0; i < 10; i++) {
        let colorIndex = Math.floor(Math.random()*colors.length)
        let col1 = colors[colorIndex]
        let col2 = '#000'

        let grad = defs.append('radialGradient')
            .attr('id', `gradient${i}`)
            .attr('cx', `0.5`)
            .attr('cy', `0.5`)
            .attr('r', `0.5`)
            .attr('fx', `0.25`)
            .attr('fy', `0.25`)
        grad.append('stop')
            .attr('offset', `0%`)
            .attr('stop-color', col1)
        grad.append('stop')
            .attr('offset', `100%`)
            .attr('stop-color', col2)
    }
    // .attr('transform', `
    // translate(${pos.x} ${pos.y}) rotate(${angle * 180 / Math.PI}) translate(${-this.centre.x} ${-this.centre.y})`)
    // .append('path')
    // .attr('stroke-width', '2')
    // .attr('fill', 'url(#g1)')
    // .attr('d', this.path)
}