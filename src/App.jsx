import { useState } from "react"
import {jobs } from "./data/jobs"
import JobCard from "./components/JobCard"
import FilterBar from "./components/FilterBar"
import "./App.css";


function App() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const filteredJobs = 
  selectedStatus === "all"
    ? jobs
    : jobs.filter((job) => job.status === selectedStatus)
    return (
      <main className="app">
        <h1>Job Application Tracker</h1>
        <p>Track saved roles, applications, stretch jobs, interviews and follow-ups.</p>

        <FilterBar 
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <section className="jobs-list">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>
      </main>
    );
}

export default App;