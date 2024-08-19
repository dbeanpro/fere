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