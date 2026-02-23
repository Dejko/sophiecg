import { UIElement } from "../../UIElement.js";
import { viewport } from "../viewport.js";

const zoomTool = new UIElement({
    type: 'div',
    id: 'zoomTool',
    classNames: ['zoomTool'],
    styles: {
        position: 'absolute',
        right: '10px',
        bottom: '40px',
        height: '30px',
        width: '100px',
        backgroundColor: 'rgb(235, 235, 235)',
        color: 'black',
        fontSize: '14px',
        fontFamily: 'Verdana',
        fontWeight: 'bold',
        fontSize: '18px',
        padding: '6px',
        lineHeight: '22px',
        zIndex: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',


    },
    content: `<div class="zoomTool-container"> 
    <span class="zoomBtn" id="negativeZoom" style="cursor:pointer">-</span> 
            <span id="zoomLevel">100</span> 
    <span class="zoomBtn" id="positiveZoom" style="cursor:pointer">+</span>
    </div>`
})


export { zoomTool }