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

            <p>{job.platform}</p>
            <p>{job.location}</p>
            <p>{job.salary}</p>
            <p>{job.notes}</p>
        </article>
    )
}

export default JobCard