import { UIElement } from "../UIElement.js";
import { openModal } from "../modal/modal.js";

const helpBtn = new UIElement({
    type: 'button',
    id: 'helpBtn',
    content: 'Help',
    classNames: ['menu-btn'],
})

const helpMenuList = new UIElement({
    type: 'ul',
    id: 'helpMenuList',
    classNames: ['dropdown-content'],
    children: [
        new UIElement({
            type: 'li',
            id: "helpAction",
            classNames: ['menu-item'],
            content: 'Help'
        }).render(),
        new UIElement({
            type: 'li',
            id: "aboutAction",
            classNames: ['menu-item'],
            content: 'About'
        }).render(),

    ],
})


const helpMenu = new UIElement({
    type: 'div',
    id: 'helpMenu',
    classNames: ['dropdown'],
    styles: {

    },
    children: [
        helpBtn.render(),
        helpMenuList.render()
    ],
    events: {
        click: (e) => {
            const target = e.target;
            if (target.classList.contains('menu-item')) {
                //console.log(`Clicked on ${target.id} button`);
                if (target.id === 'helpAction') {
                    openModal("Sophie Color Grid",
                        "Author: Dejan Fujs",
                        'en2en.net',
                        { width: '40%', height: '200px' },
                        { top: '10%', left: '20%' });
                    console.log('Help button clicked');
                } else if (target.id === 'aboutAction') {
                    console.log('About button clicked');
                }
            }
        }
    }
})




export { helpBtn, helpMenu }