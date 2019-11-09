const textElement = document.getElementById('text');
const optionButtonElement = document.getElementById('options-buttons');

let state = {};

function startGame(){
    state = {}
    showTextNode(2)
}
function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while(optionButtonElement.firstChild){
        optionButtonElement.removeChild(optionButtonElement.firstChild)
    }

    textNode.options.forEach(option => {
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonElement.appendChild(button)
        }
    });

}
function showOption(option){
   option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
   const nextTextNodeId = option.nextText
   if(nextTextNodeId <= 0){
       return startGame()
   }
   state = Object.assign(state, option.setState)
   showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text : 'You wake up in a strange place and you see a jar of blue near you.',
        options : [
            {
                text : 'Take goo',
                setState: { blueGoo: true },
                nextText : 2
            },
        ]
    },
    {
        id : 2,
        text : 'You venture forth in search of answer to where you are when you come across a marchant',
        options : [
            {
                text : 'Trade the goo for a sword',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, sword: true },
                nextText: 3
            },
            {
                text : 'Trade the goo for a shiled',
                requiredState: (currentState) => currentState.blueGoo,
                setState: { blueGoo: false, shiled: true },
                nextText: 3
            },
            {
                text : 'Ignore the marchat',
                nextText: 3
            },
        ]
    }
]

startGame();