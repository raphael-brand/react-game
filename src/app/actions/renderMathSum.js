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

    function pickRandomField(notGreaterThan) {

        let result = 0;
        matrix.forEach((value) => {
            let row = value;
            row.forEach(item => {
                result = item;
            });
        });
        return result;
    }

    function createFromPlayfieldValues() {
        this.result = pickRandomField()
        //        console.log('not solved', JSON.stringify(this.not_solved))
        //        console.log('remaining:', this.props.remainingTiles, 'remaining sum: ', this.result.remaining)
        return this.result;
    }


}

export default MathSumRenderer;