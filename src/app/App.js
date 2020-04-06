import React, { Component } from 'react';
import MathSumRenderer from './actions/renderMathSum'
import PlayfieldGenerator from './components/PlayfieldGenerator';
import { PlayfieldView } from './components/PlayfieldView'
import { Sumfield } from './components/Sumfield'


export default class App extends Component {

    
    constructor(props) {
        super(props);
        this.countRenderUpdates = 0;
        this.state = {value: 0};
        this.generator = new PlayfieldGenerator()
        this.generator.init()

        const playfield = this.generator.restart();
        
        this.remainingTiles = this.generator.simple().filter(this.isNotSolved);
        playfield.push(this.remainingTiles.length);
        this.renderer = new MathSumRenderer({ matrix: playfield});
        
        this.state = {
            value: this.renderer.init(),
            playfield: playfield,
            solvedCount: this.remainingTiles.length
        };

        console.log(`this.state.solvedCount: ${this.state.solvedCount}`)
        
        this.setSolved = this.setSolved.bind(this);
        this.updateTask = this.updateTask.bind(this);
    }

    isNotSolved(field) {
        return field.clicked !== true;
    }

    setSolved(obj) {
        let notSolved = 0;
        this.remainingTiles.forEach((v,i,a) => {
            if(v.key == obj.key && v.value == obj.value) {
// console.log('ogg', `key : ${v.key} value : ${obj.value}`)
// console.log('ogg', `val : ${obj.value} key : ${obj.key}`)
                if(this.remainingTiles[i].clicked == true) {
                    this.remainingTiles[i].played = true;
                    this.remainingTiles[i].clicked = false;
                    document.querySelectorAll('.f.image')[obj.key].classList.add('played');
                }
            }
            else notSolved++;
        });

        this.setState({solvedCount: this.state.solvedCount - notSolved})
        console.log(`notSolved var count after update: ${this.state.solvedCount}`)
    }

    newTask() {
        this.remainingTiles.push(this.state.solvedCount);
        this.setState({value: this.renderer.update(this.remainingTiles)});
    }

    updateTask(number, index, obj) {

        // console.log('key:', index, 'number:', number)
        // console.log('played %s, clicked %s', this.remainingTiles[index].played, this.remainingTiles[index].clicked)
        // console.log(this.remainingTiles)

        this.setState({solvedCount: this.generator.simple().filter(this.isNotSolved).length});
        
        console.log('key:', index, 'number:', number)
        console.log('played %s, clicked %s', this.remainingTiles[index].played, this.remainingTiles[index].clicked)
        console.log(this.remainingTiles)
        // if (this.remainingTiles[index].played) return;
        if (this.state.value < number && this.remainingTiles[index].clicked == false) return;

        if (this.remainingTiles[index].clicked) {
            this.setState({ value: this.state.value + number });
            this.remainingTiles[index].clicked = false;
             obj.classList.remove('clicked');
        }
        else
        if (this.state.value - number > 0) {
            this.setState({ value: this.state.value - number });
            this.remainingTiles[index].clicked = true;
             obj.classList.add('clicked');
            
        } else if (this.state.value - number === 0 && this.remainingTiles.length > 1) {
            this.setState({ value: this.state.value - number });
            
             obj.classList.add('clicked');
            this.remainingTiles[index].clicked = true;
            const clickedList = document.querySelectorAll('.clicked');
            let setSolvedKeys = [];
            clickedList.forEach((element) => {
                const id = element.getAttribute('data-testid')
                setSolvedKeys.push({"key": id, "value": this.generator.getFieldByIndex(id)[0].value });
                element.classList.add('played')  
            })


            setSolvedKeys.forEach(this.setSolved);


            this.newTask();
        }
        else return;
    }

    componentDidMount() {
// console.log('... it worked so far. Sneaking onto the stage now.')
    }

    componentDidUpdate() {
        this.countRenderUpdates++;
        // console.log(`DOM updated (${this.countRenderUpdates} times)`)
    }

    componentDidUpdate() {
        this.countRenderUpdates++;
        // console.log(`DOM updated (${this.countRenderUpdates} times)`)
    }

    render() {

        return (
            <div>
                <PlayfieldView onClick={this.updateTask} matrix={this.state.playfield}>
                    <Sumfield value={this.state.value}></Sumfield>
                </PlayfieldView>
            </div>
        );
    }
}