const fileInput = document.getElementById('upload');
const fileLabel = document.querySelector('.custom-file-label');
const fileNameDisplay = document.querySelector('.file-name');

fileInput.addEventListener('change', function() {
    const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'No file chosen';
    fileLabel.textContent = 'Upload Documents'; // Keep the label static
    fileNameDisplay.textContent = fileName; // Update the span with the file name
});

document.getElementById("expense-form").addEventListener("submit", function(event) {
    // Prevent default form submission
    event.preventDefault();

    // Get all input elements
    const expenseType = document.getElementById("expense-type").value;
    const approver = document.getElementById("approver").value;
    const date = document.getElementById("date").value;
    const amount = document.getElementById("amount").value;
    const reason = document.getElementById("reason").value;

    // Check if all required fields are filled
    if (!expenseType || !approver || !date || !amount || !reason === 0) {
        alert("Please fill out all required fields before submitting the form.");
    } else {

        // Prepare the form data to send to the server
        const formData = new FormData();
        formData.append("expenseType", expenseType);
        formData.append("approver", approver);
        formData.append("date", date);
        formData.append("amount", amount);
        formData.append("reason", reason);

        try {
        // Send the POST request to the server endpoint
        const response = await fetch("https://your-endpoint-url.com/api/submit-expense", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            // Show overlay and reset form
            document.getElementById("overlay").classList.remove("hidden");
            document.getElementById("expense-form").reset();
            fileNameDisplay.textContent = "No file chosen"; // Reset file name display

            // Optional: Redirect after a delay
            setTimeout(() => {
                window.location.href = "your-new-page.html"; // Replace with the desired URL
            }, 5000);
        } else {
            alert("There was an error submitting the form. Please try again.");
        }
    } catch (error) {
        console.error("Error submitting the form:", error);
        alert("An error occurred. Please check your connection and try again.");
    }
}});