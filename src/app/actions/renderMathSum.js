function MathSumRenderer(props) {
    const min_tries = 1;
    const max_tries = 4;

    let matrix;
    let remainingCount = 1111;

    this.init = () => {
        matrix = props.matrix;
        if(matrix[matrix.length-1][1] == undefined) {
            remainingCount = matrix.splice(matrix.length-1, 1)[0]
        }
        return pickRandomField();
    }

    this.init();

    this.update = (updatedFlatMap) => {
        if(updatedFlatMap) {
            matrix = updatedFlatMap;
            remainingCount = matrix.splice(matrix.length-1, 1)[0]
        }

        console.log(`remainingCount: ${remainingCount}`)
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

            if(remainingCount <= max_tries) {
                sortedFlatArray.forEach(geek => {
                    if(geek.played === false)
                        randomKeys.push(geek.key)
                });
                break;
            }
            else {
                randomIndex = Math.floor(lastIndex*Math.random());

                if(i > lastIndex)
                    break;

                if(sortedFlatArray[randomIndex].key && sortedFlatArray[randomIndex].played == true && sortedFlatArray[randomIndex].clicked == true)
                    continue;

                randomKeys.push(randomIndex);
                randomKeys = [...new Set(randomKeys)];

            }

        }
        
        console.log('random values', randomKeys);
        
        randomKeys.forEach((key) => {
            if(sortedFlatArray[key].key >= 0) {
                
                result += parseInt(sortedFlatArray[key].value);
            }
            else {
                result += parseInt(sortedFlatArray[key]);
            }
        });

        console.log(`returning ${result}`, result)

        if(result > 0)
            return parseInt(result);
        else {
            alert('You won!')
            return null;
        }
        


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