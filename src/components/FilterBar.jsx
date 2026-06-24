function FilterBar({ selectedStatus, setSelectedStatus }) {
    return (
        <div className="filter-bar">
            <button 
                className={selectedStatus === "all" ? "active-filter" : ""}
                onClick={() => setSelectedStatus("all")}
            >
                All
            </button>
            <button
                className={selectedStatus === "applied" ? "active-filter" : ""} 
                onClick={() => setSelectedStatus("applied")}
            >
                Applied
            </button>
            <button
                className={selectedStatus === "saved" ? "active-filter" : ""}
                onClick={() => setSelectedStatus("saved")}
            >
                Saved
            </button>
        </div>
    )
}

export default FilterBar