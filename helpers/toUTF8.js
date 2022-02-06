import { hexToBin, hexToDec, decToHex, binToDec, binToHex, decToBin } from "./converter";

export const toUTF8 = (input) => {
    let newString = String(input).padStart(8, "0");
	
    // U+0000 - U+007F - DONE
    if(hexToDec(input) <= 127) {
		newString = input.slice(-2);
    }
    // U+0080 - U+07FF
    else if(hexToDec(input) >= 128 && hexToDec(input) <= 2047) {
		let byte1 = "";
		let byte2 = "";
		
		// Split binary to 2
		byte1 = hexToBin(input).slice(0,-6);
		byte2 = hexToBin(input).slice(-6);
		
		console.log("BYTE1 ", byte1);
		console.log("BYTE2 ", byte2);
		
		// Byte 1, 6 rightmost bits
		byte1 = byte1.padStart(5,0);
		byte1 = String(110) + byte1.slice(-5);
		
		console.log("NEWBYTE1 ", byte1);
		
		byte2 = String(10) + byte2;
		
		console.log("NEWBYTE2 ", byte2);
		
		// Return value
        newString = binToHex(byte1) + " " + binToHex(byte2);
    }
    // U+0800 - U+FFFF
    else if(hexToDec(input) >= 2048 && hexToDec(input) <= 65535) {
		let byte3 = "";
		
		byte1 = binToHex("10" + hexToBin(input).slice(-6));
        byte2 = binToHex("10" + hexToBin(input).substring(hexToBin(input).length - 6, hexToBin(input).length - 12));
        byte3 = binToHex("1110" + hexToBin(input).slice(0, 4));

        newString = byte3 + " " + byte2 + " " + byte1;
    }
    // U+10000 - U+1FFFFF
    else if(hexToDec(input) >= 65536 && hexToDec(input) <= 2097151) {
		let byte4 = "";
		
        byte1 = binToHex("10" + hexToBin(input).slice(-6));
        byte2 = binToHex("10" + hexToBin(input).substring(hexToBin(input).length - 6, hexToBin(input).length - 12));
		
		
        byte3 = binToHex("10" + hexToBin(input).substring(hexToBin(input).length - 12, hexToBin(input).length - 18));
        byte4 = binToHex("11110" + "0" + hexToBin(input).slice(0,2));

        newString = byte4 + " " + byte3 + " " + byte2 + " " + byte1;
    }
	
	console.log("UTF8TEST", newString);
	
    return newString;
};
