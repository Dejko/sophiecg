import { globalStateController } from "../store/stateController.js";
import { URLS } from "../constants/constants.js";


export async function sendRequest(url, payload) {

    console.log("Sending request to:", url);
    console.log("Payload:", payload.gridName);

    const state = globalStateController.getState();
    const gridName = state.gridName.toString();
    // Append gridName as a query parameter to the URL


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // Assuming the response is a PDF, you need to treat it as a Blob (binary data)
            const pdfBlob = await response.blob();


            // Create a link to download the PDF file
            const link = document.createElement('a');
            link.href = URL.createObjectURL(pdfBlob);
            link.download = `${gridName}` + ".pdf"; // Set filename
            link.click();


        } else {
            // Handle error (response is not OK)
            const errorResponse = await response.json();
            console.log('Error:', errorResponse);
        }
    } catch (error) {
        console.error('Error sending request:', error);
    }
}