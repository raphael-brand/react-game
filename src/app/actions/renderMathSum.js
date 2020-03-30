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
        
        console.log(matrix);
        
        let lastIndex = sortedFlatArray.length-1;

        let randomKeys = [];
        let randomIndex;
        for(let i=min_tries; randomKeys.length<max_tries; i++) {

            const randomIndex = Math.floor(lastIndex*Math.random());

            randomKeys.push(randomIndex);
            randomKeys = [...new Set(randomKeys)];

        }
        
        console.log('random values', randomKeys);
        
        randomKeys.forEach((key) => {
            if(sortedFlatArray[key].key)
                result += sortedFlatArray[key].value;
            else
                result += sortedFlatArray[key];
        });
        console.log(`returning ${result}`)
        return parseInt(result);
    }

    function createFromPlayfieldValues() {
        this.result = pickRandomField()
        //        console.log('not solved', JSON.stringify(this.not_solved))
        //        console.log('remaining:', this.props.remainingTiles, 'remaining sum: ', this.result.remaining)
        return this.result;
    }


}

export default MathSumRenderer;