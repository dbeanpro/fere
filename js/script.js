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

// Attach event listeners programmatically
function setupEventListeners() {
    for (let i = 1; i <= 10; i++) {
        const element = document.getElementById(`ICAO${i}`);
        if (element) {
            element.addEventListener('input', autoPopulateICAO);
        }
    }
}

// Run the setup function after DOM content is loaded
document.addEventListener('DOMContentLoaded', setupEventListeners);