-- INSERT EXPENSES (parameters provided by init.js) --
WITH employee_id AS (
    SELECT
        $1::uuid AS id_1,
        $2::uuid AS id_2,
        $3::uuid AS id_3
)

INSERT INTO expenses (type, date_of_expense, amount, status, expense_reason, applier_id, approver_id, supporting_document_path, rejection_reason)
VALUES 
    ('Travel', '2024-01-10', 250.00, 'Approved', 'Business trip to client meeting', (SELECT id_1 FROM employee_id), NULL, 'path/to/supporting_doc1.pdf', NULL),
    ('Office Supplies', '2024-01-15', 75.50, 'Approved', 'Purchase of office supplies', (SELECT id_2 FROM employee_id), NULL, 'path/to/supporting_doc2.pdf', NULL),
    ('Food & Drinks', '2024-01-20', 150.75, 'Rejected', 'Team lunch', (SELECT id_3 FROM employee_id), NULL, 'path/to/supporting_doc3.pdf', 'Exceeded budget'),
    ('Training', '2024-01-25', 500.00, 'Pending', 'Attending a training seminar', (SELECT id_1 FROM employee_id), NULL, 'path/to/supporting_doc4.pdf', NULL),
    ('Travel', '2024-02-01', 300.00, 'Approved', 'Travel for conference', (SELECT id_2 FROM employee_id), NULL, 'path/to/supporting_doc5.pdf', NULL);