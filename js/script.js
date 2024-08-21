function reveal(elID) {
    let target = document.getElementById(elID);

    target.classList.toggle("hidden");
}

function revealClass(classID) {
    let targets = document.getElementsByClassName(classID);

    Array.from(targets).forEach(target => {
        target.classList.toggle("hidden");
    })
}

function autoPopulateICAO() {

    for (let i = 1; i <= 10; i++) {
        const locElement = document.getElementById(`ICAO${i}`);
        const locElementA = document.getElementById(`ICAO${i}a`);
        if (locElement && locElementA) {
            locElementA.value = locElement.value;
        }
    }
}

function setupEventListeners() {
    for (let i = 1; i <= 10; i++) {
        const element = document.getElementById(`ICAO${i}`);
        if (element) {
            element.addEventListener('input', autoPopulateICAO);
        }
    }
}

document.addEventListener('DOMContentLoaded', setupEventListeners);

// remove external styling on copy/paste data
document.addEventListener("DOMContentLoaded", function() {
    const editDivs = document.querySelectorAll('[contenteditable="true"]');

    editDivs.forEach(div => {
        div.addEventListener('paste', function (e) {
            e.preventDefault();

            let text = (e.clipboardData || window.clipboardData).getData('text');

            document.execCommand('insertText', false, text);
        });
    });
})