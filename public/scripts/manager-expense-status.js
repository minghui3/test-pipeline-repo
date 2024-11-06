document.addEventListener('DOMContentLoaded', fetchExpenseStatus);
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
    newTab.innerHTML = `<a href="manager-expense-status.html">Manager Approval</a>`; // Set the inner HTML (link) for the new tab
    tabs.appendChild(newTab); // Append the new span to the tabs
}

async function fetchExpenseStatus() {
    try {
        console.log("Fetching all expenses");
        const response = await fetch(`/all-expense`); // Fetch all expenses
        if (!response.ok) {
            throw new Error(`Failed to fetch expenses: ${response.status} ${response.statusText}`);
        }

        const expenseData = await response.json();
        console.log("Fetched expense data:", expenseData);

        // Pass the fetched data to populate the kanban columns
        populateKanbanColumns(expenseData);
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
}

function populateKanbanColumns(expenses) {
    const approvedColumn = document.getElementById("approved-column");
    const pendingColumn = document.getElementById("pending-column");
    const rejectedColumn = document.getElementById("rejected-column");

    approvedColumn.innerHTML = '<h3>Approved</h3>';
    pendingColumn.innerHTML = '<h3>Pending</h3>';
    rejectedColumn.innerHTML = '<h3>Rejected</h3>';

    expenses.forEach(expense => {
        const expenseCard = document.createElement('div');
        expenseCard.classList.add('card');
        console.log(expense.expenseId)
        expenseCard.innerHTML = `
            <strong>Expense ID: ${expense.expenseId}</strong><br>
            Reason: ${expense.expenseReason ? expense.expenseReason : 'No reason provided'}<br>
            Amount: $${expense.amount}<br>
            Status: ${expense.status}<br>
            <button onclick="approveExpense('${expense.expenseId}')" style="margin: 5px; padding: 5px;">Approve</button>
            <button onclick="rejectExpense('${expense.expenseId}')" style="margin: 5px; padding: 5px;">Reject</button>
        `;

        if (expense.status === 'Approved') {
            approvedColumn.appendChild(expenseCard);
        } else if (expense.status === 'Pending') {
            pendingColumn.appendChild(expenseCard);
        } else if (expense.status === 'Rejected') {
            expenseCard.innerHTML += `<br>Reason: ${expense.rejectionReason ? expense.rejectionReason : 'No reason provided'}`;
            rejectedColumn.appendChild(expenseCard);
        }
    });
}

async function approveExpense(expenseId) {
    try {
        const response = await fetch(`/expense/${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Approved' }), // Send the new status
        });

        if (!response.ok) {
            throw new Error(`Failed to approve expense: ${response.status} ${response.statusText}`);
        }

        const updatedExpense = await response.json();
        console.log("Expense approved:", updatedExpense);

        // Optionally refresh the expense status after approving
        fetchExpenseStatus();
    } catch (error) {
        console.error('Error approving expense:', error);
    }
}

async function rejectExpense(expenseId) {
    try {
        const response = await fetch(`/expense/${expenseId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Rejected' }), // Send the new status
        });

        if (!response.ok) {
            throw new Error(`Failed to reject expense: ${response.status} ${response.statusText}`);
        }

        const updatedExpense = await response.json();
        console.log("Expense rejected:", updatedExpense);

        // Optionally refresh the expense status after rejecting
        fetchExpenseStatus();
    } catch (error) {
        console.error('Error rejecting expense:', error);
    }
}
