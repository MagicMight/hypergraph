/* Параметр OS определяет готовность ребра участвовать в построениях */

const intersectionQuality = ( edges ) => {
    console.time('Время оценки пересечений');
    
    /* Очищаем текущее значение параметра */
    edges = edges.map( edge => {edge['os']=0; return edge});

    for(let a=0; a<edges.length; a++) {
        for(let b=a+1; b<edges.length; b++) {

            // Если ребра A и B не пересекаются
            if( !IsOverlaps(edges[a], edges[b]) ) {
                edges[a].os++;
                edges[b].os++;
            }
        }
    }
    console.timeEnd('Время оценки пересечений');
}

