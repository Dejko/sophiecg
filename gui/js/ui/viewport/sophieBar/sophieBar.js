import { UIElement } from "../../UIElement.js";
import { viewport } from "../viewport.js";

const sophieBar = new UIElement({
    type: 'div',
    id: 'sophieBar',
    classNames: ['sophieBar'],
    styles: {
        position: 'absolute',
        left: '15%',
        bottom: '40px',
        height: '305px',
        width: '1000px',
        borderRadius: '6px',
        //backgroundColor: 'rgb(135, 135, 135, 0.9)',
        color: 'black',
        fontSize: '14px',
        fontFamily: 'Verdana',
        fontWeight: 'bold',
        padding: '0.2rem',
        zIndex: 15,
        display: 'flex',
        flexDirection: 'column',


    },
    content: `<sophiebar-component></sophiebar-component>`
})

export { sophieBar }