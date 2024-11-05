document.addEventListener('DOMContentLoaded', fetchLeaveStatus);
const employee = JSON.parse(sessionStorage.getItem("employee"));
console.log(employee);
document.getElementById("profile-name").innerHTML = employee.name;
document.getElementById("profile-email").innerHTML = employee.email;
const tempEmployeeId = employee.employeeId;

async function fetchLeaveStatus() {
    try {
        console.log("Fetching leaves for employee ID:", tempEmployeeId);
        const response = await fetch(`/leave?applierId=${tempEmployeeId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch leaves: ${response.status} ${response.statusText}`);
        }

        const leaveData = await response.json();
        console.log("Fetched leave data:", leaveData);

        // Pass the fetched data to populate the kanban columns
        populateKanbanColumns(leaveData);
    } catch (error) {
        console.error('Error fetching leaves:', error);
    }
}

function populateKanbanColumns(leaves) {
    const approvedColumn = document.getElementById("approved-column");
    const pendingColumn = document.getElementById("pending-column");
    const rejectedColumn = document.getElementById("rejected-column");

    approvedColumn.innerHTML = '<h3>Approved</h3>';
    pendingColumn.innerHTML = '<h3>Pending</h3>';
    rejectedColumn.innerHTML = '<h3>Rejected</h3>';

    leaves.forEach(leave => {
        const leaveCard = document.createElement('div');
        leaveCard.classList.add('card');
        leaveCard.innerHTML = `
            <strong>Leave ID ${leave.leaveId}</strong><br>
            ${leave.leaveReason ? leave.leaveReason : ''}<br>
            Start: ${leave.dateStart}<br>
            End: ${leave.dateEnd}
        `;

        if (leave.status === 'Approved') {
            approvedColumn.appendChild(leaveCard);
        } else if (leave.status === 'Pending') {
            pendingColumn.appendChild(leaveCard);
        } else if (leave.status === 'Rejected') {
            leaveCard.innerHTML += `<br>Reason: ${leave.rejectionReason ? leave.rejectionReason : 'No reason provided'}`;
            rejectedColumn.appendChild(leaveCard);
        }
    });
}
