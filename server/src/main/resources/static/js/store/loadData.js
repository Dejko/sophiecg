import { loadStateFromIDB } from "./dbStore.js";
import { handleStateOnLoad } from "./initializeState.js";
import { SophieColorPatch } from "../ui/viewport/gridPatches/sophiePatch.js";
import { URLS } from "../constants/constants.js";
import { initializeStateFromUrl } from "./initializeState.js";
import { globalStateController } from "./stateController.js";


const url = URLS.DATA_DEFAULT;

async function loadData() {
    try {
        const allRecords = await loadStateFromIDB();
        //console.log("Records loaded:", allRecords);
        // Use the loaded records as needed

        const resultObject = allRecords.reduce((acc, item) => {
            acc[item.id] = item.value; // Set the id as the key and value as the value
            return acc;
        }, {}); // Initialize the accumulator as an empty object


        if (!resultObject || resultObject.length === 0) {
            globalStateController.defaultState()
            //initializeStateFromUrl(url)
        } else {
            const matrixData = resultObject.matrix;
            const restoredMatrix = matrixData.map(row =>
                row.map(patch => {
                    // Destructure the properties from the cell object
                    const { row, col, inkSet, inkValues, cell } = patch;
                    // Create a new SophieColorPatch instance
                    return new SophieColorPatch(row, col, inkSet, inkValues, cell);
                })
            );
            resultObject.matrix = restoredMatrix;
            handleStateOnLoad(resultObject)
        }





    } catch (error) {
        console.error("Failed to load records:", error);
    }
}

export default loadData