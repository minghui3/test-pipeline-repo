document.addEventListener("DOMContentLoaded", fetchEmployeeProfile);

async function fetchEmployeeProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get("employeeId");

    try {
        // Fetch the data for one employee
        const response = await fetch(`/employee/${employeeId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch employee: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        document.getElementById("employeeProfileContainer").innerHTML = "";
        document.getElementById("about-section").innerHTML = "";

       document.getElementById("employeeProfileContainer").innerHTML = `
                <div class="profile-photo">
                    <img src="images/profile-photo.jpeg" alt="Employee Photo">
                </div>
                <div class="contact-info">
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Contact No:</strong> ${data.contactNumber}</p>
                </div>
            </div>
        `;

        // Update about section in the about section container
        document.getElementById("about-section").innerHTML = `
            <h2>About</h2>
            <table class="about-section-table">
                <tbody>
                    <tr>
                        <td><strong>Role:</strong> ${data.title}</td>
                        <td><p><strong>LinkedIn:</strong> <a href="${data.linkedIn}" target="_blank">${data.linkedIn}</a></p></td>
                    </tr>
                    <tr>
                        <td><strong>Department:</strong> ${data.department}</td>
                        <td><p><strong>Skills:</strong> ${data.skills}</p></td>
                    </tr>
                    <tr>
                        <td><strong>Location:</strong> ${data.workLocation}</td>
                        <td><p><strong>Hobbies:</strong> Reading, hiking, and photography</p></td>
                    </tr>
                    <tr>
                        <td><strong>Experience:</strong> ${data.experience}</td>
                        <td><p><strong>Languages:</strong> ${data.languages}</p></td>
                    </tr>
                </tbody>
            </table>
        `;

    } catch (error) {
        console.error("Error fetching employee profile:", error);
    }
}
