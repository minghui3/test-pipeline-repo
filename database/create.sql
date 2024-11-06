-- DELETE EXISTING TABLES --
DROP TABLE IF EXISTS employees, leaves, expenses;

-- RE-CREATE TABLES --
CREATE TABLE employees (
    employee_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    contact_number varchar(255) NOT NULL,
    department varchar(255) NOT NULL,
    title varchar(255) NOT NULL,
    work_location varchar(255) NOT NULL,
    date_joined date NOT NULL,
    annual_leave_remaining smallint NOT NULL CHECK (annual_leave_remaining >= 0),
    linked_in varchar(255) NULL,
    skills varchar(255) NULL,
    photo_path varchar(255) NULL,
    languages varchar(255) NULL,
    manager uuid NULL REFERENCES employees ON DELETE RESTRICT
);

CREATE TABLE expenses (
    expense_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type varchar(255) NOT NULL,
    date_of_expense date NOT NULL,
    amount numeric(10, 2) NOT NULL,
    status varchar(255) NOT NULL CHECK (status IN ('Approved', 'Rejected', 'Pending')),
    expense_reason varchar(255) NOT NULL,
    applier_id uuid NOT NULL REFERENCES employees ON DELETE CASCADE,
    approver_id uuid NOT NULL REFERENCES employees ON DELETE SET NULL, 
    supporting_document_path varchar(255) NULL,
    rejection_reason varchar(255) NULL
);

CREATE TABLE leaves (
    leave_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type varchar(255) NOT NULL,
    date_start date NOT NULL CHECK (date_start <= date_end),0
    date_end date NOT NULL,
    status varchar(255) NOT NULL CHECK (status IN ('Approved', 'Rejected', 'Pending')),
    applier_id uuid NOT NULL REFERENCES employees ON DELETE CASCADE,
    approver_id uuid NOT NULL REFERENCES employees ON DELETE SET NULL,
    leave_reason varchar(255) NULL,
    supporting_document_path varchar(255) NULL,
    rejection_reason varchar(255) NULL
);
