import { useState } from "react"

const initialFormData = {
  company: "",
  role: "",
  platform: "",
  jobLink: "",
  status: "applied",
  priority: "",
  jobType: "",
  location: "",
  remotePolicy: "",
  salary: "",
  dateApplied: "",
  followUpDate: "",
  cvUsed: "",
  portfolioIncluded: true,
  notes: "",
  skillsText: ""
}

function ApplicationForm({ addApplication }) {
  const [formData, setFormData] = useState(initialFormData)

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (
      !formData.company.trim() ||
      !formData.role.trim() ||
      !formData.priority
    ) {
      alert("Company, role and priority are required.")
      return
    }

    const today = new Date().toISOString().split("T")[0]

    const skills = formData.skillsText
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "")

    const newApplication = {
      company: formData.company.trim(),
      role: formData.role.trim(),
      platform: formData.platform.trim() || "Not set",
      status: formData.status,
      priority: formData.priority,
      jobType: formData.jobType.trim() || "Not set",
      location: formData.location.trim() || "Not set",
      remotePolicy: formData.remotePolicy || "Not set",
      salary: formData.salary.trim() || "Not listed",

      dateApplied:
        formData.status === "saved"
          ? ""
          : formData.dateApplied || today,

      followUpDate: formData.followUpDate,
      cvUsed: formData.cvUsed.trim(),
      portfolioIncluded: formData.portfolioIncluded,
      jobLink: formData.jobLink.trim(),

      notes:
        formData.notes.trim() ||
        "Added manually through the tracker form.",

      skills
    }

    const wasAdded = await addApplication(newApplication)

    if (!wasAdded) {
      return
    }

    setFormData(initialFormData)
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

            <label htmlFor="platform">Platform</label>
            <input
              id="platform"
              name="platform"
              type="text"
              value={formData.platform}
              onChange={handleChange}
              placeholder="e.g. LinkedIn, Workable, direct email"
            />

            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="stretch">Stretch</option>
            </select> 

            <label htmlFor="jobType">Job type</label>
            <input
              id="jobType"
              name="jobType"
              type="text"
              value={formData.jobType}
              onChange={handleChange}
              placeholder="e.g. Full-time, Contract, Internship"
            />

            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Liverpool, Manchester, United Kingdom"
            />    

            <label htmlFor = "remotePolicy">Remote policy</label>
            <select
              id="remotePolicy"
              name="remotePolicy"
              value={formData.remotePolicy}
              onChange={handleChange}
            >
              <option value="">Select remote policy</option>
              <option value="Remote">Remote</option>
              <option value="Remote UK">Remote UK</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
              <option value="Flexible">Flexible</option>
            </select>

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

            <label htmlFor="dateApplied">Date applied</label>
            <input
              id="dateApplied"
              name="dateApplied"
              type="date"
              value={formData.dateApplied}
              onChange={handleChange}
            />

            <label htmlFor="followUpDate">Follow-up date</label>
            <input
              id="followUpDate"
              name="followUpDate"
              type="date"
              value={formData.followUpDate}
              onChange={handleChange}
            />

            <label htmlFor="cvUsed">CV used</label>
            <input
              id="cvUsed"
              name="cvUsed"
              type="text"
              value={formData.cvUsed}
              onChange={handleChange}
              placeholder="e.g. Owen-Davis-FullStack-CV.pdf"
            />

            <label htmlFor="portfolioIncluded">Portfolio included</label>
            <input
              id="portfolioIncluded"
              name="portfolioIncluded"
              type="checkbox"
              checked={formData.portfolioIncluded}
              onChange={handleChange}
            />

            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Add application notes, follow-up details or useful context"
            />

            <label htmlFor="skillsText">Skills</label>
            <input
              id="skillsText"
              name="skillsText"
              type="text"
              value={formData.skillsText}
              onChange={handleChange}
              placeholder="React, TypeScript, Python, SQL"
            />

            <button type="submit">Add application</button>

        </form>
    </section>
  )
}

export default ApplicationForm