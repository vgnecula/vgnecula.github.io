function closeModal() {
    const modalOverlay = document.getElementById('modal-overlay');

    // Remove overflow: hidden to allow scrolling
    document.body.style.overflow = '';

    // Get the saved scroll position and set it back
    const scrollPosition = parseInt(document.body.style.top, 10) || 0;
    document.body.style.top = '';

    // Hide the modal overlay
    modalOverlay.style.display = 'none';

   
}


document.addEventListener('DOMContentLoaded', function () {
    const folders = document.querySelectorAll('.folder');

    folders.forEach(folder => {
        folder.addEventListener('click', handleFolderClick);
    });

    function handleFolderClick(event) {
        const folderId = event.currentTarget.id;
        const sectionContent = document.getElementById(folderId.replace('-folder', '')).innerHTML;
        openModal(sectionContent);
    }

    // Function to open the modal
    function openModal(content) {
        const modalOverlay = document.getElementById('modal-overlay');
        const modalContent = document.getElementById('modal-content');
        modalContent.innerHTML = content;
        modalOverlay.style.display = 'block';

        // Save the current scroll position
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        // Apply overflow: hidden to the body to prevent scrolling
        document.body.style.overflow = 'hidden';

        // Set the saved scroll position back
        document.body.style.top = `-${scrollPosition}px`;
    }

    // Function to close the modal

});
