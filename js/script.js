// textArea dynamics:
document.addEventListener("DOMContentLoaded", function() {

    function adjustHeight(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', () => adjustHeight(textarea));
    })
})

function reveal(elID) {
    let target = document.getElementById(elID);

    target.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", function() {

    function scaleTable() {
        const wrap = document.getElementById("wrap");
        const table = wrap.querySelector("table");
        const wrapWidth = wrap.clientWidth;
        const tableWidth = table.scrollWidth;

        if (tableWidth > wrapWidth) {
            let scale = wrapWidth / tableWidth;
            table.style.transform = `scale(${scale})`;
        }
        else {
            table.style.transform = `scale(1)`;
        }
    }

    scaleTable();
    window.addEventListener('resize', scaleTable);
})