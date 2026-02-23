import { UIElement } from "../UIElement.js";


const addBtn = new UIElement({
    type: 'button',
    id: 'addBtn',
    content: 'Add',
    classNames: ['menu-btn'],
})

const addMenuList = new UIElement({
    type: 'ul',
    id: 'addMenuList',
    classNames: ['dropdown-content'],
    children: [
        new UIElement({
            type: 'li',
            id: "newAction",
            classNames: ['menu-item'],
            content: 'New'
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


const addMenu = new UIElement({
    type: 'div',
    id: 'addMenu',
    classNames: ['dropdown'],
    styles: {

    },
    children: [
        addBtn.render(),
        addMenuList.render()
    ],
    events: {
        click: (e) => {
            const target = e.target;
            if (target.classList.contains('menu-item')) {
                //console.log(`Clicked on ${target.id} button`);
                if (target.id === 'newAction') {

                    console.log('New button clicked');
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




export { addBtn, addMenu }