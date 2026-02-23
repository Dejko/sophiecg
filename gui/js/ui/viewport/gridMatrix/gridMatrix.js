import { SophieColorPatch } from "../gridPatches/sophiePatch.js";

export default class GridMatrix {
    constructor(frameLength, substrateWidth, sideMargin, frontOffset, patchLength, patchHeight, patchGap, inkSet, fill, inkValues) {
        this.frameLength = frameLength;  // The length of the grid
        this.substrateWidth = substrateWidth;  // The width of the grid
        this.sideMargin = sideMargin;
        this.frontOffset = frontOffset; // Side margin
        this.patchLength = patchLength;  // Width of a patch
        this.patchHeight = patchHeight;  // Height of a patch
        this.patchGap = patchGap;  // Gap between patches
        this.inkSet = (inkSet || ['C', 'M', 'Y', 'K']).map(color => color.charAt(0).toUpperCase());
        this.fill = fill || 'random'
        this.matrix = [];  // To store the matrix data (2D grid)
        this.inkValues = inkValues
        this.info = {}
        // Initialize the grid
        this.generateGridMatrix();
    }

    generateGridMatrix() {
        const numOfRows = Math.floor((this.substrateWidth - this.sideMargin) / (this.patchHeight + this.patchGap));
        const numOfCols = Math.floor((this.frameLength - this.frontOffset) / (this.patchLength + this.patchGap));
        const matrix = [];
        this.info = {
            rows: numOfRows,
            cols: numOfCols,
            patches: numOfRows * numOfCols
        }

        for (let row = 0; row < numOfRows; row++) {
            const rowArray = [];

            for (let col = 0; col < numOfCols; col++) {
                const patch = new SophieColorPatch(row, col, this.inkSet);
                //patch.initializeInkValues(this.inkSet)
                patch.setMeasurements({
                    length: this.patchLength,
                    height: this.patchHeight,
                    gap: this.patchGap
                })
                if (this.fill === 'random') {
                    patch.randomizeInkValues(this.inkSet);
                }
                else if (this.fill = "empty") {
                    patch.initializeInkValues(this.inkSet)
                }
                else if (this.fill == "custom")
                    patch.setInkValues(this.inkValues)

                rowArray.push(patch);
            }
            matrix.push(rowArray);
        }

        return matrix;
    }

    // Getter for matrix data
    getMatrix() {
        return this.matrix;
    }



    getMatrixInfo() {
        return this.info;
    }

    getPatch(row, col) {
        return this.matrix[row][col]
    }

    updatePatch(row, col, newInkValues, newMeasurements) {
        // Find the patch in the matrix
        const patch = this.getPatch(row, col);

        // Update the ink values if provided
        if (newInkValues) {
            patch.setInkValues(newInkValues);
        }

        // Update the patch measurements (length, height, gap) if provided
        if (newMeasurements) {
            patch.setMeasurements(newMeasurements);
        }

        // Optionally, you can update other properties of the patch here if necessary
    }


}