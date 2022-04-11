import { Modal } from "shared/components";
import { ReactComponent as TrashIcon } from "shared/icons/trash-colored.svg";
import { Job } from "../job.models";
import { useDeleteJob } from "../jobs.api";
import { useStyles } from "./ConfirmDeleteJob.styles";

interface ConfirmDeleteJobProps {
  job?: Job;
  open?: boolean;
  onDelete: () => void;
  onClose: () => void;
}

export function ConfirmDeleteJob({
  job,
  open,
  onDelete,
  onClose,
}: ConfirmDeleteJobProps) {
  const { classes } = useStyles();
  const { mutate: deleteJob } = useDeleteJob();

  function handleDelete(j: Job) {
    deleteJob(j.id);
    onDelete();
  }

  return job ? (
    <Modal
      opened={!!open}
      onClose={onClose}
      withCloseButton={false}
      primaryButton={{
        label: "Yes, delete",
        color: "red",
        onClick: () => handleDelete(job),
      }}
    >
      <div className={classes.content}>
        <TrashIcon className={classes.trash} />
        <p className={classes.text}>
          <span>Are you sure you want to delete</span>
          <span className={classes.name}>{job.name}?</span>
          <span className={classes.subtext}>This action cannot be undone</span>
        </p>
      </div>
    </Modal>
  ) : (
    <></>
  );
}
