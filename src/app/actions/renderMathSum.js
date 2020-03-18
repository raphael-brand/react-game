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
        console.log(matrix);
        //const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

        const flatMap = () => {
            return matrix.reduce((total, amount) => {
                return total.concat(amount);
            }, []);
        }

        let sortedFlatArray = flatMap().sort();
        let lastIndex = sortedFlatArray.length-1;

        let randomValues = [];

        for(let i=min_tries; i<max_tries;i++) {
            const randomIndex = Math.floor(lastIndex*Math.random());
            console.log('randomIndex', randomIndex)
            randomValues.push(sortedFlatArray[randomIndex]);
        }

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