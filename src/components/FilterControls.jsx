const STATUSES = ["All", "Applied", "Interview", "Offer", "Rejected"];

export default function FilterControls({ filters, onChange, totalCount, filteredCount }) {
  return (
    <section className="filters" aria-label="Filter applications">
      <div className="filters__row">
        <div className="filters__field">
          <label htmlFor="filter-search" className="filters__label">
            Search
          </label>
          <input
            id="filter-search"
            type="search"
            className="filters__input"
            placeholder="Company or role..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            aria-label="Search by company or role"
          />
        </div>

        <div className="filters__field">
          <label htmlFor="filter-status" className="filters__label">
            Status
          </label>
          <select
            id="filter-status"
            className="filters__select"
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value })}
            aria-label="Filter by pipeline status"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="filters__field">
          <label htmlFor="filter-sort" className="filters__label">
            Sort by
          </label>
          <select
            id="filter-sort"
            className="filters__select"
            value={filters.sort}
            onChange={(e) => onChange({ ...filters, sort: e.target.value })}
            aria-label="Sort applications"
          >
            <option value="date-desc">Date (newest)</option>
            <option value="date-asc">Date (oldest)</option>
            <option value="company">Company A–Z</option>
            <option value="role">Role A–Z</option>
          </select>
        </div>

        {(filters.search || filters.status !== "All") && (
          <button
            className="filters__clear"
            onClick={() => onChange({ search: "", status: "All", sort: filters.sort })}
            aria-label="Clear all filters"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="filters__count" aria-live="polite">
        Showing {filteredCount} of {totalCount} application
        {totalCount !== 1 ? "s" : ""}
      </p>
    </section>
  );
}
