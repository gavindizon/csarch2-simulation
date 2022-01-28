import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { FaRegSave, FaClipboard } from "react-icons/fa";
import { toUTF32 } from "../helpers/toUTF32";
import { toUTF16 } from "../helpers/toUTF16";
import { hexToDec } from "../helpers/converter";
import { toUTF8 } from "../helpers/toUTF8";



export default function Home() {
    let [validity, setValidity] = useState(true);
    let [input, setInput] = useState("");
    let [utf8, setUtf8] = useState("");
    let [utf16, setUtf16] = useState("");
    let [utf32, setUtf32] = useState("");
    let [invalidText, setInvalidText] = useState("");

    const checkResult= (result) => {
        return  (result ?  result : "0000 0000");
    }

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const utf8 = document.getElementById("utf8").value;
        const utf16 = document.getElementById("utf16").value;
        const utf32 = document.getElementById("utf32").value;

        const file = new Blob([checkResult (utf8) + "\n" + 
                               checkResult (utf16) + "\n" + 
                               checkResult (utf32)], {
          type: "text/plain;charset=utf-8"
        });
        element.href = URL.createObjectURL(file);
        element.download = "utfresult.txt";
        document.body.appendChild(element);
        element.click();
      };

    function checkInputValidity() { }

    useEffect(() => {
        console.log("INPUT", input);
        console.log("VALIDITY", validity);
        if (!validity) {
            setUtf8("");
            setUtf16("");
            setUtf32("");
        } else {
            if (input !== "") {
                setUtf8(toUTF8(input));
                setUtf16(toUTF16(input));
                setUtf32(toUTF32(input));
            }
        }
    }, [input]);

    return (


        <Layout>
            {/* HEADER */}
            <div className="py-24 md:py-0">
                <div className="text-center">
                    <h1 className="text-4xl md:text-7xl font-light">
                        <span className="font-medium text-green-600">UNI</span>CODE
                    </h1>
                    <p className="px-2 md:px-32 font-semilight text-gray-700 py-2">
                        Converting unicode to UTF-8, UTF-16, and UTF-32 made simple.
                    </p>
                </div>
                {/* INPUT AREA */}
                <div className="text-center pt-8 px-2">
                    <h2 className="font-bold pb-2">Input:</h2>
                    <div className="flex w-full justify-center items-center">
                        <div className={styles.prefix}>U+</div>
                        <input
                            type="text"
                            maxLength={6}
                            className={`${styles.input} relative form-input rounded w-full sm:w-72 text-uppercase`}
                            placeholder="0000"
                            value={input}
                            onChange={(e) => {
                                let isTextValid = /^[0-9A-Fa-f]+$/.test(e.target.value);
                                let isNotBeyondMax = hexToDec(e.target.value) <= 1114111; // 10ffff

                                setValidity(isTextValid && isNotBeyondMax);

                                let showInvalidText =
                                    isTextValid && isNotBeyondMax
                                        ? ""
                                        : isTextValid
                                            ? "Error: Beyond Max of Unicode"
                                            : "Error: Invalid Input";

                                setInvalidText(showInvalidText);

                                setInput(e.target.value);
                            }}
                        />
                    </div>
                    <span
                        className={`${validity || input === "" ? "opacity-0" : "opacity-100"} text-red-700 h-10 mt-1`}
                    >
                        {invalidText}&nbsp;
                    </span>
                </div>
                {/* OUTPUT AREA */}
                <div className="text-center pt-8 px-2 flex justify-center items-center md:space-x-4 flex-col md:flex-row">
                    <div className="w-full sm:w-72">
                        <h2 className="font-bold pb-2">UTF-8:</h2>
                        <input
                            id="utf8"
                            type="text"
                            className={`form-input rounded w-full sm:w-72`}
                            placeholder="0000 0000"
                            value={utf8}
                            disabled
                        />
                    </div>
                    <div className="w-full sm:w-72">
                        <h2 className="font-bold pb-2">UTF-16:</h2>
                        <input
                            id="utf16"
                            type="text"
                            className="form-input rounded w-full sm:w-72 utf16"
                            placeholder="0000 0000"
                            value={utf16}
                            disabled
                        />
                    </div>
                    <div className="w-full md:w-72">
                        <h2 className="font-bold pb-2">UTF-32:</h2>
                        <input
                            id="utf32"
                            type="text"
                            className="form-input rounded w-full sm:w-72 utf32"
                            placeholder="0000 0000"
                            value={utf32}
                            disabled
                        />
                    </div>
                </div>

                <div className="text-center py-8 px-2 md:space-x-4">
                    <button className="border-solid border-2 rounded-md px-6 py-2 text-blue-500 border-blue-500 inline-block whitespace-nowrap w-full md:w-auto transition-colors hover:text-blue-700  hover:border-blue-700 mb-4">
                        <FaClipboard size={21} className="inline mr-2 leading-2 mb-1.5 " />
                        COPY TO CLIPBOARD
                    </button>
                    <button onClick={downloadTxtFile} className="border-solid border-2 rounded-md px-6 py-2 bg-blue-500 text-white border-blue-500 inline-block whitespace-nowrap w-full md:w-auto transition-colors hover:bg-blue-400  hover:border-blue-400 mb-4">
                        <FaRegSave size={21} className="inline mr-2 leading-2 mb-1.5" />
                        SAVE .TXT FILE
                    </button>
                </div>
            </div>
        </Layout>
    );
}
