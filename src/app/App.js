import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import MathSumRenderer from './actions/renderMathSum'
import PlayfieldGenerator from './components/PlayfieldGenerator';
import { PlayfieldView } from './components/PlayfieldView'
import { DataDisplay } from './components/DataDisplay'

export default class App extends Component {

    
    constructor(props) {
        super(props);

        this.initDefaults();
        
        console.log(`this.state.solvedCount: ${this.state.solvedCount}`)
        
        this.countdown();

        this.setSolved = this.setSolved.bind(this);
        this.updateTask = this.updateTask.bind(this);
        
    }


    initDefaults() {

        if(this.timeout > 0) {
            clearTimeout(this.timeout);
        }

        this.timeout = 0;
        this.countRenderUpdates = 0;
        this.solvedCount = 0;
        this.state = {value: 0, displayValue: 0};
        this.generator = new PlayfieldGenerator()
        this.generator.init()

        const playfield = this.generator.restart();
        
        this.remainingTiles = this.generator.simple().filter(this.isNotSolved);
        playfield.push(this.remainingTiles.length);
        this.renderer = new MathSumRenderer({ matrix: playfield, restart: this.initDefaults});
        let newVal = this.renderer.init();
        this.state = {
            value: newVal,
            playfield: playfield,
            displayValue: newVal,
            solvedCount: this.remainingTiles.length,
            countdown: 60
        };
    }

    countdown() {

        this.timeout = setTimeout(() => {
            if (this.state.countdown > 1) {
                this.setState({ countdown: this.state.countdown - 1});
                console.log('counting ...')
                this.countdown();
            }
            else {
                alert('Game over')
                ReactDOM.unmountComponentAtNode(document.querySelector('#app'));
            }
        }
            , 1000);
    }

    isNotSolved(field) {
        return field.played !== true;
    }

    isNotClicked(field) {
        return field.clicked !== true;
    }

    setSolved(obj) {
        let notSolved = 0;
        this.remainingTiles.forEach((v,i,a) => {
            if(v.key == obj.key && v.value == obj.value) {
                // console.log('ogg', `key : ${v.key} value : ${obj.value}`)
                //console.log('ogg', `val : ${obj.value} key : ${obj.key}`)
                if(this.remainingTiles[i].clicked == true) {
                    this.remainingTiles[i].played = true;
                    //this.remainingTiles[i].clicked = false;
                    document.querySelectorAll('.f.image')[obj.key].classList.add('played');
                }
            }
            else notSolved++;
        });
        if(notSolved > this.state.solvedCount) {
            this.setState({solvedCount: this.state.solvedCount - notSolved})
        }

        console.log(`notSolved var count after update: ${this.state.solvedCount}`)
    }

    newTask() {
        if(this.remainingTiles.length > 0) {
            this.remainingTiles.push(this.state.solvedCount);
            let newValue = this.renderer.update(this.remainingTiles);
            this.setState({value: newValue, displayValue: newValue});
        }
        
    }

    updateTask(number, index, obj) {

        // console.log('key:', index, 'number:', number)
        // console.log('played %s, clicked %s', this.remainingTiles[index].played, this.remainingTiles[index].clicked)
        // console.log(this.remainingTiles)
        this.solvedCount = this.remainingTiles.filter(this.isNotClicked).length;
        this.setState({solvedCount: this.solvedCount});
        console.log(`solvedCount: ${this.state.solvedCount}`);
        console.log('key:', index, 'number:', number)
        console.log('played %s, clicked %s', this.remainingTiles[index].played, this.remainingTiles[index].clicked)
        console.log(this.remainingTiles)
        // if (this.remainingTiles[index].played) return;
        if (this.state.value < number && this.remainingTiles[index].clicked == false) return;

        /* console.log(
            'remainingTiles amount: ', this.generator.simple().filter(this.isNotSolved).length,
            'sum: ', this.state.value
        )*/

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

            //this.generator.getFieldByIndex(id)
            setSolvedKeys.forEach(this.setSolved);


            this.newTask();
        }
        else return;
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        this.timeout = 0;
        setTimeout(() => {
            ReactDOM.render(
                <App />,
                document.querySelector('#app')
            )
        }, 0);

    }
    componentDidMount() {
        // console.log('... it worked so far. Sneaking onto the stage now.')
    }

    componentDidUpdate() {
        this.countRenderUpdates++;
        console.log(`DOM updated (${this.countRenderUpdates} times)`)
        console.log(this.solvedCount);

        if(this.solvedCount <= 1 && this.state.value == 0) {
            document.querySelectorAll('.f.image').forEach((v,i,o) => {
                o[i].classList.remove('played');
            });

            this.initDefaults();
        }
    }

    render() {
        let {playfield, displayValue, countdown} = this.state;

        return (
            <Fragment>
                <PlayfieldView onClick={this.updateTask} matrix={playfield}>
                </PlayfieldView>
                <DataDisplay displayValue={displayValue} countdown={countdown}>
                </DataDisplay>
                <i id="message"></i>
            </Fragment>
        );
    }
}