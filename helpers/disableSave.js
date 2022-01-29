const disableButtons = () => {
    document.getElementById("copy").disabled = true;
    document.getElementById("save").disabled = true;

    document.getElementById("save").style.background='#949494';
    document.getElementById("copy").style.background='#949494';
}

const enableButtons = () => {
    document.getElementById("copy").disabled = false;
    document.getElementById("save").disabled = false;

    document.getElementById("copy").style.background='#FFFFFF';
    document.getElementById("save").style.background='#0070f3';
}

export {enableButtons, disableButtons};