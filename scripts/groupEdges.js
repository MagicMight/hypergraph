/* Группировка ребер по доли */
const groupEdges = edges => {

    /* Группируем ребра по первой доле */
    let group = new Array( mainHg.vertex[0] ).fill(0).map( el => [] );
    edges.forEach( edge => {
        group[ edge['ids'][0] ].push( edge );
    });

    return group;
}