import { UIElement } from "../../UIElement.js"

const contextMenu = new UIElement({
    type: 'div',
    id: 'contextMenu',
    styles: {
        width: '',
        height: '',
        backgroundColor: 'rgb(39, 37, 37)',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px',
        zIndex: '999',
        position: 'absolute',
        border: '1px solid rgba(235, 248, 243, 0.29)',
        color: 'azure',
        borderRadius: '3px',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'

    },
    classNames: ['context-menu'],
    children: [

    ],
    content: `
   <contextmenu-component> </contextmenu-component>
    `
})


export { contextMenu }