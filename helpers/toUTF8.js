import { hexToBin, hexToDec, decToHex, binToDec, binToHex, decToBin } from "./converter";

export const toUTF8 = (input) => {
    // Add Padding
    let newString = String(input).padStart(8, "0");
    let strBin =  hexToBin(input);
    let strDec = hexToDec(input);
    let byte1 = "";
    let byte2 = "";
    let byte3 = "";
    let byte4 = "";

    // U+0000 - U+007F
    if(strDec <= 127) { 
        newString = input.slice(-2);
    }
    // U+0080 - U+07FF
    else if(strDec >= 128 && strDec <= 2047) {

        // removing extra 0s
        if(input.charAt(0) === "0" && input.charAt(1) !== "0"){
            //only one 0, remove first four 0s
            strBin = strBin.slice(-12);
        }
        else if(input.charAt(0) === "0" && input.charAt(1) === "0"){
            //two 0s, remove first eight 0s
            strBin = strBin.slice(-8);
        }

        // converting back to hex
        byte1 = binToHex("10" + strBin.slice(-6));
        if(strDec < 256) {
            // less than 256, add three 0s
            byte2 = binToHex("110" + "000" + strBin.substring(0,2));
        }
        else {
            // greater than or equal to 256, remove first 0
            byte2 = binToHex("110" + strBin.slice(-11,-6));
        }

        newString = byte2 + " " + byte1;
    }
    // U+0800 - U+FFFF
    else if(strDec >= 2048 && strDec <= 65535) {
        byte1 = binToHex("10" + strBin.slice(-6));
        byte2 = binToHex("10" + strBin.substring(strBin.length - 6, strBin.length - 12));
        byte3 = binToHex("1110" + strBin.slice(0, 4));

        newString = byte3 + " " + byte2 + " " + byte1;
    }
    // U+10000 - U+1FFFFF
    else if(strDec >= 65536 && strDec <= 131071) {
        byte1 = binToHex("10" + strBin.slice(-6));
        byte2 = binToHex("10" + strBin.substring(strBin.length - 6, strBin.length - 12));
        byte3 = binToHex("10" + strBin.substring(strBin.length - 12, strBin.length - 18));
        byte4 = binToHex("11110" + "0" + strBin.slice(0,2));

        newString = byte4 + " " + byte3 + " " + byte2 + " " + byte1;
    }

    return newString;
};
