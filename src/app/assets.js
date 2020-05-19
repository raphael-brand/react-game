const baseFilter = 'invert(100%) sepia(100%) ';
const colors = {
    blue: 'saturate(400%) brightness(110%) hue-rotate(162deg)',
    brown: 'saturate(90%) brightness(80%) contrast(200%) hue-rotate(338deg)',
    green: 'saturate(200%) brightness(120%) contrast(100%) hue-rotate(70deg)',
    orange: 'saturate(400%) brightness(120%) hue-rotate(352deg)',
}
const numberColors = ['blue', 'brown', 'green', 'orange', 'blue', 'orange', 'green', 'brown', 'blue']

let loadImage;

const gearSymbol = () => {
    const container = document.querySelector('#setup')
    console.log(container)
    loadImage = new Image(47,47);
    loadImage.addEventListener('click', () => {
        document.querySelector('#setup').classList.add('animate-in')
        console.log('DOMContentLoaded')
    })
    loadImage.src = 'gear_2699.png';
    setTimeout(() => {
        document.querySelector('#setup').appendChild(loadImage);
        loadImage.click()
        }, 0)
}


module.exports = {style: {baseFilter, colors, numberColors}, gearSymbol};
