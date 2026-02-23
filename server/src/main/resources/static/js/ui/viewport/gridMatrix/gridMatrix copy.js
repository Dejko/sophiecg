export default class GridMatrix {
    constructor(frameLength, substrateWidth, sideMargin, patchWidth, patchHeight, patchGap) {
        this.frameLength = frameLength;  // The length of the grid
        this.substrateWidth = substrateWidth;  // The width of the grid
        this.sideMargin = sideMargin;  // Side margin
        this.patchWidth = patchWidth;  // Width of a patch
        this.patchHeight = patchHeight;  // Height of a patch
        this.patchGap = patchGap;  // Gap between patches
        this.matrix = [];  // To store the matrix data (2D grid)

        // Initialize the grid
        this.createMatrix();
    }

    createMatrix() {
        const rows = Math.floor(this.frameLength / (this.patchHeight + this.patchGap));
        const cols = Math.floor(this.substrateWidth / (this.patchWidth + this.patchGap));

        // Initialize the matrix as an empty array
        this.matrix = [];

        // Create a matrix of rows x columns filled with coordinate, measurement, and color values
        for (let i = 0; i < rows; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                // Calculate the x and y coordinates
                const x = j * (this.patchWidth + this.patchGap);
                const y = i * (this.patchHeight + this.patchGap);

                // Each cell now holds an object with coordinates, measurements, CMYK color, and a unique cellId
                this.matrix[i][j] = {
                    x: x,                      // X-coordinate for the position
                    y: y,                      // Y-coordinate for the position
                    width: this.patchWidth,    // Width of the cell (e.g., default patchWidth)
                    height: this.patchHeight,  // Height of the cell (e.g., default patchHeight)
                    gap: this.patchGap,
                    sideMargin: this.sideMargin,
                    cmyk: {                    // Color values in CMYK
                        c: 0,  // Cyan (default 0%)
                        m: 0,  // Magenta (default 0%)
                        y: 0,  // Yellow (default 0%)
                        k: 0   // Key/Black (default 0%)
                    },
                    cellId: `cell-${i}-${j}`,  // Unique identifier based on row (i) and column (j)
                    measurements: {            // Additional measurements (if needed)
                        // For example, a cell may have a scale factor or depth for 3D rendering
                        scale: 1.0,            // Scale factor (default 1, no scaling)
                        rotation: 0,           // Rotation (0 degrees by default)
                        depth: 0               // Depth (0 for 2D)
                    }
                };
            }
        }
    }
    // Getter for matrix data
    getMatrixData() {
        return this.matrix;
    }

    // Method to update matrix (if needed)
    updateMatrix(row, col, newValue) {
        if (this.matrix[row] && this.matrix[row][col]) {
            this.matrix[row][col] = newValue;
        }
    }
}