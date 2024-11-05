document.addEventListener('DOMContentLoaded', fetchEmployees);

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
                const data = await response.json();
                console.log(data);
                const employeesContainer = document.getElementById("employeeContainer");
                if (!employeeContainer) {
                    console.error('Employees container not found.');
                    return;
                }
                employeeContainer.innerHTML = ''; // Clear previous content

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
                        
                        // Add onclick listener to postElement
                        employeeCard.addEventListener('click', () => {
                            window.location.href = `directory-personal.html?employeeId=${employee.employeeId}`;
                            console.log("success")
                        });
                        employeesContainer.appendChild(employeeCard);
                    });
                } else {
                    const message = document.createElement('p');
                    message.textContent = 'No employees found.';
                    employeesContainer.appendChild(message);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };



        