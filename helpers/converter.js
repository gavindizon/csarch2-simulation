const binToDec = (input) => {
    //console.log("BINTODEC", input);
    let reversedStringToArr = input.split("").reverse();

    let sum = reversedStringToArr.reduce((prev, curr, ind) => {
        if (curr * 1 === 0) {
            //     console.log("IS 0");
            return prev + 0;
        } else {
            //    console.log("IS 1");
            return prev + Math.pow(2, ind);
        }
    }, 0);

    //    console.log("SUM", sum);
    return sum;
};

const binToHex = (input) => {
    console.log("BTH", input);
    let reversedStringToArr = input.split("");

    let key = {
        "0000": "0",
        "0001": "1",
        "0010": "2",
        "0011": "3",
        "0100": "4",
        "0101": "5",
        "0110": "6",
        "0111": "7",
        1000: "8",
        1001: "9",
        1010: "A",
        1011: "B",
        1100: "C",
        1101: "D",
        1110: "E",
        1111: "F",
    };

    let hexStorage = "";

    let singleHexStorage = "";

    let j = 0;

    for (let i = reversedStringToArr.length - 1; i >= 0; i--) {
        if (j === 4) {
            console.log("HEXX", singleHexStorage);
            hexStorage = key[singleHexStorage] + hexStorage;
            singleHexStorage = ""; // reset
            j = 0;
            singleHexStorage = reversedStringToArr[i] + singleHexStorage;
        } else {
            singleHexStorage = reversedStringToArr[i] + singleHexStorage;
        }
        j++;
    }

    if (j > 0) {
        hexStorage = key[String(singleHexStorage).padStart(4, "0")] + hexStorage;
        singleHexStorage = ""; // reset
        j = 0;
    }

    return hexStorage;
};

const decToBin = (input) => {
    return input.toString(2);
};

const decToHex = (input) => {
    return binToHex(decToBin(input));
};

const hexToBin = (input) => {
    const key = {
        0: "0000",
        1: "0001",
        2: "0010",
        3: "0011",
        4: "0100",
        5: "0101",
        6: "0110",
        7: "0111",
        8: "1000",
        9: "1001",
        A: "1010",
        B: "1011",
        C: "1100",
        D: "1101",
        E: "1110",
        F: "1111",
    };

    let binStore = ""; // binary storage

    let stringToArr = input.split("");

    stringToArr.map((item) => {
        binStore = binStore + key[item.toUpperCase()];
    });

    //    console.log("HEXTOBIN", binStore);
    //    console.log("HEXTOBIN -> BINTOHEX", binToHex(binStore));

    return binStore;
};

const hexToDec = (input) => {
    console.log("HEXTODEC", input);
    return binToDec(hexToBin(input));
};

export { binToDec, binToHex, decToBin, decToHex, hexToBin, hexToDec };
