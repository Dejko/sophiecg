import { UIElement } from "../UIElement.js"
import { gridTab } from "./gridTab/gridTab.js";
import { rangesTab } from "./rangesTab.js";



const gridBtn = new UIElement({
    type: 'button',
    id: 'gridBtn',
    content: 'GRID',
    classNames: ['sidebarItem', 'activeBtn'],

    events: {
        click: () => showTab('gridTab')
    }
})

const rangesBtn = new UIElement({
    type: 'button',
    id: 'rangesBtn',
    content: 'RANGES',
    classNames: ['sidebarItem'],
    styles: { zIndex: '1' },
    events: {
        click: () => showTab('rangesTab')
    }
})

const settingsBtn = new UIElement({
    type: 'button',
    id: 'settingsBtn',
    content: 'SETTINGS',
    classNames: ['sidebarItem'],
    styles: { zIndex: '1' },
    events: {
        click: () => showTab('settingsTab')
    }
})


const sidebarMenu = new UIElement({
    type: 'div',
    id: 'sidebarMenu',
    styles: {
        width: '250px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'left',
        backgroundColor: '#111111'
    },
    children: [
        gridBtn.render(),
        rangesBtn.render(),
        settingsBtn.render(),

    ],
    events: {

    }
});

const sidebar = new UIElement({
    type: 'div',
    id: 'sidebar',
    styles: { width: '250px', height: '100%', top: '38px', right: '0', backgroundColor: 'rgb(11, 11, 11)', position: 'fixed', zIndex: '1' },
    classNames: ['sidebar'],
    children: [sidebarMenu.render(),
    gridTab.render(),
    rangesTab.render(),
        // settingsTab.render()

    ]

})

export { sidebar }








function showTab(tabId) {
    if (tabId) {

        const allTabs = document.querySelectorAll('.sidebarTab');
        const allBtns = document.querySelectorAll('.sidebarItem');


        allTabs.forEach(tab => {
            tab.classList.remove('activeTab');
        });


        allBtns.forEach(btn => {
            btn.classList.remove('activeBtn');
        });


        const tabElement = document.getElementById(tabId);
        const tabButtonId = tabId.slice(0, -3) + "Btn";
        const tabButton = document.getElementById(tabButtonId);

        if (tabElement) {
            // Add the 'activeTab' class to the clicked tab
            tabElement.classList.add('activeTab');
        } else {
            console.log(`Element with id ${tabId} not found.`);
        }

        // Add the 'activeBtn' class to the corresponding button
        if (tabButton) {
            tabButton.classList.add('activeBtn');
        } else {
            console.log(`Button associated with ${tabId} not found.`);
        }
    }
}