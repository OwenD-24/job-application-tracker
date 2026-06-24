function JobDetailsModal({ job, onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="job-modal" onClick={(event) => event.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    Close
                </button>

                <h2>{job.company}</h2>
                <h3>{job.role}</h3>

                <p><strong>Status:</strong> {job.status}</p>
                <p><strong>Priority:</strong> {job.priority}</p>
                <p><strong>Platform:</strong> {job.platform}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Remote policy:</strong> {job.remotePolicy}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Follow-up:</strong> {job.followUpDate || "no follow-up set"}</p>
            </div>
        </div>
    )
}

export default JobDetailsModal