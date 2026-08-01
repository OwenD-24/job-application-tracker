import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import type {
  JobStatus,
  JobApplication
} from "../types/jobApplication"

type ApplicationFormData = {
  company: string
  role: string
  platform: string
  jobLink: string
  status: JobStatus
  priority: string
  jobType: string
  location: string
  remotePolicy: string
  salary: string
  dateApplied: string
  followUpDate: string
  cvUsed: string
  portfolioIncluded: boolean
  notes: string
  skillsText: string
}

type ValidationResult = {
  isValid: boolean
  message: string
}

const initialFormData: ApplicationFormData = {
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

type NewJobApplication = Omit<JobApplication, "id">

type ApplicationFormProps = {
  addApplication: (
    newApplication: NewJobApplication
  ) => Promise<boolean>
}

function validateForm(
  formData: ApplicationFormData
): ValidationResult {
  if (
    !formData.company.trim() ||
    !formData.role.trim() ||
    !formData.priority
  ) {
    return {
      isValid: false,
      message: "Company, role and priority are required."
    }
  }

  return {
    isValid: true,
    message: ""
  }
}

function ApplicationForm({ 
  addApplication 
}: ApplicationFormProps) {
  const [formData, setFormData] = 
    useState<ApplicationFormData>(initialFormData)

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target

    const newValue =
      event.target instanceof HTMLInputElement &&
      event.target.type === "checkbox"
        ? event.target.checked
        : value

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue
    }))
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const validationResult = validateForm(formData)

    if (!validationResult.isValid) {
      alert(validationResult.message)
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