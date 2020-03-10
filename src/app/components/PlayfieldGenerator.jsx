import React, { useState } from 'react';

function PlayfieldGenerator () {
    
//    const [matrixSize, setSize] = useState(5)
//    const [playfieldMatrix, setPlayfieldMatrix] = useState(generate(matrixSize));
    const sum_min = 2;
    const sum_max = 27;

    let setPlayfieldMatrix;
    let matrixSize;
    let playfieldMatrix;

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


    function generate(_matrixSize) {
        matrixSize = _matrixSize;
        playfieldMatrix = [];
        for (let i = 0; i < _matrixSize; i++) {
            playfieldMatrix.push(initPlayfieldColumns());
        }
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

}

export default PlayfieldGenerator;