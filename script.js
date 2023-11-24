const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const pixels = [];

function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

function drawText(text, x, y) {
    ctx.fillStyle = '#fff';
    ctx.font = '20px Courier New';
    ctx.fillText(text, x, y);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function initializePixels() {
    for (let i = 0; i < 100; i++) {
        pixels.push({
            x: Math.random() * canvas.width / pixelSize,
            y: Math.random() * canvas.height / pixelSize,
            color: getRandomColor()
        });
    }
}

const pixelSize = Math.max(5, Math.min(15, Math.floor(window.innerWidth / 100)));

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

initializePixels();

function animate() {
    pixels.forEach(pixel => {
        pixel.color = getRandomColor();
        pixel.x += 0.1;
        if (pixel.x > canvas.width / pixelSize) {
            pixel.x = 0;
        }
    });
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pixels.forEach(pixel => {
        drawPixel(pixel.x, pixel.y, pixel.color);
    });

    drawText('Web Developer', canvas.width / 2 - 70, canvas.height / 2 + 20);

    requestAnimationFrame(render);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    pixels.length = 0;
    initializePixels();
    animate();
    render();
});

// Typing effect for the name
const nameElement = document.getElementById('title');
const nameText = "Vladimir Necula";
let nameIndex = 0;

function typeEffect() {
    if (nameIndex < nameText.length) {
        nameElement.textContent += nameText.charAt(nameIndex);
        nameIndex++;
        setTimeout(typeEffect, 100);
    }
}

typeEffect();
animate();
render();
