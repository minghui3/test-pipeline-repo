const fileInput = document.getElementById('upload');
const fileLabel = document.querySelector('.custom-file-label');
const fileNameDisplay = document.querySelector('.file-name');

fileInput.addEventListener('change', function() {
    const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'No file chosen';
    fileLabel.textContent = 'Upload Documents'; // Keep the label static
    fileNameDisplay.textContent = fileName; // Update the span with the file name
});
