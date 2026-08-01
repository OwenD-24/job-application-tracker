import type { JobStatus } from "../types/jobApplication"

type StatusBadgeProps = {
    status: JobStatus
}

function StatusBadge({ status }: StatusBadgeProps) {
    return <span className={`status-badge ${status}`}>{status}</span>
}

export default StatusBadge