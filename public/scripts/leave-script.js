document.addEventListener('DOMContentLoaded', fetchManagers);
    const employee = JSON.parse(sessionStorage.getItem("employee"));
    console.log(employee);
    document.getElementById("profile-name").innerHTML = employee.name;
    document.getElementById("profile-email").innerHTML = employee.email;
    async function fetchManagers() {
        try {
            const response = await fetch("/manager"); // Correct endpoint
            if (!response.ok) {
                throw new Error(`Failed to fetch manager: ${response.status} ${response.statusText}`);
            }
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Expected JSON response from server');
            }
            const data = await response.json();
            console.log(data);

            const approverSelect = document.getElementById("approver");
            if (!approverSelect) {
                console.error('Approver select element not found.');
                return;
            }
            approverSelect.innerHTML = ''; // Clear previous content

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(manager => {
                const option = document.createElement('option');
                option.value = manager.employeeId; // Assuming `id` is a unique identifier for each manager
                option.textContent = manager.name; // Display manager name in dropdown
                approverSelect.appendChild(option);
            });
            } else {
                const message = document.createElement('p');
                message.textContent = 'No managers found.';
            }
            employeesContainer.appendChild(message);
            console.error('Error fetching managers:', error);
        } catch (error) {
        };
    }

const fileInput = document.getElementById('upload');
    const fileLabel = document.querySelector('.custom-file-label');
    const fileNameDisplay = document.querySelector('.file-name');

    fileInput.addEventListener('change', function() {
        const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'No file chosen';
        fileLabel.textContent = 'Upload Documents'; // Keep the label static
        fileNameDisplay.textContent = fileName; // Update the span with the file name
        });

document.getElementById("leave-form").addEventListener("submit", async function(event) {
    // Prevent default form submission
    event.preventDefault();

    // Get all input elements
    const leaveType = document.getElementById("leave-type").value;
    const approver = document.getElementById("approver").value;
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const reason = document.getElementById("reason").value;
    const fileInput = document.getElementById('upload'); // Get the file input
    let supportingDocumentPath = null;
    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name; // Get the name of the file
        supportingDocumentPath = `../images/${fileName}`; // Construct the relative path
    }
    
    const requestData = {
        type: leaveType,    
        dateStart: startDate,
        dateEnd: endDate,
        status: "Pending",       
        applierId: employee.employeeId,
        approverId: approver,
        leaveReason: reason,            
        supportingDocumentPath: supportingDocumentPath   
    };
    console.log(requestData)

    // Check if all required fields are filled
    if (!leaveType || !approver || !startDate || !endDate || !reason === 0) {
        alert("Please fill out all required fields before submitting the form.");
    } else {
        
        try {
        // Send the POST request to the server endpoint
        const response = await fetch('/leave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set content type for JSON
            },
            body: JSON.stringify(requestData) // Send data as JSON string
        });

        if (response.ok) {
            // Show overlay and reset form
            document.getElementById("overlay").classList.remove("hidden");
            document.getElementById("leave-form").reset();
            fileNameDisplay.textContent = "No file chosen"; // Reset file name display

            // Optional: Redirect after a delay
            setTimeout(() => {
                window.location.href = "leave-status.html"; // Replace with the desired URL
            }, 5000);
        } else {
            alert("There was an error submitting the form. Please try again.");
        }
    } catch (error) {
        console.error("Error submitting the form:", error);
        alert("An error occurred. Please check your connection and try again.");
    }
}});