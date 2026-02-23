import { UIElement } from "../UIElement.js";
import { URLS } from "../../constants/constants.js";
import { sendRequest } from "../../api/postRequest.js";
import { globalStateController } from "../../store/stateController.js";
import { deleteDatabase } from "../../store/dbStore.js";

const fileBtn = new UIElement({
    type: 'button',
    id: 'fileBtn',
    content: 'File',
    classNames: ['menu-btn'],
})

const fileMenuList = new UIElement({
    type: 'ul',
    id: 'fileMenuList',
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


const fileMenu = new UIElement({
    type: 'div',
    id: 'fileMenu',
    classNames: ['dropdown'],
    styles: {

    },
    children: [
        fileBtn.render(),
        fileMenuList.render()
    ],
    events: {
        click: (e) => {
            const target = e.target;
            if (target.classList.contains('menu-item')) {
                //console.log(`Clicked on ${target.id} button`);
                if (target.id === 'newAction') {
                    // Refresh the window (reload the page)
                    location.reload(); // This reloads the page
                    deleteDatabase();
                    globalStateController.defaultState();
                    console.log('New button clicked');
                } else if (target.id === 'openAction') {
                    console.log('Open button clicked');
                } else if (target.id === 'saveAction') {
                    console.log('Save button clicked');
                } else if (target.id === 'closeAction') {
                    console.log('Close button clicked');
                } else if (target.id === 'exportAction') {

                    const payload = globalStateController.getState();
                    // Set the URL for the API request from constants
                    const url = URLS.API_REQUEST;

                    sendRequest(url, payload).then(data => {

                        // Do something with the data, for example, update UI or state
                        console.log(data)
                    }).catch(error => {
                        console.log(error)
                    });


                }
            }
        }
    }
})




export { fileBtn, fileMenu }