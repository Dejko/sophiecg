import { UIElement } from "../../UIElement.js";


export const gridTab = new UIElement({
    type: 'div',
    id: 'gridTab',
    classNames: ['activeTab', 'sidebarTab', 'sb-panel'],
    styles: {
        fontFamily: 'Tahoma',
    },
    content: `
            <gridtab-component> </gridtab-component>
    `
});



