import { UIElement } from "../UIElement.js";
import { URLS } from "../../constants/constants.js";


const toolsBtn = new UIElement({
    type: 'button',
    id: 'toolsBtn',
    content: 'Tools',
    classNames: ['menu-btn'],
})

const toolsMenuList = new UIElement({
    type: 'ul',
    id: 'toolsMenuList',
    classNames: ['dropdown-content'],
    children: [
        new UIElement({
            type: 'li',
            id: "lutMakerAction",
            classNames: ['menu-item'],
            content: 'LUT maker'
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
            content: 'Save Grid'
        }).render(),
        new UIElement({
            type: 'li',
            id: "exportAction",
            classNames: ['menu-item'],
            content: 'Export PDF'
        }).render(),
        new UIElement({
            type: 'li',
            id: "closeAction",
            classNames: ['menu-item'],
            content: 'Close'
        }).render()
    ],
})


const toolsMenu = new UIElement({
    type: 'div',
    id: 'toolsMenu',
    classNames: ['dropdown'],
    styles: {

    },
    children: [
        toolsBtn.render(),
        toolsMenuList.render()
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
                } else if (target.id === 'exportAction') {
                    console.log('Export button clicked');
                }
            }
        }
    }
})




export { toolsBtn, toolsMenu }