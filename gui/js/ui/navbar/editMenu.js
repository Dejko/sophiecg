import { UIElement } from "../UIElement.js";


const editBtn = new UIElement({
    type: 'button',
    id: 'editBtn',
    content: 'Edit',
    classNames: ['menu-btn'],
})


const editMenuList = new UIElement({
    type: 'ul',
    id: 'editMenuList',
    classNames: ['dropdown-content'],
    children: [
        new UIElement({
            type: 'li',
            id: "undoAction",
            classNames: ['menu-item'],
            content: 'Undo'
        }).render(),
        new UIElement({
            type: 'li',
            id: "copyAction",
            classNames: ['menu-item'],
            content: 'Copy'
        }).render(),
        new UIElement({
            type: 'li',
            id: "pasteAction",
            classNames: ['menu-item'],
            content: 'Paste'
        }).render(),
        new UIElement({
            type: 'li',
            id: "preferencesAction",
            classNames: ['menu-item'],
            content: 'Preferences'
        }).render()
    ],
})


const editMenu = new UIElement({
    type: 'div',
    id: 'editMenu',
    classNames: ['dropdown'],
    styles: {

    },
    children: [
        editBtn.render(),
        editMenuList.render()
    ],
    events: {
        click: (e) => {
            const target = e.target;
            if (target.classList.contains('menu-item')) {
                //console.log(`Clicked on ${target.id} button`);
                if (target.id === 'undoAction') {
                    console.log('Undo button clicked');
                } else if (target.id === 'copyAction') {
                    console.log('Copy button clicked');
                } else if (target.id === 'pasteAction') {
                    console.log('Paste button clicked');
                } else if (target.id === 'preferencesAction') {
                    console.log('Preferences button clicked');
                }
            }
        }
    }
})


export { editMenu }