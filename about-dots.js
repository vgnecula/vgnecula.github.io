// script.js

document.addEventListener('DOMContentLoaded', function () {
    // ... Your existing code ...

    const aboutTitle = document.querySelector('.about-title');

    function animateLoadingDots() {
        let dots = 0;
        const maxDots = 4;

        function updateTitle() {
            
            if(dots!=0)
            aboutTitle.textContent = 'About' + '.'.repeat(dots-1);
            
            dots = (dots % maxDots)+1;
            console.log(dots);
        }

        setInterval(updateTitle, 500); // Adjust the interval as needed
    }

    // Start the loading animation
    animateLoadingDots();

    // ... Your existing code ...
});