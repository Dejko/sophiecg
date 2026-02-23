import { UIElement } from "../UIElement.js";


const modalContent = new UIElement({
    type: 'div',
    id: 'modalContent',
    content: `
    <style>
                                .close {
                             color: #aaa;
                            float: right;
                            font-size: 28px;
                            font-weight: bold;
                            }

                            .close:hover,
                            .close:focus {
                            color: black;
                            text-decoration: none;
                            cursor: pointer;
                            }

                            /* Modal Header */
                            .modal-header {
                            padding: 2px 16px;
                            background-color: #5cb85c;
                            color: white;
                            }

                            /* Modal Body */
                            .modal-body {padding: 2px 16px;}

                            /* Modal Footer */
                            .modal-footer {
                            padding: 2px 16px;
                            background-color: #5cb85c;
                            color: white;
                            }

                            /* Modal Content */
                            .modal-content {
                            position: relative;
                            background-color: #fefefe;
                            margin: auto;
                            padding: 0;
                            border: 1px solid #888;
                            width: 80%;
                            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
                            animation-name: animatetop;
                            animation-duration: 0.6s
                            }

                            /* Add Animation */
                            @keyframes animatetop {
                            from {top: -300px; opacity: 0}
                            to {top: 0; opacity: 1}
                            } 
                            </style>
                                <div class="modal-header">
                                    <span  class="close">&times;</span>
                                    <h2>Modal Header</h2>
                                </div>
                                <div class="modal-body">
                                    <p>Some text in the Modal Body</p>
                                    <p>Some other text...</p>
                                </div>
                                <div class="modal-footer">
                                    <h3>Modal Footer</h3>
                                </div>
   `,
    styles: {
        margin: 0,
        border: '1px solid #888',
        borderRadius: '10px',
        backgroundColor: '#fefefe', /* Fallback color */
    },
    classNames: ['modal-content'],
    children: [



    ],
})


const modalBackground = new UIElement({
    type: 'div',
    id: 'modalBackground',
    content: '',
    styles: {
        display: 'none', /* Hidden by default */
        position: 'fixed', /* Stay in place */
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, /* Sit on top */
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',/* Full height */
        overflow: 'hidden', /* Enable scroll if needed */
        backgroundColor: 'rgba(0, 0, 0, 0.9)', /* Fallback color */
    },
    classNames: ['modal'],
    children: [
        modalContent.render(),


    ],
    content: '',
    events: {
        click: (event) => closeModal(event)

    }

})


export default modalBackground


// Function to close the modal
export function closeModal(e) {

    var modal = document.getElementById("modalBackground");
    // Close modal when clicking the background or close button
    if (e.target === modal || e.target.classList.contains('close')) {
        modal.style.display = "none";
    }
}

// Function to open the modal with custom content, size, and position
export function openModal(headerContent, bodyContent, footerContent, size = { width: '80%', height: 'auto' }, position = { top: '50%', left: '50%' }) {
    // Update the modal content with passed arguments
    const modalHeader = document.querySelector('.modal-header');
    const modalBody = document.querySelector('.modal-body');
    const modalFooter = document.querySelector('.modal-footer');

    modalHeader.innerHTML = `
        <span class="close">&times;</span>
        <h2>${headerContent}</h2>
    `;
    modalBody.innerHTML = bodyContent;
    modalFooter.innerHTML = `<h3>${footerContent}</h3>`;

    // Apply custom size and position
    const modalContentElement = document.querySelector('.modal-content');

    // Apply custom size
    modalContentElement.style.width = size.width;
    modalContentElement.style.height = size.height;

    // Apply custom position (using transform to center the modal)
    modalContentElement.style.transform = `translate(-50%, -50%)`;
    modalContentElement.style.top = position.top;
    modalContentElement.style.left = position.left;

    var modal = document.getElementById("modalBackground");
    modal.style.display = "flex"; // Show the modal
}