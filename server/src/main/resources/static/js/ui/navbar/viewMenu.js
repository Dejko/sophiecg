import { UIElement } from "../UIElement.js";


const viewBtn = new UIElement({
    type: 'button',
    id: 'viewBtn',
    content: 'View',
    classNames: ['menu-btn'],
})

const viewMenuList = new UIElement({
    type: 'ul',
    id: 'viewMenuList',
    classNames: ['dropdown-content'],
    children: [
        new UIElement({
            type: 'li',
            id: "rowcolAction",
            classNames: ['menu-item'],
            content: 'Swap Ruler'
        }).render(),
        new UIElement({
            type: 'li',
            id: "openAction",
            classNames: ['menu-item'],
            content: 'Open'
        }).render(),
        new UIElement({
            type: 'li',
            id: "saveAction",
            classNames: ['menu-item'],
            content: 'Save'
        }).render(),
        new UIElement({
            type: 'li',
            id: "closeAction",
            classNames: ['menu-item'],
            content: 'Close'
        }).render()
    ],
})


const viewMenu = new UIElement({
    type: 'div',
    id: 'viewMenu',
    classNames: ['dropdown'],
    styles: {

    },
    children: [
        viewBtn.render(),
        viewMenuList.render()
    ],
    events: {
        click: (e) => {
            const target = e.target;
            if (target.classList.contains('menu-item')) {
                //console.log(`Clicked on ${target.id} button`);
                if (target.id === 'rowcolAction') {
                    swapRulers();
                    //console.log('New button clicked');
                } else if (target.id === 'openAction') {
                    console.log('Open button clicked');
                } else if (target.id === 'saveAction') {
                    console.log('Save button clicked');
                } else if (target.id === 'closeAction') {
                    console.log('Close button clicked');
                }
            }
        }
    }
})




export { viewBtn, viewMenu }


function swapRulers() {

    dispatchEvent(new CustomEvent('swap-ruler', {
        bubbles: true,
        composed: true
    }));


    const rulerCanvas = document.getElementById('rulerCanvas');
    const rangeCanvas = document.getElementById('rangeCanvas');

    if (rangeCanvas.style.display === 'block') {
        rangeCanvas.style.display = 'none';
        rulerCanvas.style.display = 'block';
    } else {
        rulerCanvas.style.display = 'none';
        rangeCanvas.style.display = 'block';
    }



}