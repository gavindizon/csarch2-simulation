import { hexToBin, hexToDec, decToHex, binToDec, binToHex } from "./converter";

export const toUTF16 = (input) => {
    // Add Padding
    let newString = String(input).padStart(8, "0");

    if (hexToDec(input) <= 65535) {
        // Add Space in between
        newString = newString.toUpperCase().substring(0, 4) + " " + newString.toUpperCase().substring(4);
    } else {
        // INPUT - 0x10000
        console.log("INPUTTT A", hexToDec(input));
        console.log("INPUTTT B", hexToDec("10000"));
        let val = decToHex(hexToDec(input) - hexToDec("10000"));

        //console.log("VAL", val);
        //
        let bin = String(hexToBin(val)).padStart(20, "0");

        //console.log("TEST", bin);

        let firstHalf = decToHex(binToDec(bin.slice(0, 10)) + hexToDec("D800"));

        let secondHalf = decToHex(binToDec(bin.slice(10)) + hexToDec("DC00"));

        newString = String(firstHalf).padStart(4, 0) + " " + String(secondHalf).padStart(4, 0);
    }
    return newString;
};
