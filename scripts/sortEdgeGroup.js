const sortEdgeGroup = (type) => {
    let G = grouppedEdges.map( group => group.map( el => el));
    switch(type) {
        case 'linear':
            linearGroup = G.map( group => { group.sort((a, b) => { return a.lin === b.lin ? 0 : a.lin > b.lin ? -1 : 1 }); return group });
            break;
        case 'overlapse':
            overlapseGroup = G.map( group => { return group.sort((a, b) => { return a.os === b.os ? 0 : a.os > b.os ? -1 : 1 }); return group  });
            break;
        case 'special':
            specialGroup = G.map( group => { return group.sort((a, b) => { return a.special === b.special ? 0 : a.special > b.special ? -1 : 1 }); return group  });
            break;
        case 's2':
            s2Group = s2Group.map( group => { return group.sort((a, b) => { return a.s2 === b.s2 ? 0 : a.s2 > b.s2 ? -1 : 1 }); return group  });
            break;
        case 's3':
            s2Group = s2Group.map( group => { return group.sort((a, b) => { return a.s3 === b.s3 ? 0 : a.s3 > b.s3 ? -1 : 1 }); return group  });
            break;
    }
}