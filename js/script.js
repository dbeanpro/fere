function reveal(elID) {
    let target = document.getElementById(elID);

    target.classList.toggle("hidden");
}

function hide(elID) {
    let target = document.getElementById(elID);

    target.classList.add("hidden");
}

function reveal2(elID, elID2) {
    let target = document.getElementById(elID);
    let trigger = document.getElementById(elID2);

    if (trigger.checked) {
        target.classList.remove("hidden");
    }
    else {
        target.classList.add("hidden");
    }
}

function revealClass(classID) {
    let targets = document.getElementsByClassName(classID);

    Array.from(targets).forEach(target => {
        target.classList.toggle("hidden");
    })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
document.addEventListener("DOMContentLoaded", function() {

    function calculateFlightTime() {
        let totalMinutes = 0;

        for (let i = 1; i <= 20; i += 2) {
            // Get the time values from the current pair of time inputs
            const timeStart = document.getElementById(`times${i}`).value;
            const timeEnd = document.getElementById(`times${i + 1}`).value;

            if (timeStart && timeEnd) {
                // Extract hours and minutes from the time strings
                const startHours = parseInt(timeStart.slice(0, 2), 10);
                const startMinutes = parseInt(timeStart.slice(2), 10);
                const endHours = parseInt(timeEnd.slice(0, 2), 10);
                const endMinutes = parseInt(timeEnd.slice(2), 10);

                // Convert the times to minutes
                let startTotalMinutes = startHours * 60 + startMinutes;
                let endTotalMinutes = endHours * 60 + endMinutes;

                // If the end time is before the start time, assume it's the next day
                if (endTotalMinutes < startTotalMinutes) {
                    endTotalMinutes += 24 * 60;
                }

                // Calculate the difference in minutes and add it to the total
                totalMinutes += (endTotalMinutes - startTotalMinutes);
            }
        }

        // Convert total minutes back to HHMM format
        const totalHours = Math.floor(totalMinutes / 60);
        const remainingMinutes = totalMinutes % 60;

        // Format the result as HHMM
        const flightTimeString = `${String(totalHours).padStart(2, '0')}.${String(remainingMinutes).padStart(2, '0')}`;

        // Update the #flightTime element
        document.getElementById("flightTime").value = flightTimeString;
    }

    // Attach the calculation to the input event on the time fields
    document.querySelectorAll("[id^=times]").forEach(input => {
        input.addEventListener('input', calculateFlightTime);
    });
});
