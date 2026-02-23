
import { intToChar } from "../../../util/helpers.js";


export class SophieColorPatch {
    constructor(row, col, inkSet, inkValues = {}, cell) {
        this.row = row
        //this._row = String.fromCharCode(row + 65)
        this._row = intToChar(row)
        this.col = col;
        this.inkSet = inkSet;
        this.inkValues = inkValues;
        this.cell = cell || {};
    }




    // Main function to convert ink values to RGB
    inkToRgb() {
        console.log(this.inkSet)
        let C = this.inkValues.C || 0;
        let M = this.inkValues.M || 0;
        let Y = this.inkValues.Y || 0;
        let K = this.inkValues.B || 0;
        let O = this.inkValues.O || 0;
        let V = this.inkValues.V || 0; // Violet value
        let W = this.inkValues.W || 0; // White value
        let Gr = this.inkValues.G || 0; // Green value

        let R = 255 * (1 - C) * (1 - K);  // Red channel
        let G = 255 * (1 - M) * (1 - K);  // Green channel
        let B = 255 * (1 - Y) * (1 - K);  // Blue channel

        return { R, G, B };
    }






    ink2rgb() {
        let C = this.inkValues.C || 0;
        let M = this.inkValues.M || 0;
        let Y = this.inkValues.Y || 0;
        let K = this.inkValues.B || 0;
        let O = this.inkValues.O || 0;
        let V = this.inkValues.V || 0; // Violet value
        let W = this.inkValues.W || 0; // White value
        let Gr = this.inkValues.G || 0; // Green value

        // Step 1: Convert CMYK to RGB
        let baseColor = cmykToRgb(C, M, Y, K);
        let lchBaseColor = rgbToLch(baseColor.R, baseColor.G, baseColor.B);

        if (this.inkSet.includes('O')) {
            if (O > 0) {
                let spotOrangeLCH = [70, 105, 68]; // LCH value for spot orange
                let spotOrangeRGB = chroma.lch(spotOrangeLCH[0], spotOrangeLCH[1], spotOrangeLCH[2]).rgb();
                let scaledSpotOrange = chroma.scale(['white', spotOrangeRGB]).mode('lch')(O);
                let finalOrange = scaledSpotOrange.rgb();

                let { R, G, B } = baseColor

                let blendColor = chroma.bezier([[R, G, B], finalOrange]);
                // Return the final scaled color as an object
                let finalBlend = blendColor(0.5);
                // Enhance the saturation of the final blended color
                let enhancedBlend = chroma(finalBlend).saturate(3);

                let rgb = enhancedBlend.rgb();
                return { R: rgb[0], G: rgb[1], B: rgb[2] };
            }

        }

        if (this.inkSet.includes('G')) {
            if (Gr > 0) {
                let spotGreenLCH = [83, 85, 161]; // LCH value for spot orange
                let spotGreenRGB = chroma.lch(spotGreenLCH[0], spotGreenLCH[1], spotGreenLCH[2]).rgb();
                let scaledSpotGreen = chroma.scale(['white', spotGreenRGB]).mode('lch')(Gr);
                let finalGreen = scaledSpotGreen.rgb();

                let { R, G, B } = baseColor;

                let blendColor = chroma.bezier([[R, G, B], finalGreen]);
                // Return the final scaled color as an object
                let finalBlend = blendColor(0.5);
                // Enhance the saturation of the final blended color
                let enhancedBlend = chroma(finalBlend).saturate(3);

                let rgb = enhancedBlend.rgb();
                return { R: rgb[0], G: rgb[1], B: rgb[2] };
            }
        }

        if (this.inkSet.includes('V')) {
            if (V > 0) {
                let spotVioletLCH = [46, 100, 302]; // LCH value for spot orange
                let spotVioletRGB = chroma.lch(spotVioletLCH[0], spotVioletLCH[1], spotVioletLCH[2]).rgb();
                let scaledSpotViolet = chroma.scale(['white', spotVioletRGB]).mode('lch')(V);
                let finalViolet = scaledSpotViolet.rgb();

                let { R, G, B } = baseColor;

                let blendColor = chroma.bezier([[R, G, B], finalViolet]);
                // Return the final scaled color as an object
                let finalBlend = blendColor(0.5);
                // Enhance the saturation of the final blended color
                let enhancedBlend = chroma(finalBlend).saturate(6);

                let rgb = enhancedBlend.rgb();
                return { R: rgb[0], G: rgb[1], B: rgb[2] };
            }
        }


        // Step 4: If no spot colors are included, return the base RGB color
        return baseColor;
    }

    setMeasurements({ length, height, gap }) {
        this.cell = {
            length: length,
            height: height,
            gap: gap
        }
    }


    initializeInkValues(inkSet) {
        this.inkValues = {};
        this.inkSet.forEach(element => {
            this.inkValues[element] = 0;
        });
    }

    // Method to set the value of a specific ink
    setInkValue(inkName, value) {
        if (this.inkSet.includes(inkName)) {
            this.inkValues[inkName] = value;
        } else {
            console.warn(`Ink name "${inkName}" is not in the ink set.`);
        }
        /**
         *  Example usage
            const patch = new Patch(0, 0, ['C', 'M', 'Y', 'K', 'O']);
            patch.setInkValues('C', 0.5);  // Set Cyan value
         */
    }

    // setInkValues(inkName, value)
    setInkValues(inkValues) {
        this.inkValues = {
            C: inkValues.C,
            M: inkValues.M,
            Y: inkValues.Y,
            K: inkValues.B,
        }

    }

    // Randomizes the ink values
    randomizeInkValues(inkSet) {
        this.inkValues = {}; // Initialize an empty object for inkValues
        this.inkSet.forEach(element => {
            this.inkValues[element] = parseFloat((Math.random()).toFixed(3));
        });
    }
    getPosition() {
        return { row: this.row, col: this.col };
    }

    render(ctx, x, y, patchWidthPx, patchLengthPx) {
        const { R, G, B } = this.ink2rgb();

        ctx.fillStyle = `rgb(${R}, ${G}, ${B})`;

        ctx.lineWidth = 0.5;
        ctx.fillRect(x, y, patchWidthPx, patchLengthPx);

        if (!this.inkValues) {
            ctx.strokeStyle = "black";
            ctx.strokeRect(x, y, patchWidthPx, patchLengthPx);
        }

        if (patchWidthPx > 37 && patchLengthPx > 37) {
            const letter = String.fromCharCode(this.row + 65);
            ctx.fillStyle = 'black';
            ctx.font = '9px Tahoma'
            ctx.fillText(`${letter}, ${this.col}`, x + 4, y + 10);
        }


        if (patchWidthPx > 45 && patchLengthPx > 45) {
            let offset = 6;
            const reversedInks = Object.entries(this.inkValues).reverse();

            for (let [ink, value] of reversedInks) {
                if (value >= 0) {
                    ctx.fillText(`${ink}: ${value.toFixed(3)}`, x + 5, y + patchLengthPx - offset);
                    offset += 12;
                }
            }
        }


    }

    /* Returns a string representation of the patch
    toString() {
        return `Patch(${this._row}, ${this.col}) - InkValues(${JSON.stringify(this.inkValues)})`;
    }*/

    drawOutline(ctx, x, y, patchWidthPx, patchLengthPx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.strokeRect(x - 2, y - 2, patchWidthPx + 3, patchLengthPx + 3);
    }


    getPatchDetails() {
        return {
            row: this._row,
            col: this.col,
            inkValues: this.inkValues
        };
    }
}



// Helper function to convert CMYK to RGB
function cmykToRgb(C, M, Y, K) {
    let R = 255 * (1 - C) * (1 - K);  // Red channel
    let G = 255 * (1 - M) * (1 - K);  // Green channel
    let B = 255 * (1 - Y) * (1 - K);  // Blue channel

    return { R, G, B };
}

// Helper function to blend a base color with a spot color
function blendSpotColor(baseColor, spotColor) {
    // Ensure both colors are chroma color objects (use chroma.rgb() if necessary)
    baseColor = chroma.rgb(baseColor.R, baseColor.G, baseColor.B);
    spotColor = chroma.rgb(spotColor.R, spotColor.G, spotColor.B);

    // Blend the base color with the spot color using chroma
    let blendedColor = chroma.average([baseColor, spotColor], 'rgb');
    let blendedRgb = blendedColor.rgb();
    return { R: blendedRgb[0], G: blendedRgb[1], B: blendedRgb[2] };
}

// Helper function to blend a base color with a spot color using HCL space
function blendSpotColorHCL(baseColor, spotColor, coverage) {
    // Ensure both colors are chroma color objects (use chroma.rgb() if necessary)
    baseColor = chroma.rgb(baseColor.R, baseColor.G, baseColor.B);

    // Convert the spot color (e.g., orange) to HCL space and adjust its saturation
    let spotColorHCL = chroma.rgb(spotColor.R, spotColor.G, spotColor.B).hcl();
    let adjustedSpotColorHCL = chroma.hcl(spotColorHCL[0], spotColorHCL[1], spotColorHCL[2]);

    // Blend the base color and the adjusted spot color using HCL space
    let blendedColor = chroma.mix(baseColor, adjustedSpotColorHCL, coverage);  // 50% blend, adjust as needed
    let blendedRgb = blendedColor.rgb();

    return { R: blendedRgb[0], G: blendedRgb[1], B: blendedRgb[2] };
}


function rgbToLch(R, G, B) {
    return chroma.rgb(R, G, B).lch();
}


function lchToRgb(L, C, H) {
    return chroma.lch(L, C, H).rgb();  // This returns RGB array [R, G, B]
}
