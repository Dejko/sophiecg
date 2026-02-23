import { UIElement } from "../UIElement.js"
import { colorGrid } from "./gridDrawer/drawingCanvasElement.js"
import { patchRange } from "./gridRulers/patchRange.js"
import { ruler } from "./gridRulers/ruler.js"
import { infoTool } from "./infoTool/infoTool.js"
import { selectionBar } from "./selectionBar/selectionBar.js"
import { sophieBar } from "./sophieBar/sophieBar.js"
import { zoomTool } from "./infoTool/zoomTool.js"
import { contextMenu } from "./contextMenu/contextMenu.js"
import { slopeDrawer } from "./slopeDrawer/slopeDrawerElement.js"

const viewport = new UIElement({
    type: 'div',
    id: 'viewport',
    styles: {
        width: 'calc(100vw - 250px)',
        height: '100%',
        backgroundColor: 'rgb(22, 22, 22)',
        position: 'fixed',
        top: '36px',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
    },
    classNames: ['viewport'],
    content: '',
    children: [
        patchRange.render(),
        ruler.render(),
        colorGrid.render(),
        zoomTool.render(),
        contextMenu.render(),
        selectionBar.render(),
        //sophieBar.render(),
        slopeDrawer.render()

    ],
    events: {
        //  wheel: (event) => handleZoom(event)
    }
})


export { viewport }