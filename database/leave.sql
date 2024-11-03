-- INSERT LEAVES (parameters provided by init.js) -- 
WITH employee_id AS (
    SELECT
        $1::uuid AS id_1,
        $2::uuid AS id_2,
        $3::uuid AS id_3
)

INSERT INTO leaves (type, date_start, date_end, status, applier_id, approver_id, leave_reason, rejection_reason)
VALUES 
    ('Vacation', '2024-03-01', '2024-03-05', 'Approved', (SELECT id_3 FROM employee_id), NULL, 'Family vacation', NULL),
    ('Sick Leave', '2024-03-10', '2024-03-12', 'Approved', (SELECT id_1 FROM employee_id), NULL, 'Flu symptoms', NULL),
    ('Personal Leave', '2024-03-15', '2024-03-17', 'Rejected', (SELECT id_2 FROM employee_id), NULL, 'Personal matters', 'Insufficient notice'),
    ('Vacation', '2024-03-20', '2024-03-22', 'Pending', (SELECT id_3 FROM employee_id), NULL, 'Vacation plans', NULL),
    ('Sick Leave', '2024-03-25', '2024-03-27', 'Approved', (SELECT id_1 FROM employee_id), NULL, 'Need to rest', NULL);
