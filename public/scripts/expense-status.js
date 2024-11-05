document.addEventListener('DOMContentLoaded', fetchExpenseStatus);
const employee = JSON.parse(sessionStorage.getItem("employee"));
console.log(employee);
document.getElementById("profile-name").innerHTML = employee.name;
document.getElementById("profile-email").innerHTML = employee.email;
const tempEmployeeId = employee.employeeId;

async function fetchExpenseStatus() {
    try {
        console.log("Fetching expense for employee ID:", tempEmployeeId);
        const response = await fetch(`/expense?applierId=${tempEmployeeId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch expense: ${response.status} ${response.statusText}`);
        }

        const expenseData = await response.json();
        console.log("Fetched expense data:", expenseData);

        // Pass the fetched data to populate the kanban columns
        populateKanbanColumns(expenseData);
    } catch (error) {
        console.error('Error fetching leaves:', error);
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
        const expensesCard = document.createElement('div');
        expensesCard.classList.add('card');
        expensesCard.innerHTML = `
            <strong>Leave ID ${expense.expenseId}</strong><br>
            ${expense.expenseReason ? expense.expenseReason : ''}<br>
            Amount: ${expense.amount}<br>
        `;

        if (expense.status === 'Approved') {
            approvedColumn.appendChild(expensesCard);
        } else if (expense.status === 'Pending') {
            pendingColumn.appendChild(expensesCard);
        } else if (expense.status === 'Rejected') {
            expensesCard.innerHTML += `<br>Reason: ${expense.rejectionReason ? expense.rejectionReason : 'No reason provided'}`;
            rejectedColumn.appendChild(expensesCard);
        }
    });
}
