import { UIElement } from "../UIElement.js";
import { fileMenu } from "../navbar/fileMenu.js";
import { editMenu } from "../navbar/editMenu.js";
import { viewMenu } from "./viewMenu.js";
import { addMenu } from "./addMenu.js"
import { helpMenu } from "./helpMenu.js";
import { toolsMenu } from "./toolsMenu.js";
const navbar = new UIElement({
    type: 'div',
    id: 'navbar',
    styles: {
        width: '100%',
        backgroundColor: 'rgb(11, 11, 11)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '5px',
        zIndex: '10',
        position: 'fixed',
        zIndex: '1111'
    },
    classNames: ['navbar'],
    children: [
        fileMenu.render(),
        editMenu.render(),
        addMenu.render(),
        viewMenu.render(), toolsMenu.render(), helpMenu.render(),


    ],
})


export { navbar }