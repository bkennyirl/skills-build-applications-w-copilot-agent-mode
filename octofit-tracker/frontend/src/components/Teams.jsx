import { useEffect, useState } from 'react'

function Teams({ apiBaseUrl, normalizeCollectionResponse }) {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadTeams() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(`${apiBaseUrl}/teams/`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Teams request failed (${response.status})`)
        }

        const payload = await response.json()
        setTeams(normalizeCollectionResponse(payload))
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
  }, [apiBaseUrl, normalizeCollectionResponse])

  return (
    <section>
      <h2 className="h4">Teams</h2>
      <p className="text-body-secondary mb-3">GET {apiBaseUrl}/teams/</p>

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
