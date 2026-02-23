

function cmToPixels(cm, dpi = window.devicePixelRatio || 96) {
    const cmToInches = 2.54; // 1 inch = 2.54 cm
    return ((cm * dpi) / cmToInches) * 10;
}


function charToInt(char) {
    return char.charCodeAt(0) - 65; // Subtract 65 to get the index (0 for 'A', 1 for 'B', etc.)
}


// Adjust a color based on a percentage (0 to 1)
function adjustColorByPercentage(color, baseColor, percentage) {
    // Ensure percentage is between 0 and 1
    let t = Math.min(1, Math.max(0, percentage));  // Clamp the percentage to be between 0 and 1

    // Interpolate between the base color and the target color (spot color)
    let R = (1 - t) * baseColor[0] + t * color[0];
    let G = (1 - t) * baseColor[1] + t * color[1];
    let B = (1 - t) * baseColor[2] + t * color[2];


    return { R, G, B }
}

// Create ascii character from A to Z based on index 0 to 25 after 25 will double letters AA, AB, AC ...
function intToChar(index) {
    let result = '';
    index += 1; // Adjust for 1-based indexing
    while (index > 0) {
        index--;    // Decrement index to make it 0-based for modulo operation  

        let charCode = (index % 26) + 65; // 65 is the char code for 'A'
        result = String.fromCharCode(charCode) + result;
        index = Math.floor(index / 26); // Move to the next "digit"
    }
    return result;
}





export { cmToPixels, charToInt, adjustColorByPercentage, intToChar }