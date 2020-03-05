/* Удаление ребер, не участвующих в построении решений */
const deleteHardOverlapseEdges = edges => {
    console.log('mainHg.edges.length', edges.length);
    intersectionQuality( edges );

    /* Фиксируем исходное количество ребер */
    let lastEdgesLength = edges.length;
    edges = edges.filter( edge => edge.os < mainHg['resultSize']-1 ? false : true  );

    /* Повторяем переоценку и удаление ребер, пока не выделим минимальную модель */
    while( lastEdgesLength !== edges.length ) {
        lastEdgesLength = edges.length;
        intersectionQuality( edges );
        edges = edges.filter( edge => edge.os < mainHg['resultSize']-1 ? false : true  );
    }
    mainHg.edges = edges;
    console.log('mainHg.edges.length', edges.length);
}