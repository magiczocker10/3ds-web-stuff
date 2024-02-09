window.addEventListener("load", function(){
    const canvas = document.getElementById("canv");
    const ctx = canvas.getContext("2d");

    var brushSize = 10;

    var prevX = 0;
    var prevY = 0;

    var lastDraw = 0;

    function draw(x, y) {
        const now = Date.now();

        if(now - lastDraw < 100){
            drawLine(prevX, prevY, x, y);
        }
        lastDraw = now;
        prevX = x;
        prevY = y;
        justDraw(x, y);
    }

    function justDraw(x, y) {
        ctx.fillRect(x - brushSize/2, y - brushSize/2, brushSize, brushSize);
    }

    function drawLine(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const steps = Math.ceil(distance);

        const stepX = dx / steps;
        const stepY = dy / steps;

        for (let i=0; i<=steps; i++) {
            const x = x1 + stepX * i;
            const y = y1 + stepY * i;
            justDraw(x, y);
        }
    }


    function drawMouse(e) {
        if(e.buttons === 0) return;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;
        draw(x,y);
    }

    function drawTouch(e) {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const touch = e.touches[0];
        const x = (touch.clientX - rect.left) * scaleX;
        const y = (touch.clientY - rect.top) * scaleY;
        draw(x,y);
    }

    canvas.addEventListener("mousemove", drawMouse);
    canvas.addEventListener("touchmove",drawTouch);
    canvas.addEventListener("mousedown", drawMouse);

});