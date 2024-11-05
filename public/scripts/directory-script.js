document.addEventListener('DOMContentLoaded', fetchEmployees);
const employee = JSON.parse(sessionStorage.getItem("employee"));
console.log(employee);
document.getElementById("profile-name").innerHTML = employee.name;
document.getElementById("profile-email").innerHTML = employee.email;

let employeesData = []; // Global variable to hold employee data

async function fetchEmployees() {
    try {
        const response = await fetch("/employee"); // Correct endpoint
        if (!response.ok) {
            throw new Error(`Failed to fetch employees: ${response.status} ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Expected JSON response from server');
        }
        employeesData = await response.json(); // Store fetched data in the global variable
        console.log(employeesData);
        renderEmployees(employeesData); // Render employees initially
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
}

// Function to render employees
function renderEmployees(data) {
    const employeesContainer = document.getElementById("employeeContainer");
    if (!employeesContainer) {
        console.error('Employees container not found.');
        return;
    }
    employeesContainer.innerHTML = ''; // Clear previous content

    if (Array.isArray(data) && data.length > 0) {
        data.forEach(employee => {
            const employeeCard = document.createElement('a');
            employeeCard.classList.add('employee-card');

            employeeCard.innerHTML = `
                <div class="employee-photo"></div>
                <div class="employee-info">
                    <h3>${employee.name}</h3>
                    <p>${employee.email}</p>
                    <p>${employee.title}</p>
                </div>
            `;
            
            // Add onclick listener to employeeCard
            employeeCard.addEventListener('click', () => {
                window.location.href = `directory-personal.html?employeeId=${employee.employeeId}`;
                console.log("success");
            });
            employeesContainer.appendChild(employeeCard);
        });
    } else {
        const message = document.createElement('p');
        message.textContent = 'No employees found.';
        employeesContainer.appendChild(message);
    }
}

// Event listener for the search bar
document.getElementById('search-bar').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase(); // Get the search term
    const filteredEmployees = employeesData.filter(employee => 
        employee.name.toLowerCase().includes(searchTerm) || // Search by name
        employee.email.toLowerCase().includes(searchTerm) || // Search by email
        employee.title.toLowerCase().includes(searchTerm) // Search by title
    );
    renderEmployees(filteredEmployees); // Render filtered employees
});
