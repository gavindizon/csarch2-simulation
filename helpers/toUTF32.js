export const toUTF32 = (input) => {
    // Add Padding
    let newString = String(input).padStart(8, "0");
    // Add Space in between
    newString = newString.substring(0, 4) + " " + newString.substring(4);
    return newString.toUpperCase();
};
