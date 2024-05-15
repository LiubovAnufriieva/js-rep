import 'modern-normalize';
//Event types: keypress, keydown, keyup
// The limits of keypress
// Properties of KeyboardEvent.key and KeyboardEvent.code

const refs = {
    output: document.querySelector('.js-output'),
    clearBtn: document.querySelector('.js-clear'),
};

window.addEventListener('keypress', onKeypress);
refs.clearBtn.addEventListener('click', onClearOutput);

function onKeypress(event) {
    
    // console.log('event.key:', event.key);
    // console.log('event.code:', event.code);
    refs.output.textContent += event.key;
}
 
function onClearOutput() {
    refs.output.textContent = '';
}