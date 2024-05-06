// Open and close on click onModalOpen and onModalClose
// Close on click in backdrop: onBackDropClick
// Close on ESC: onEscapeKeypress

// CSS has class "show-modal", it needs to be add on body while modal opening  

const refs = {
    openModalBtn: document.querySelector('[data-action="open-modal"]'),
    closeModalBtn: document.querySelector('[data-action="close-modal"]'),
    backdrop: document.querySelector('.js-backdrop'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function onOpenModal() {
    window.addEventListener('keydown', onEscapeKeypress);
    document.body.classList.add('show-modal');
}

function onCloseModal() {
    window.removeEventListener('keydown', onEscapeKeypress);
    document.body.classList.remove('show-modal');
}

function onBackdropClick(event) {
    // console.log(event.currentTarget);
    // console.log(event.target);
    if (event.currentTarget === event.target) {
        onCloseModal();
    }
}

function onEscapeKeypress(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    }
}