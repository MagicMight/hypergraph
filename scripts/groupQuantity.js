const groupQuantity = (G) => {
    let groups = G.map( group => group.map( el => { delete el.s2; return el} ));
    let onDeleteEdge = [];
    for(let g=1; g<groups.length; g++) {

        for(let a=0; a<groups[g-1].length; a++ ) {
            let isThisEdgeWasUpdated = false;
            for(let b=0; b<groups[g].length; b++ ) {
                if( !IsOverlaps( groups[g-1][a], groups[g][b] ) ) {
                    if( g-1 === 0 ) {
                        isThisEdgeWasUpdated = true;
                        groups[g-1][a].s2 = groups[g-1][a].s2 === undefined ? 1 : groups[g-1][a].s2 + 1;
                        groups[g][b].s2 = groups[g][b].s2 === undefined ? 1 : groups[g][b].s2 + 1;
                    }
                    else {
                        if(  groups[g-1][a].s2 === undefined ) {
                            onDeleteEdge.push( groups[g-1][a] );
                            continue;
                        }
                        else {
                            isThisEdgeWasUpdated = true;
                            groups[g-1][a].s2 = groups[g-1][a].s2 += 1;
                            groups[g][b].s2 = groups[g][b].s2 === undefined ? groups[g-1][a].s2 : groups[g][b].s2 + groups[g-1][a].s2;
                        }
                    }
                }
            }
            if( !isThisEdgeWasUpdated ) {
                onDeleteEdge.push( groups[g-1][a] );
                groups[g-1][a].needDelete = true;
            }
        }

    }
    for(let g=0; g<groups.length; g++) {
        groups[g] = groups[g]
            .filter( edge => (edge.s2 && edge.needDelete === undefined) ? true : false )
            .map( edge => { 
                edge.s3 = Math.log(edge.s2) * Math.log(edge.os) * (Math.log(edge.lin)**2); 
                return edge; 
            }); //!!


        // groups[g] = groups[g].map( edge => { edge.s3 = Math.log(edge.s2) * Math.log(edge.os) * (Math.log(edge.lin)**2); return edge }); //!!
        // groups[g] = groups[g].map( edge => { edge.s3 = Math.log(edge.s2) * (edge.os**2) * Math.sqrt(edge.lin); return edge }); //!!
        // groups[g] = groups[g].map( edge => { edge.s3 = edge.s2 * edge.os; return edge });
    }
    grouppedEdges = groups;
    s2Group = groups;
    // console.log(onDeleteEdge);
}

