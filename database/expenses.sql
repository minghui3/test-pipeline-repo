-- INSERT EXPENSES (parameters provided by init.js) --
WITH employee_id AS (
    SELECT
        $1::uuid AS id_1,
        $2::uuid AS id_2,
        $3::uuid AS id_3
)

INSERT INTO expenses (type, date_of_expense, amount, status, expense_reason, supporting_document_path, rejection_reason, applier_id, approver_id)
VALUES 
    ('Travel', '2024-01-10', 250.00, 'Approved', 'Business trip to client meeting', 'path/to/supporting_doc1.pdf', NULL, (SELECT id_1 FROM employee_id), NULL),
    ('Office Supplies', '2024-01-15', 75.50, 'Approved', 'Purchase of office supplies', 'path/to/supporting_doc2.pdf', NULL, (SELECT id_2 FROM employee_id), NULL),
    ('Food & Drinks', '2024-01-20', 150.75, 'Rejected', 'Team lunch', 'path/to/supporting_doc3.pdf', 'Exceeded budget', (SELECT id_3 FROM employee_id), NULL),
    ('Training', '2024-01-25', 500.00, 'Pending', 'Attending a training seminar', 'path/to/supporting_doc4.pdf', NULL, (SELECT id_1 FROM employee_id), NULL),
    ('Travel', '2024-02-01', 300.00, 'Approved', 'Travel for conference', 'path/to/supporting_doc5.pdf', NULL, (SELECT id_2 FROM employee_id), NULL);