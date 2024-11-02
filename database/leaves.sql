-- INSERT LEAVES (parameters provided by init.js) -- 
WITH employee_id AS (
    SELECT
        $1::uuid AS id_1,
        $2::uuid AS id_2,
        $3::uuid AS id_3
)

INSERT INTO leaves (type, date_start, date_end, status, leave_reason, rejection_reason, applier_id, approver_id)
VALUES 
    ('Vacation', '2024-03-01', '2024-03-05', 'Approved', 'Family vacation', NULL, (SELECT id_3 FROM employee_id), NULL),
    ('Sick Leave', '2024-03-10', '2024-03-12', 'Approved', 'Flu symptoms', NULL, (SELECT id_1 FROM employee_id), NULL),
    ('Personal Leave', '2024-03-15', '2024-03-17', 'Rejected', 'Personal matters', 'Insufficient notice', (SELECT id_2 FROM employee_id), NULL),
    ('Vacation', '2024-03-20', '2024-03-22', 'Pending', 'Vacation plans', NULL, (SELECT id_3 FROM employee_id), NULL),
    ('Sick Leave', '2024-03-25', '2024-03-27', 'Approved', 'Need to rest', NULL, (SELECT id_1 FROM employee_id), NULL);
