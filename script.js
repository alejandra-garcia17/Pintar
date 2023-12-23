document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const colorPicker = document.getElementById("colorPicker");
    const brushSizeSlider = document.getElementById("brushSize");
    const eraserButton = document.getElementById("eraser");
    const clearButton = document.getElementById("clear");

    // Establecer el tamaño del lienzo
    canvas.width = 800;
    canvas.height = 600;

    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        context.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        context.lineWidth = brushSizeSlider.value;
        context.lineCap = "round";

        if (eraserButton.checked) {
            context.strokeStyle = "#fff"; // Color blanco para el borrador
        } else {
            context.strokeStyle = colorPicker.value; // Obtener el color del selector
        }

        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    // Event listeners para el mouse o la pantalla táctil
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);

    canvas.addEventListener("touchstart", startPosition);
    canvas.addEventListener("touchend", endPosition);
    canvas.addEventListener("touchmove", draw);

    // Limpiar el lienzo
    clearButton.addEventListener("click", function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });
});
