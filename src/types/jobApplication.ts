export type JobStatus =
  | "saved"
  | "applied"
  | "interview"
  | "rejected"
  | "no-response"

export type JobApplication = {
  id: number
  company: string
  role: string
  platform: string
  status: JobStatus
  priority: string
  jobType: string
  location: string
  remotePolicy: string
  salary: string
  dateApplied: string | null
  followUpDate: string | null
  cvUsed: string | null
  portfolioIncluded: boolean
  jobLink: string | null
  notes: string
  skills: string[]
}