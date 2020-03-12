function MathSumRenderer(props) {
    const min_tries = 1;
    const max_tries = 3;

    let matrix;
    this.init = () => {
        matrix = props.matrix;
        this.startValue = props.value;
        pickRandomField(this.startValue ? this.startValue : props.value);
    }

    this.init();

    function pickRandomField(notGreaterThan) {
        // code here
    }

    function createFromPlayfieldValues() {
        this.result = pickRandomField(this.startValue ? this.startValue : this.state.sum)
        //        console.log('not solved', JSON.stringify(this.not_solved))
        //        console.log('remaining:', this.props.remainingTiles, 'remaining sum: ', this.result.remaining)
        return this.result;
    }


}

export default MathSumRenderer;