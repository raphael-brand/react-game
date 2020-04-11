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
            sortedFlatArray = flatMap()
        else
            sortedFlatArray = matrix;
        
// console.log(matrix);
        
        let lastIndex = sortedFlatArray.length-1;

        let randomKeys = [];
        let randomIndex;
        for(let i=min_tries; randomKeys.length<max_tries; i++) {

            const randomIndex = Math.floor(lastIndex*Math.random());

            randomKeys.push(randomIndex);
            randomKeys = [...new Set(randomKeys)];

        }
        
        // console.log('random values', randomKeys);
        
        randomKeys.forEach((key) => {
            let num = 0;
            if(sortedFlatArray[key].key >= 0) {
                
                num = parseInt(sortedFlatArray[key].value);
            }
            else {
                num = parseInt(sortedFlatArray[key]);
            }


            if(result + num > 29)
                return;
            else
                result += num;
        });

        console.log(`returning ${result}`, result)
        if(result > 0)
            return parseInt(result);
        else {
            alert('You won!')
            this.props.restart();
            return null;
        }
    }
    /* calculates the threshold in relation of matrix size and remaining count 
    of a floored value of approx. 17 percent
     */
    function isLastTask() {
        if(matrix[1][1] != undefined) return false;
        let rest = Math.floor((matrix.length/100) * 17);
        console.log(`Is it the last task? Calculated rest amount (${rest}) greater than or equals ${remainingCount}`)
        console.log(remainingCount <= rest && remainingCount < 29 ? 'yes': 'no');
        return remainingCount <= rest && remainingCount < 29;
    }

    function createFromPlayfieldValues() {
        this.result = pickRandomField()
// console.log('not solved', JSON.stringify(this.not_solved))
// console.log('remaining:', this.props.remainingTiles, 'remaining sum: ', this.result.remaining)
        return this.result;
    }


}

export default MathSumRenderer;