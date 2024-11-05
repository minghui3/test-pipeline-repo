document.addEventListener('DOMContentLoaded', fetchLeaveStatus);
const employee = JSON.parse(sessionStorage.getItem("employee"));
console.log(employee);
document.getElementById("profile-name").innerHTML = employee.name;
document.getElementById("profile-email").innerHTML = employee.email;
const tempEmployeeId = employee.employeeId;

// Add a new span if employee.manager is null
if (employee.manager === null) {
    const tabs = document.getElementById('tabs'); // Select the tabs container
    const newTab = document.createElement('span'); // Create a new span
    newTab.className = 'active'; 
    newTab.innerHTML = `<a href="manager-leave-status.html">Manager Approval</a>`; // Set the inner HTML (link) for the new tab
    tabs.appendChild(newTab); // Append the new span to the tabs
}

async function fetchLeaveStatus() {
    try {
        console.log("Fetching all leaves");
        const response = await fetch(`/all-leave`); // Fetch all leaves
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
        console.log(leave.leaveId)
        leaveCard.innerHTML = `
            <strong>Leave ID: ${leave.leaveId}</strong><br>
            Reason: ${leave.leaveReason ? leave.leaveReason : 'No reason provided'}<br>
            Start Date: $${leave.dateStart}<br>
            End Date: $${leave.dateEnd}<br>
            Status: ${leave.status}<br>
            <button onclick="approveLeave('${leave.leaveId}')" style="margin: 5px; padding: 5px;">Approve</button>
            <button onclick="rejectLeave('${leave.leaveId}')" style="margin: 5px; padding: 5px;">Reject</button>
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

async function approveLeave(leaveId) {
    try {
        const response = await fetch(`/leave/${leaveId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Approved' }), // Send the new status
        });

        if (!response.ok) {
            throw new Error(`Failed to approve leave: ${response.status} ${response.statusText}`);
        }

        const updatedLeave = await response.json();
        console.log("Leave approved:", updatedLeave);

        // Optionally refresh the leave status after approving
        fetchLeaveStatus();
    } catch (error) {
        console.error('Error approving leave:', error);
    }
}

async function rejectLeave(leaveId) {
    try {
        const response = await fetch(`/leave/${leaveId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Rejected' }), // Send the new status
        });

        if (!response.ok) {
            throw new Error(`Failed to reject leave: ${response.status} ${response.statusText}`);
        }

        const updatedLeave = await response.json();
        console.log("Leave rejected:", updatedLeave);

        // Optionally refresh the leave status after rejecting
        fetchLeaveStatus();
    } catch (error) {
        console.error('Error rejecting leave:', error);
    }
}
