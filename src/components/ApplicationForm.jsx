import { useState } from "react"

function ApplicationForm({ addApplication }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    jobLink: "",
    salary: "",
    status: "saved"
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!formData.company.trim() || !formData.role.trim()) {
        alert("Company and role are required.")
        return
    }

    const newApplication = {
        company: formData.company,
        role: formData.role,
        platform: "Manual entry",
        status: formData.status,
        priority: "medium",
        jobType: "Not set",
        location: "Not set",
        remotePolicy: "Not set",
        salary: formData.salary || "Not listed",
        dateApplied: formData.status === "applied"
        ? new Date().toISOString().split("T")[0]
        : "",
        followUpDate: "",
        cvUsed: "",
        portfolioIncluded: false,
        jobLink: formData.jobLink,
        notes: formData.jobLink
        ? `Added manually from ${formData.jobLink}`
        : "Added manually through the tracker form.",
        skills: ["Manual entry"]
    }

    const wasAdded = await addApplication(newApplication)

    if (!wasAdded) {
      return
    }

    setFormData({
        company: "",
        role: "",
        jobLink: "",
        salary: "",
        status: "saved"
    })
  }


  return (
    <section className="application-form">
      <h2>Add application</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="company">Company</label>
            <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Monzo"
            />

            <label htmlFor="role">Role</label>
            <input 
                id="role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Junior Software Developer"
            />

            <label htmlFor="jobLink">Job link</label>
            <input 
                id="jobLink"
                name="jobLink"
                type="url"
                value={formData.jobLink}
                onChange={handleChange}
                placeholder="https://example.com/job"
            />

            <label htmlFor="salary">Salary</label>
            <input 
                id="salary"
                name="salary"
                type="text"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. £30,000 - £40,000"
            />

            <label htmlFor="status">Status</label>
            <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
            >
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
            </select>

            <button type="submit">Add application</button>

        </form>

            <p>Company preview: {formData.company}</p>
            <p>Role preview: {formData.role}</p>
            <p>Job Link preview: {formData.jobLink}</p>
            <p>Salary preview: {formData.salary}</p>
            <p>Status preview: {formData.status}</p>
    </section>
  )
}

export default ApplicationForm