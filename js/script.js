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

document.addEventListener('DOMContentLoaded', function() {

    function clockCalc() {
        const tValue = document.getElementById("timeEntry").value;
        
        if (tValue.length === 4) {
            let hours = parseInt(tValue.slice(0, 2), 10);
            let minutes = tValue.slice(2, 4);

            hours = (hours + 12) % 24;

            let adjustedHours = hours.toString().padStart(2, '0');
            
            let adjustTime = adjustedHours + ':' + minutes + ' ' + " Z";

            document.getElementById("timeExit").textContent = adjustTime;
        } else {
            document.getElementById("timeExit").textContent = "invalid time format";
        }
    }
    
    document.getElementById("timeEntry").addEventListener('input', clockCalc);
});

document.addEventListener("DOMContentLoaded", function() {

    function warning() {
        const flightTime = document.getElementById("flightTime").value;
        const dutyTime = document.getElementById("dutyTime").value;

        let flightTimeFont = document.getElementById("flightTime");
        let dutyTimeFont = document.getElementById("dutyTime");

        const warningPrompt = document.getElementById("warningPrompt");
        const flightPrompt = document.getElementById("flight1");
        const dutyPrompt = document.getElementById("duty1");

        // Reset visibility and colors before checking conditions
        warningPrompt.classList.add("hidden");
        flightPrompt.classList.add("hidden");
        dutyPrompt.classList.add("hidden");
        flightTimeFont.style.color = "black";
        dutyTimeFont.style.color = "black";

        // Check flight time
        if (flightTime >= 10) {
            flightTimeFont.style.color = "red";
            warningPrompt.classList.remove("hidden");
            flightPrompt.classList.remove("hidden");
        }

        // Check duty time
        if (dutyTime >= 13.5) {
            dutyTimeFont.style.color = "red";
            warningPrompt.classList.remove("hidden");
            dutyPrompt.classList.remove("hidden");
        }
    }

    document.addEventListener('input', warning);
});