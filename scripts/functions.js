Array.prototype.min = function() {return Math.min.apply(null, this.filter(function(n) { return !isNaN(n); }))};
Array.prototype.max = function() {return Math.max.apply(null, this)};
Array.prototype.inc = function( num ) { this.forEach( function(elem, index, arr) { arr[index] = num + arr[index]*1 } ); return this; }
Array.prototype.sum = function() { var res=0; for(let i=0; i<this.length;i++) res+=this[i]; return res}



/* true, если ребра пересекаются */
const IsOverlaps = (a, b) => { 
    for(let i=0; i<a.ids.length; i++) {
        if( a.ids[i] === b.ids[i] ) return true;
    }
    return false;
}

const givepart = ( groups, N ) => {
    let result = {};
    let redges = [];
    let res2   = groups.map( 
        group => {
            return group.filter( (edge, index) => {
                if( index < N ) return true;
            });
        }
    );

    

    groups.forEach( group => {
        group.forEach( (edge, index) => {
            if( index < N ) redges.push(edge);
        })
    })

    Object.assign(result, mainHg);
    result.edges = redges;
    // document.write(`
    //     TASKMODEL = []; 
    //     TASKMODEL.push(${JSON.stringify(mainHg)});
    //     TASKMODEL.push(${JSON.stringify(result)});`);
    return res2;
}