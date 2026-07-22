import { useEffect, useState } from "react"
import { supabase } from "./lib/supabaseClient"
// import {jobs } from "./data/jobs"
import JobCard from "./components/JobCard"
import FilterBar from "./components/FilterBar"
import ApplicationForm from "./components/ApplicationForm"
import "./App.css";

function mapDbApplication(row) {
  return {
    id: row.id,
    company: row.company,
    role: row.role,
    platform: row.platform,
    status: row.status,
    priority: row.priority,
    jobType: row.job_type,
    location: row.location,
    remotePolicy: row.remote_policy,
    salary: row.salary,
    dateApplied: row.date_applied,
    followUpDate: row.follow_up_date,
    cvUsed: row.cv_used,
    portfolioIncluded: row.portfolio_included,
    jobLink: row.job_link,
    notes: row.notes,
    skills: row.skills || []
  }
}

function mapApplicationToDb(application) {
  return {
    company: application.company,
    role: application.role,
    platform: application.platform,
    status: application.status,
    priority: application.priority,
    job_type: application.jobType,
    location: application.location,
    remote_policy: application.remotePolicy,
    salary: application.salary,
    date_applied: application.dateApplied || null,
    follow_up_date: application.followUpDate,
    cv_used: application.cvUsed,
    portfolio_included: application.portfolioIncluded,
    job_link: application.jobLink,
    notes: application.notes,
    skills: application.skills
  }
}

function App() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showNotes, setShowNotes] = useState(true)
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    async function fetchApplications() {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("id", { ascending: true })

      if (error) {
        console.error(error)
        setErrorMessage("Could not load applications from Supabase.")
        setIsLoading(false)
        return
      }

      const mappedApplications = data.map(mapDbApplication)

      setApplications(mappedApplications)
      setIsLoading(false)
    }

    fetchApplications()
  }, [])

  const filteredJobs = 
    selectedStatus === "all"
      ? applications
      : applications.filter((job) => job.status === selectedStatus)

  async function addApplication(newApplication) {
    const dbApplication = mapApplicationToDb(newApplication)

    const { data, error } = await supabase
      .from("applications")
      .insert(dbApplication)
      .select()
      .single()

    if (error) {
      console.error(error)
      alert("Could not save application to Supabase.")
      return false
    }

    const savedApplication = mapDbApplication(data)

    setApplications((prevApplications) => [
      ...prevApplications,
      savedApplication
    ])

    return true
  }

  async function updateApplicationStatus(application, newStatus) {
    const today = new Date().toISOString().split("T")[0]

    const updates = {
      status: newStatus,
      date_applied:
        newStatus === "saved"
          ? null
          : application.dateApplied || today
    }

    const { data, error } = await supabase
      .from("applications")
      .update(updates)
      .eq("id", application.id)
      .select()
      .single()

    if (error) {
      console.error("Status update failed:", error)
      alert(`Could not update application status: ${error.message}`)
      return false
    }

    const updatedApplication = mapDbApplication(data)

    setApplications((prevApplications) =>
      prevApplications.map((currentApplication) =>
        currentApplication.id === updatedApplication.id
          ? updatedApplication
          : currentApplication
      )
    )

    return true
  }

    return (
      <main className="app">
        <ApplicationForm addApplication={addApplication} />

        <h1>Job Application Tracker</h1>
        <p>Track saved roles, applications, stretch jobs, interviews and follow-ups.</p>

        <FilterBar 
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <button 
          className={`notes-toggle ${showNotes ? "active-toggle" : ""}`}
          onClick={() => setShowNotes((prevShowNotes) => !prevShowNotes)}
        >
          {showNotes ? "Hide notes" : "Show notes"}
        </button>

        {isLoading && <p>Loading applications...</p>}
        {errorMessage && <p>{errorMessage}</p>}

        <section className="jobs-list">
          {filteredJobs.map((job) => (
            <JobCard 
              key={job.id} 
              job={job} 
              showNotes={showNotes}
              updateApplicationStatus={updateApplicationStatus} 
            />
          ))}
        </section>
      </main>
    );
}

export default App;