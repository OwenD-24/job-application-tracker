import { useState } from "react"
import JobDetailsModal from "./JobDetailsModal"
import StatusBadge from "./StatusBadge"

function JobCard({ job, showNotes, updateApplicationStatus }) {
    const [showDetails, setShowDetails] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

    async function handleStatusChange(event) {
        const newStatus = event.target.value

        if (newStatus === job.status) {
            return
        }

        setIsUpdatingStatus(true)

        await updateApplicationStatus(job, newStatus)

        setIsUpdatingStatus(false)
    }
        return (
            <article className="job-card">
                <div className="job-card-header">
                    <div>
                        <h2>{job.company}</h2>
                        <h3>{job.role}</h3>
                    </div>

                    <div className="status-controls">
                        <StatusBadge status={job.status} />

                        <select
                            className="status-select"
                            value={job.status}
                            onChange={handleStatusChange}
                            disabled={isUpdatingStatus}
                        >
                            <option value="saved">Saved</option>
                            <option value="applied">Applied</option>
                            <option value="interview">Interview</option>
                            <option value="rejected">Rejected</option>
                            <option value="no-response">No response</option>
                        </select>
                    </div>
                </div>

                <div className="job-meta">    
                    <p>{job.platform}</p>
                    <p>{job.location}</p>
                    <p>{job.salary}</p>
                </div>

                {showNotes && <p className="job-notes">{job.notes}</p>}

                <button
                    className="details-toggle"
                    onClick={() => setShowDetails((prevShowDetails) => !prevShowDetails)}
                >
                    {showDetails ? "Hide details" : "Show details"}
                </button>

                {showDetails && (
                    <div className="job-details">
                        <p><strong>Priority:</strong> {job.priority}</p>
                        <p><strong>Job type:</strong> {job.jobType}</p>
                        <p><strong>Remote policy:</strong> {job.remotePolicy}</p>
                        <p><strong>Date applied:</strong> {job.dateApplied || "Not applied yet"}</p>
                        <p><strong>Follow-up:</strong> {job.followUpDate || "No follow-up set"}</p>
                        <p><strong>CV used:</strong> {job.cvUsed || "No CV recorded"}</p>
                        <p><strong>Portfolio included:</strong> {job.portfolioIncluded ? "Yes" : "No"}</p>
                    </div>
                )}

                <button
                    className="modal-open"
                    onClick={() => setIsModalOpen(true)}
                >
                    Open modal
                </button>

                <div className="skills-list">
                    {job.skills.map((skill) => (
                        <span className="skill-chip" key={skill}>
                            {skill}
                        </span>
                    ))}
                </div>

                {isModalOpen && (
                    <JobDetailsModal
                        job={job}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </article>
        )
}

export default JobCard