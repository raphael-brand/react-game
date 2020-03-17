function MathSumRenderer(props) {
    const min_tries = 1;
    const max_tries = 3;

    let matrix;
    let startValue;

    this.init = () => {
        matrix = props.matrix;
        return pickRandomField();
    }

    this.init();

    this.update = () => {
        return pickRandomField();
    }

    function pickRandomField() {

        let result = 0;
        let sortedFlatArray = matrix.flat().sort();
        console.log(sortedFlatArray)
        let lastIndex = sortedFlatArray.length-1;

        console.log(sortedFlatArray);

        let randomValues = [];

        for(let i=min_tries; i<max_tries;i++) {
            const randomIndex = Math.floor(lastIndex*Math.random());
            console.log('randomIndex', randomIndex)
            randomValues.push(sortedFlatArray[randomIndex]);
        }
        console.log(randomValues);

        randomValues.forEach((value) => {
            result += value;
        });
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