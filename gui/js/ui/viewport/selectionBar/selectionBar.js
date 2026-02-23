import { UIElement } from "../../UIElement.js";
import { viewport } from "../viewport.js";

const selectionBar = new UIElement({
    type: 'div',
    id: 'selectionBar',
    classNames: ['selectionBar'],
    styles: {
        position: 'absolute',
        left: '15%',
        bottom: '40px',
        height: '280px',
        width: '1000px',
        borderRadius: '6px',
        backgroundColor: 'rgb(235, 235, 235, 0.9)',
        color: 'black',
        fontSize: '14px',
        fontFamily: 'Verdana',
        fontWeight: 'bold',
        padding: '0.2rem',
        zIndex: 15,
        display: 'flex',
        flexDirection: 'column',


    },
    content: `<selectionbar-component></selectionbar-component>`
})

export { selectionBar }