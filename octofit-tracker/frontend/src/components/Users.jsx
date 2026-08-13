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

function Users({ apiBaseUrl, normalizeCollectionResponse }) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const resolvedApiBaseUrl = apiBaseUrl || (codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api')
  const endpoint = `${resolvedApiBaseUrl}/users/`
  const normalize = normalizeCollectionResponse || defaultNormalizeCollectionResponse

  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(endpoint, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Users request failed (${response.status})`)
        }

        const payload = await response.json()
        setUsers(normalize(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load users')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadUsers()

    return () => controller.abort()
  }, [endpoint, normalize])

  return (
    <section>
      <h2 className="h4">Users</h2>
      <p className="text-body-secondary mb-3">GET {endpoint}</p>

      {isLoading && <div className="alert alert-info">Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!isLoading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Grade</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.grade || '-'}</td>
                  <td>{user.team?.name || user.teamName || '-'}</td>
                  <td>{user.totalPoints ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && <p className="mb-0">No users found.</p>}
        </div>
      )}
    </section>
  )
}

export default Users
