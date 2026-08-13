import { useEffect, useState } from 'react'

function Leaderboard({ apiBaseUrl, normalizeCollectionResponse }) {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadLeaderboard() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(`${apiBaseUrl}/leaderboard/`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Leaderboard request failed (${response.status})`)
        }

        const payload = await response.json()
        setEntries(normalizeCollectionResponse(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load leaderboard')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadLeaderboard()

    return () => controller.abort()
  }, [apiBaseUrl, normalizeCollectionResponse])

  return (
    <section>
      <h2 className="h4">Leaderboard</h2>
      <p className="text-body-secondary mb-3">GET {apiBaseUrl}/leaderboard/</p>

      {isLoading && <div className="alert alert-info">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!isLoading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Grade</th>
                <th>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry.id || entry._id || `${entry.name}-${index}`}>
                  <td>{entry.rank ?? index + 1}</td>
                  <td>{entry.name}</td>
                  <td>{entry.grade || '-'}</td>
                  <td>{entry.totalPoints ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {entries.length === 0 && <p className="mb-0">No leaderboard entries found.</p>}
        </div>
      )}
    </section>
  )
}

export default Leaderboard
