import { useState } from "react"
import StatusBadge from "./StatusBadge"

function JobCard({ job, showNotes }) {
    const [showDetails, setShowDetails] = useState(false)
        return (
            <article className="job-card">
                <div className="job-card-header">
                    <div>
                        <h2>{job.company}</h2>
                        <h3>{job.role}</h3>
                    </div>

                    <StatusBadge status={job.status} />
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

                <div className="skills-list">
                    {job.skills.map((skill) => (
                        <span className="skill-chip" key={skill}>
                            {skill}
                        </span>
                    ))}
                </div>
            </article>
        )
}

export default JobCard