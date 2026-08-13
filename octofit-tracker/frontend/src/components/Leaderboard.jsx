import { useEffect, useState } from 'react'

function defaultNormalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const listKeys = ['results', 'items', 'data', 'docs', 'rows', 'entries', 'suggestions']

  for (const key of listKeys) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  if (payload.data && typeof payload.data === 'object') {
    for (const key of listKeys) {
      if (Array.isArray(payload.data[key])) {
        return payload.data[key]
      }
    }
  }

  return []
}

function Leaderboard({ apiBaseUrl, normalizeCollectionResponse }) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const resolvedApiBaseUrl = apiBaseUrl || (codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api')
  const endpoint = `${resolvedApiBaseUrl}/leaderboard/`
  const normalize = normalizeCollectionResponse || defaultNormalizeCollectionResponse

  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadLeaderboard() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(endpoint, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Leaderboard request failed (${response.status})`)
        }

        const payload = await response.json()
        setEntries(normalize(payload))
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
  }, [endpoint, normalize])

  return (
    <section>
      <h2 className="h4">Leaderboard</h2>
      <p className="text-body-secondary mb-3">GET {endpoint}</p>

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
