import React, { useState } from 'react';

function PlayfieldGenerator () {
    
//    const [matrixSize, setSize] = useState(5)
//    const [playfieldMatrix, setPlayfieldMatrix] = useState(generate(matrixSize));
    const sum_min = 2;
    const sum_max = 27;

    let setPlayfieldMatrix;
    let matrixSize;
    let playfieldMatrix;
    let flatArray = [];
    let arr = [];

    this.init = function() {
        setSize(5);
        setPlayfieldMatrix = () => playfieldMatrix = generate(matrixSize);
        setPlayfieldMatrix()
        this.restart = this.restart.bind(this);
    }

    function setSize(size) {
        matrixSize = size;
    }

    // https://stackoverflow.com/a/59423114
    function sortByProperty(array,property,order="ASC") {
        return array.sort((a,b) => order === "ASC" ?
          a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0
        : a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0
        );
    }

    function generate(_matrixSize) {
        matrixSize = _matrixSize;
        playfieldMatrix = [];
        // init single dimension array version
        flatArray = [];
        
        for (let i = 0; i < _matrixSize; i++) {
            playfieldMatrix.push(initPlayfieldColumns());
        }



        sortByProperty(flatArray, "value", "DESC");

        return playfieldMatrix;
    }


    function initPlayfieldColumns() {
        arr = [];
        let sum = sum_min;
        let index = 0;
        let val;

        while (sum < sum_max && index < matrixSize) {
            for (let i = 0; arr.length < matrixSize; i++ , index++) {
                val = Math.floor((9 * Math.random()) + 1);
                sum += val;

                if (arr.toString().indexOf(val) > -1) {
                    (sum = sum - val);
                    continue;
                }

                flatArray.push({key: flatArray.length, value: val});
                arr.push(val);
            }
        }

        return arr;
    }

    function newGame() {
        playfieldMatrix = generate(matrixSize)
        return playfieldMatrix;
    }

    this.restart = (size) => {
        if(size) matrixSize = size; 
        return newGame()
    }

    this.simple = () => {
        return flatArray;
    }

    this.getFieldByIndex = (val) => {
        return flatArray.filter(cb => {
            return cb.key === val;
        })
    }
    
    this.simpleByValue = (val) => {
        let result = flatArray.filter(cb => {
            return cb.value === val
        });

        result = sortByProperty(result, 'key', "ASC");
        return result;
    }
}

export default PlayfieldGenerator;