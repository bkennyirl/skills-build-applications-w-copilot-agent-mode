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

function Teams({ apiBaseUrl, normalizeCollectionResponse }) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const resolvedApiBaseUrl = apiBaseUrl || (codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api')
  const endpoint = `${resolvedApiBaseUrl}/teams/`
  const normalize = normalizeCollectionResponse || defaultNormalizeCollectionResponse

  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadTeams() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(endpoint, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Teams request failed (${response.status})`)
        }

        const payload = await response.json()
        setTeams(normalize(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load teams')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTeams()

    return () => controller.abort()
  }, [endpoint, normalize])

  return (
    <section>
      <h2 className="h4">Teams</h2>
      <p className="text-body-secondary mb-3">GET {endpoint}</p>

      {isLoading && <div className="alert alert-info">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!isLoading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.id}>
                  <td>{team.name}</td>
                  <td>{team.description || '-'}</td>
                  <td>{Array.isArray(team.members) ? team.members.length : team.memberCount ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {teams.length === 0 && <p className="mb-0">No teams found.</p>}
        </div>
      )}
    </section>
  )
}

export default Teams
