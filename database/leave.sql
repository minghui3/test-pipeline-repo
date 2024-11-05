-- INSERT LEAVES (parameters provided by init.js) -- 
WITH employee_id AS (
    SELECT
        $1::uuid AS id_1,
        $2::uuid AS id_2,
        $3::uuid AS id_3
)

INSERT INTO leaves (type, date_start, date_end, status, applier_id, approver_id, leave_reason,supporting_document_path, rejection_reason)
VALUES 
    ('Vacation', '2024-03-01', '2024-03-05', 'Approved', (SELECT id_3 FROM employee_id), NULL, 'Family vacation','path/to/supporting_doc1.pdf', NULL),
    ('Sick Leave', '2024-03-10', '2024-03-12', 'Approved', (SELECT id_1 FROM employee_id), NULL, 'Flu symptoms','path/to/supporting_doc1.pdf', NULL),
    ('Personal Leave', '2024-03-15', '2024-03-17', 'Rejected', (SELECT id_2 FROM employee_id), NULL, 'Personal matters','path/to/supporting_doc1.pdf', 'Insufficient notice'),
    ('Vacation', '2024-03-20', '2024-03-22', 'Pending', (SELECT id_3 FROM employee_id), NULL, 'Vacation plans','path/to/supporting_doc1.pdf', NULL),
    ('Sick Leave', '2024-03-25', '2024-03-27', 'Approved', (SELECT id_1 FROM employee_id), NULL, 'Need to rest','path/to/supporting_doc1.pdf', NULL);
