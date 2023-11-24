// script.js
const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const pixelSize = 10;
const pixels = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize pixels with random positions and colors
for (let i = 0; i < 100; i++) {
    pixels.push({
        x: Math.random() * canvas.width / pixelSize,
        y: Math.random() * canvas.height / pixelSize,
        color: getRandomColor()
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

function animate() {
    // Update pixel colors or positions based on your animation logic
    pixels.forEach(pixel => {
        // Example: Change color randomly 
        pixel.color = getRandomColor();

        // Example: Move pixels to the right
        pixel.x += 0.1;

        // Reset pixel position when it goes off the screen
        if (pixel.x > canvas.width / pixelSize) {
            pixel.x = 0;
        }
    });
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw your animated pixels or background here
    pixels.forEach(pixel => {
        drawPixel(pixel.x, pixel.y, pixel.color);
    });

    // Draw text
    
    requestAnimationFrame(render);
}

function drawText(text, x, y) {
    ctx.fillStyle = '#fff';
    ctx.font = '20px Courier New';
    ctx.fillText(text, x, y);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

render();
