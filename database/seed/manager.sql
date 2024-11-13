-- INSERT MANAGERS --
INSERT INTO employees (password, name, email, contact_number, department, title, work_location, date_joined, annual_leave_remaining, linked_in, skills, photo_path, languages, manager)
VALUES 
    ('epassword','Alice Johnson', 'alice.johnson@example.com', '123-456-7890', 'Sales', 'Sales Manager', 'New York', '2020-01-15', 10, 'https://linkedin.com/in/alicejohnson', 'Sales, Negotiation', NULL, 'English, Spanish', NULL),
    ('epassword','Diana Prince', 'diana.prince@example.com', '456-789-0123', 'HR', 'HR Manager', 'New York', '2018-05-14', 8, 'https://linkedin.com/in/dianaprince', 'Recruitment, Employee Relations', NULL, 'English, German', NULL),
    ('epassword','Clark Clent', 'superman@dailyplanet.com', '123-123-1234', 'IT', 'IT Manager', 'Old York', '2000-01-01', 12, 'https://linkedin.com/in/thereisnowaythisistaken', NULL, NULL, 'English, English', NULL )
RETURNING employee_id;