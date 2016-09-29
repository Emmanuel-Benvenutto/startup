window.onload = function() {
    const mainCanvas = document.getElementById("main-canvas");
    const subCanvas = document.getElementById("sub-canvas");
    let mainContext = mainCanvas.getContext("2d");
    let pixelCont = 0;
    let shape = ["Square", "Rectangle", "Circle", "Triangle"];
    let shapeRandom;
    let subContext = subCanvas.getContext("2d");

    shapeRandom = shape[Math.floor(Math.random() * shape.length)];
    switch (shapeRandom) {
        case "Rectangle":
            mainContext.fillStyle = getRandomColor();
            mainContext.strokeStyle = getRandomColor();
            mainContext.fillRect((mainCanvas.width-100)/2, (mainCanvas.height-100)/2, 150, 100);
        break;

        case "Square":
            mainContext.fillStyle = getRandomColor();
            mainContext.strokeStyle = getRandomColor();
            mainContext.fillRect((mainCanvas.width-100)/2, (mainCanvas.height-100)/2, 100, 100);
        break;

        case "Circle":
            mainContext.fillStyle = getRandomColor();
            mainContext.strokeStyle = getRandomColor();
            mainContext.beginPath();
            mainContext.arc(mainCanvas.width/2, mainCanvas.height/2, 60, 0, 2*Math.PI);
            mainContext.stroke();
            mainContext.fill();
        break;

        case "Triangle":
            mainContext.fillStyle = getRandomColor();
            mainContext.strokeStyle = getRandomColor();
            mainContext.beginPath();
            mainContext.moveTo(mainCanvas.width/3, mainCanvas.height/3);
            mainContext.lineTo(mainCanvas.width/3, mainCanvas.height*2/3);
            mainContext.lineTo(mainCanvas.width*2/3, mainCanvas.height*2/3);
            mainContext.closePath();
            mainContext.stroke();
            mainContext.fill()
        break;
    }
    
    drawOnCanvas();

    function drawOnCanvas() {
        subContext.clearRect(0, 0, 600, 400);
        subContext.fillStyle = "blue";
        subContext.strokeStyle = "yellow";
        subContext.fillRect(50, 150, 150, 100);
        if (pixelCont < subCanvas.width/3) {
            subContext.translate(1, 0);
            pixelCont++;
            window.requestAnimationFrame(drawOnCanvas);
        }
    }

    function getRandomColor() {
        let letters = "0123456789ABCDEF";
        let color = "#";

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

