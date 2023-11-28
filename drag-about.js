document.addEventListener('DOMContentLoaded', function () {
    // ... Your existing code ...

    // Make pixel windows draggable
    const pixelWindows = document.querySelectorAll('.pixel-window');
    pixelWindows.forEach(window => {
        Draggable.create(window, {
            type: 'x', // Only drag horizontally
            bounds: '.about-container', // Restrict dragging within the container
            edgeResistance: 0.65, // Add resistance when dragging towards the edge
        });
    });

    // ... Your existing code ...
});