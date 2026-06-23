import StatusBadge from "./StatusBadge"

function JobCard({ job }) {
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

            <p className="job-notes">{job.notes}</p>

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