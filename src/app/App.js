import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import MathSumRenderer from './actions/renderMathSum'
import PlayfieldGenerator from './components/PlayfieldGenerator';
import { PlayfieldView } from './components/PlayfieldView'
import DataDisplay from './components/DataDisplay'
import Dialog from './components/Dialog';
import Countdown from './components/Countdown';
import Button from './components/Button';
import actions from './actions/ButtonActions';


export default class App extends Component {

    
    constructor(props) {
        super(props);

        this.initDefaults();
        
        console.log(`this.state.solvedCount: ${this.state.solvedCount}`)
        
        this.onCountdownFinish = this.onCountdownFinish.bind(this);
        this.setSolved = this.setSolved.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.showDialog = this.winnerModal.bind(this);
        this.openMainMenu = this.openMainMenu.bind(this);
        this.gameIsPaused = this.gameIsPaused.bind(this);
        
    }


    initDefaults() {

        this.countRenderUpdates = 0;
        this.solvedCount = 0;
        this.state = {value: 0, displayValue: 0};
        this.generator = new PlayfieldGenerator()
        this.generator.init()

        const playfield = this.generator.restart();
        
        this.remainingTiles = this.generator.simple().filter(this.isNotSolved);
        playfield.push(this.remainingTiles.length);
        this.renderer = new MathSumRenderer({ matrix: playfield, dialog: () => this.winnerModal()});
        let newVal = this.renderer.init();
        this.state = {
            value: newVal,
            playfield: playfield,
            displayValue: newVal,
            solvedCount: this.remainingTiles.length,
            countdown: 60,
            gameOver: false,
            youWon: false,
            msgType: 'startup',
            showMenu: false,
            isPaused: true
        };
    }

    winnerModal() {
        this.setState({msgType: 'you-won', youWon: true, isPaused: true});
        setTimeout(() =>  {
            this.setState({youWon: false});
        }, 3450)
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(document.querySelector('#app'));
        }, 3460)

    }

    openMainMenu() {
        if(this.state.isPaused) {
            this.closeMainMenu();
            return;
        }
        this.setState({msgType: 'main-menu', showMenu: true, isPaused: true});
    }

    closeMainMenu() {
        this.setState({msgType: 'game-over', showMenu: false, isPaused: false});
    }

    gameIsPaused() {
        return this.state.isPaused;
    }

    onCountdownFinish() {
        this.setState({gameOver: true});
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
// console.log('ogg', `val : ${obj.value} key : ${obj.key}`)
                if(this.remainingTiles[i].clicked == true) {
                    this.remainingTiles[i].played = true;
                    //this.remainingTiles[i].clicked = false;
                    document.querySelectorAll('.f.image')[obj.key].classList.add('played');
                    document.querySelectorAll('.f.image')[obj.key].setAttribute('aria-hidden', true);
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

        let { value } = this.state;

        this.solvedCount = this.remainingTiles.filter(this.isNotClicked).length;
        this.setState({solvedCount: this.solvedCount});
        if (value < number && this.remainingTiles[index].clicked == false) return;

        if (this.remainingTiles[index].clicked) {
            this.setState({ value: value + number });
            this.remainingTiles[index].clicked = false;
            obj.setAttribute('aria-pressed', false);
            obj.classList.remove('clicked');
        }
        else
        if (value - number > 0) {
            this.setState({ value: value - number });
            this.remainingTiles[index].clicked = true;
            obj.setAttribute('aria-pressed', true);
            obj.classList.add('clicked');
            
        } else if (value - number === 0 && this.remainingTiles.length > 1) {
            this.setState({ value: value - number });
            obj.setAttribute('aria-pressed', true);
            obj.classList.add('clicked');
            this.remainingTiles[index].clicked = true;
            const clickedList = document.querySelectorAll('.clicked');
            let setSolvedKeys = [];
            clickedList.forEach((element) => {
                const id = element.getAttribute('data-testid')
                setSolvedKeys.push({"key": id, "value": this.generator.getFieldByIndex(id)[0].value });
            })

            setSolvedKeys.forEach(this.setSolved);


            this.newTask();
        }
        else return;
    }

    componentWillUnmount() {
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

    closeDialog() {
        //if(!this.state.gameOver) return
        this.setState({gameOver: false})
        ReactDOM.unmountComponentAtNode(document.querySelector('#app'));
    }

    render() {
        let {playfield, displayValue, countdown, msgType, gameOver, youWon, showMenu } = this.state;

        if(msgType == 'startup')
            return (
                <Dialog message={'Game is starting in'} type={msgType}>
                    <Countdown startValue={3} onComplete={() => this.setState({msgType: 'game-over', gameOver: false, youWon: false, isPaused: false})}></Countdown>
                </Dialog>
            )
        else
            return (
                <Fragment>
                    <DataDisplay
                    displayValue={displayValue}
                    countdown={countdown}
                    onCountdownFinish={this.onCountdownFinish}
                    openMainMenu={this.openMainMenu}
                    gameIsPaused={this.gameIsPaused}>
                    </DataDisplay>
                    <PlayfieldView onClick={this.updateTask} matrix={playfield}>
                    </PlayfieldView>
                    {gameOver && <Dialog onClose={() => this.closeDialog()} message={'Game Over'} type={msgType} />}
                    {youWon && <Dialog autoclose={3000} message={'You won!'} type={msgType} onComplete={this.closeDialog} />}
                    {showMenu && 
                    <Dialog
                        onClose={() => this.closeMainMenu()}
                        message={'1 Minute Math Test'}
                        type={msgType}
                    >
                    <Button ariaLabel="how to play" action={actions.showHowto} btnText="How to play" />
                    <Button ariaLabel="restart game" action={() => this.closeDialog()} btnText="Restart game" />
                    <Button ariaLabel="easy mode" action={actions.mode('easy')} btnText="Easy" />
                    <Button ariaLabel="medium mode" action={actions.mode('medium')} btnText="Medium" />
                    <Button ariaLabel="hard mode" action={actions.mode('hard')} btnText="Hard" />
                    </Dialog>}
                </Fragment>
            );
    }
}
