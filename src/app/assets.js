const baseFilter = 'invert(100%) sepia(100%) ';
const colors = {
    blue: 'saturate(400%) brightness(110%) hue-rotate(162deg)',
    brown: 'saturate(90%) brightness(80%) contrast(200%) hue-rotate(338deg)',
    green: 'saturate(200%) brightness(120%) contrast(100%) hue-rotate(70deg)',
    orange: 'saturate(400%) brightness(120%) hue-rotate(352deg)',
}
const numberColors = ['blue', 'brown', 'green', 'orange', 'blue', 'orange', 'green', 'brown', 'blue']

let loadImage;
let HandlerFunction;
const addGearSymbol = e => {
    e.preventDefault()
    document.querySelector('#setup').classList.add('animate-in')
    e.target.removeEventListener('load', addGearSymbol);
    document.querySelector('#setup div').addEventListener('click', HandlerFunction);
}
const gearSymbol = (onActiveHandler) => {
    if(document.querySelector('#setup img')) return
    const container = document.querySelector('#setup')
    console.log(container)
    loadImage = new Image(47,47);

    loadImage.addEventListener('load', addGearSymbol);
    HandlerFunction = onActiveHandler;
    
    loadImage.src = 'gear_2699.png';
    setTimeout(() => {
        document.querySelector('#setup').appendChild(loadImage);
        document.querySelector('#setup').appendChild(document.createElement('div'))
        }, 0)
}


module.exports = {style: {baseFilter, colors, numberColors}, gearSymbol: gearSymbol};
