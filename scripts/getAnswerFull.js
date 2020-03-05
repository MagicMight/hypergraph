let     AllAnswers      = [],
        AllAccums       = [];

const   Answer          = [];
let     agroup          = [];

let     maxAnswersCount = 0,
        resultCount     = 0,
        currMinAnswer   = {qual:0, pos:0},
        currentAnswerSz = 0;

/* Добавление ответа */
const addAnswer = () => {
    let localSum = Answer.reduce( (a,b) => a + qualityConvolution(b.m, 'squaresum')/100<<0, 0);
    resultCount++;

    /* Если лимит решений не исчерпан, то добавляем решение */
    if( currentAnswerSz < maxAnswersCount ) {
        AllAnswers.push( Answer.slice() );
        AllAccums.push(localSum)
        currentAnswerSz++;
    }

    /* Если исчерпан лимит решений, то проверяем качество решений */
    else if( localSum >= currMinAnswer.qual ) {
        AllAnswers[ currMinAnswer.pos ] = Answer.slice();
        AllAccums[ currMinAnswer.pos ] = localSum;

        /* Обновляем значения для наихудшего решения в текущем списке */
        [currMinAnswer.qual, currMinAnswer.pos] = [Infinity, 0];
        AllAccums.forEach( (el, index) => {
            if( el < currMinAnswer.qual ) {
                [currMinAnswer.qual, currMinAnswer.pos] = [el, index];
            }
        });
    }
}

const bfc = (depth, subset) => {
    /* Если это последняя группа */

    if( depth < mainHg.resultSize-1 ) {

        
        /* Для каждого ребра первой группы */
        subset[depth].forEach( edge => {

            let thisSubset = [];
            Answer[depth] = edge;

            /* Для всех последующих подгрупп */
            for(let g=depth+1; g<subset.length; g++) {
                if( subset[g].length === 0 ) break;

                /* Выделяем подгруппы взаимно непересекающихся ребер */
                thisSubset[g] = subset[g].filter( ledge => {
                    return !IsOverlaps(edge, ledge);
                });
            }

            /* Создаем ветвь для образованных подгрупп */
            if( thisSubset[depth+1] ) {
                bfc(depth+1, thisSubset);
            }
        });
    }

    /* Если это последняя группа */
    else if(depth === mainHg.resultSize-1) {
        subset[depth].forEach( edge => {
            Answer[depth] = edge;
            addAnswer();
        });
    }
    



}


const getAnswerFull = (groups, maxAC=10) => {
    resultCount = 0;
    AllAnswers  = [];
    AllAccums   = [];
    maxAnswersCount = maxAC;
    currentAnswerSz = 0;
    currMinAnswer   = {qual:0, pos:0},

    console.time('Время поиска решений');
    Object.assign( agroup, groups );

    bfc(0, agroup);
    console.log('Найдено', resultCount, 'решений.', 'Размер результирующего множества:', AllAnswers.length);
    console.timeEnd('Время поиска решений');
    console.log( 'Решения:', AllAnswers );
    console.log( 'Оценки: ', AllAccums );
    console.log( 'Качество лучшего решения: ', Math.max(...AllAccums) );
}