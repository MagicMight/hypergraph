

let mainHg          = {};       // Исходная модель
let grouppedEdges, 
    linearGroup, 
    OverlapsGroup, 
    specialGroup, 
    s2Group;


const _init = ( hypergraph ) => {
    console.time('Общее время оценивания');
    mainHg = hypergraph;
    mainHg['resultSize'] = Math.min(...mainHg.vertex);

    /* Сверточная оценка каждого ребра (добавляется значение LIN) */
    mainHg.edges = mainHg.edges.map( edge => {
        edge['idsj'] = edge['ids'].join('-');
        // edge['lin'] = qualityConvolution( edge.m, 'log', false );
        edge['lin'] = qualityConvolution( edge.m, 'squaresum', false );
        // edge['lin'] = qualityConvolution( edge.m, 'squarebalance', false );
        return edge;
    });

    /* Оцениваем возможность создавать решения и удаляем ребра, не способные к построению максимальных сочетаний */
    deleteHardOverlapseEdges( mainHg.edges );

    grouppedEdges       = groupEdges( mainHg.edges );
    groupQuantity( grouppedEdges );

    sortEdgeGroup( 'Overlaps' );
    sortEdgeGroup( 'linear' );    
    sortEdgeGroup( 'special' );
    sortEdgeGroup( 's2' );
    sortEdgeGroup( 's3' );

    console.timeEnd('Общее время оценивания');
    console.log( 'Сгруппированные ребра', grouppedEdges );

    getAnswerFull(givepart(s2Group, 20), 10);
    // getAnswerFull( s2Group, 10);
}


/* Инициализация кода */
window.onload = () => {_init( TASK[0] )};