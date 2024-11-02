-- SET TRIGGER --
CREATE OR REPLACE FUNCTION set_default_approver()
RETURNS TRIGGER AS $$
BEGIN 
    IF NEW.approver_id IS NULL THEN
        NEW.approver_id := (SELECT manager FROM employees WHERE employee_id = NEW.applier_id);
    END IF;
    RETURN NEW;
END;    
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER set_leave_trigger
BEFORE INSERT ON leaves
FOR EACH ROW 
EXECUTE FUNCTION set_default_approver();

CREATE OR REPLACE TRIGGER set__expense_trigger
BEFORE INSERT ON expenses
FOR EACH ROW 
EXECUTE FUNCTION set_default_approver();