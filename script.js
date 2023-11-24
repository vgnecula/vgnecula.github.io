// script.js
const canvas = document.getElementById('pixelCanvas');
const ctx = canvas.getContext('2d');
const pixelSize = 10;
const pixels = [];
const nameText = "Vladimir Necula";
const subtitleText = "Student @ Lafayette College";

// Initialize canvas size
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
    requestAnimationFrame(render);
}

function drawText(text, x, y, opacity) {
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.font = '20px Courier New';
    ctx.fillText(text, x, y);
}

function animateText(text, x, y, opacity) {
    let index = 0;

    function typeNextLetter() {
        if (index < text.length) {
            drawText(text.substring(0, index + 1), x, y, opacity);
            index++;
            setTimeout(typeNextLetter, 100); // Adjust the typing speed by changing the timeout
        }
    }

    typeNextLetter();
}

// Set initial opacity to 0
const nameElement = document.getElementById('name');
const subtitleElement = document.getElementById('subtitle');
nameElement.style.opacity = 0;
subtitleElement.style.opacity = 0;

// Start animations
animate(); // Start pixel animation
setTimeout(() => animateText(nameText, canvas.width / 2 - 80, canvas.height / 2 - 20, 1), 1000);
setTimeout(() => animateText(subtitleText, canvas.width / 2 - 80, canvas.height / 2 + 20, 1), 2000);
render();
