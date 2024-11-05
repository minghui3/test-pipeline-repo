-- INSERT EMPLOYEES WITH MANAGERS (parameters provided in init.js) --
WITH managers_uuid AS (
    SELECT 
        $1::uuid AS id_1,
        $2::uuid AS id_2,
        $3::uuid AS id_3
)
INSERT INTO employees (password, name, email, contact_number, department, title, work_location, date_joined, annual_leave_remaining, linked_in, skills, photo_path, languages, manager)
VALUES 
('epassword','Bob Smith', 'bob.smith@example.com', '234-567-8901', 'Marketing', 'Marketing Specialist', 'Los Angeles', '2021-03-22', 15, 'https://linkedin.com/in/bobsmith', 'SEO, Content Marketing', NULL, 'English, French', (SELECT id_1 FROM managers_uuid)),
('epassword','Edward Elric', 'edward.elric@example.com', '567-890-1234', 'Finance', 'Financial Analyst', 'Chicago', '2022-02-01', 20, 'https://linkedin.com/in/edwardelric', 'Data Analysis, Financial Modeling', NULL, 'English, Japanese', (SELECT id_1 FROM managers_uuid)),
('epassword','Charlie Brown', 'charlie.brown@example.com', '345-678-9012', 'IT', 'Software Engineer', 'Remote', '2019-07-30', 12, 'https://linkedin.com/in/charliebrown', 'JavaScript, React', NULL, 'English', (SELECT id_2 FROM managers_uuid))
RETURNING employee_id;