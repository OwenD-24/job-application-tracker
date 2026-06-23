import {jobs } from "./data/jobs"
import JobCard from "./components/JobCard"
import "./App.css";


function App() {
  return (
    <main className="app">
      <h1>Job Application Tracker</h1>
      <p>Track saved roles, applications, stretch jobs, interviews and follow-ups.</p>

      <section className="jobs-list">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </section>
    </main>
  );
}

export default App;