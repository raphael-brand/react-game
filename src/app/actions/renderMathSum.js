function MathSumRenderer(props) {
    const min_tries = 1;
    const max_tries = 4;

    let matrix;
    let startValue;

    this.init = () => {
        matrix = props.matrix;
        return pickRandomField();
    }

    this.init();

    this.update = (updatedFlatMap) => {
        if(updatedFlatMap)
            matrix = updatedFlatMap;
        return pickRandomField();
    }

    function pickRandomField() {

        let result = 0;
        const flatMap = () => {
            // thanks to Vladimir Efanov
            return matrix.reduce((total, amount) => {
                return total.concat(amount);
            }, []);
        }
        let sortedFlatArray;
        
        if(matrix[0][0])
            sortedFlatArray = flatMap().sort();
        else
            sortedFlatArray = matrix;
        
        // console.log(matrix);
        
        let lastIndex = sortedFlatArray.length-1;

        let randomKeys = [];

        for(let i=min_tries; randomKeys.length<max_tries; i++) {
            const randomIndex = Math.floor(lastIndex*Math.random());

            if(i > max_tries || lastIndex <= i ) {
                // console.log('0')
                randomKeys.push(randomIndex);    
                break;
            }

            if(i < -10 || i > 100) break;

            if(sortedFlatArray[randomIndex].clicked == true || sortedFlatArray[randomIndex].played == true) {
                i -= 1; // console.log('1');
                
                continue;
            }

            if(new RegExp(/(:randomIndex)/g).test(JSON.stringify(randomKeys.values()))) {
                i -= 1; // console.log('2');
                continue
            }
            // console.log('randomIndex', randomIndex)
            randomKeys.push(randomIndex);
        }
        // console.log('random values', randomKeys);
//        randomKeys = randomKeys.filter(geek => geek != undefined);
        randomKeys.forEach((key) => {
            if(sortedFlatArray[key].key)
                result += sortedFlatArray[key].value;
            else
                result += sortedFlatArray[key];
        });
        // console.log(`returning result`, result)
        return parseInt(result);
    }

    function createFromPlayfieldValues() {
        this.result = pickRandomField()
        // console.log('not solved', JSON.stringify(this.not_solved))
        // console.log('remaining:', this.props.remainingTiles, 'remaining sum: ', this.result.remaining)
        return this.result;
    }


}

export default MathSumRenderer;