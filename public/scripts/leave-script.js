const fileInput = document.getElementById('upload');
const fileLabel = document.querySelector('.custom-file-label');
const fileNameDisplay = document.querySelector('.file-name');

fileInput.addEventListener('change', function() {
    const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'No file chosen';
    fileLabel.textContent = 'Upload Documents'; // Keep the label static
    fileNameDisplay.textContent = fileName; // Update the span with the file name
});

document.getElementById("leave-form").addEventListener("submit", function(event) {
    // Prevent default form submission
    event.preventDefault();

    // Get all input elements
    const leaveType = document.getElementById("leave-type").value;
    const approver = document.getElementById("approver").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const reason = document.getElementById("reason").value;

    // Check if all required fields are filled
    if (!leaveType || !approver || !startDate || !endDate || !reason === 0) {
        alert("Please fill out all required fields before submitting the form.");
    } else {
        // Show overlay and prevent form from submitting
        document.getElementById("overlay").classList.remove("hidden");
        
        // Clear the form fields
        document.getElementById("expense-form").reset();

        // Optional: Redirect to another page after a short delay (e.g., 5 seconds)
        setTimeout(() => {
            window.location.href = "your-new-page.html"; // Replace with your desired URL
        }, 5000);
    }
});