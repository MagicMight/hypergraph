
/* Сверточная оценочная функция */
const qualityConvolution = ( m, type, isAnswer ) => {
    switch( type )
    {
        case 'sum':
            var result = 0;
            for(var i=0; i<m.length; i++)
                result += m[i];
            return result;
        case 'squaresum':
            var result = 0;
            for(var i=0; i<m.length; i++)
                result += m[i]**2;
            return result;
        case 'squarebalanceOld':
            var n = 100;
            var nq = isAnswer ? mainHg.vMin : 1;

            var a1 = 0,
                a2 = 0;
            for(var i=0; i<m.length; i++)
            {
                a1 += m[i]**2;
                a2 += (n*nq-m[i])**2;
            }
            return a1/a2;
        case 'squarebalanceOld2':
            var n = 100;
            var nq = isAnswer ? mainHg.vMin : 1;

            var a1 = 0,
                a2 = 0;
            for(var i=0; i<m.length; i++)
            {
                a1 += m[i]**2;
                a2 += (n*nq-m[i])**2;
            }
            return a1/(a2 + mainHg.criterion**2/n*a1);
        case 'squarebalanceOld3':
            var n = 100;
            var nq = isAnswer ? mainHg.vMin : 1;

            var a1 = 0,
                a2 = 0,
                a3 = 1;
            for(var i=0; i<m.length; i++)
            {
                a1 += m[i]**2;
                a2 += (n*nq-m[i])**2;
                a3 *= m[i];
            }
            return (a1+a3)/(a1+a2);
        case 'squarebalance':
            var n = 100;
            var cr = mainHg.criterion;
            var nq=1;
            if(isAnswer)
                nq = mainHg.vertex.min();

            var a1 = 0,
                a2 = 1;
            for(var i=0; i<m.length; i++)
            {
                a1 += m[i]**2;
                a2 *= m[i] ? m[i] : 1;
            }
            // return a2 / ((n*nq*cr)**2 - a1);
            return (   a2 / ((n*nq*cr)**2- a1)   );
        case 'log':
            var n = 100;
            var cr = mainHg.criterion;
            var nq=1;
            if(isAnswer)
                nq = mainHg.vertex.min();

            var a1 = 0,
                a2 = 1;
            for(var i=0; i<m.length; i++)
            {
                a1 += m[i]**2;
                a2 *= m[i] ? m[i] : 1;
            }
            // return a2 / ((n*nq*cr)**2 - a1);
            let ans = Math.log(   a2 / ((n*nq*cr)**2- a1) + 1   );
            return ans > 0 ? ans : 1;
        
    }
}