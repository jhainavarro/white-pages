import { Avatar, Modal } from "shared/components";
import { Employee } from "../employee.models";
import { useDeleteEmployee } from "../employees.api";
import { useStyles } from "./ConfirmDeleteEmployee.styles";

interface ConfirmDeleteEmployeeProps {
  employee?: Employee;
  open?: boolean;
  onDelete: () => void;
  onClose: () => void;
}

export function ConfirmDeleteEmployee({
  employee,
  open,
  onDelete,
  onClose,
}: ConfirmDeleteEmployeeProps) {
  const { classes } = useStyles();
  const { mutate: deleteEmployee } = useDeleteEmployee();

  function handleDelete(e: Employee) {
    deleteEmployee(e.id);
    onDelete();
  }

  return employee ? (
    <Modal
      opened={!!open}
      onClose={onClose}
      withCloseButton={false}
      primaryButton={{
        label: "Yes, delete",
        color: "red",
        onClick: () => handleDelete(employee),
      }}
    >
      <div className={classes.content}>
        <Avatar src={employee.avatarUrl} size="xl" className={classes.avatar} />
        <p className={classes.text}>
          <span>Are you sure you want to delete</span>
          <span className={classes.name}>{employee.name}?</span>
          <span className={classes.subtext}>This action cannot be undone</span>
        </p>
      </div>
    </Modal>
  ) : (
    <></>
  );
}
