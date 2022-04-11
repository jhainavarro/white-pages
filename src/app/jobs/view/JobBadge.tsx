import React from "react";
import { Badge, BadgeProps } from "shared/components";
import { Job } from "../job.models";

type JobBadgeProps = BadgeProps & {
  job: Job;
};

export function JobBadge({ job, ...props }: JobBadgeProps) {
  return (
    <Badge color={job.color} size="sm" variant="outline" {...props}>
      {job.name}
    </Badge>
  );
}
