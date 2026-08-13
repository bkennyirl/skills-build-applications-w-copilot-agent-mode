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

function Workouts({ apiBaseUrl, normalizeCollectionResponse }) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const resolvedApiBaseUrl = apiBaseUrl || (codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api')
  const endpoint = `${resolvedApiBaseUrl}/workouts/`
  const normalize = normalizeCollectionResponse || defaultNormalizeCollectionResponse

  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadWorkouts() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(endpoint, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Workouts request failed (${response.status})`)
        }

        const payload = await response.json()
        setWorkouts(normalize(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load workouts')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadWorkouts()

    return () => controller.abort()
  }, [endpoint, normalize])

  return (
    <section>
      <h2 className="h4">Workouts</h2>
      <p className="text-body-secondary mb-3">GET {endpoint}</p>

      {isLoading && <div className="alert alert-info">Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!isLoading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Level</th>
                <th>Category</th>
                <th>Duration (min)</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id}>
                  <td>{workout.title}</td>
                  <td>{workout.level || '-'}</td>
                  <td>{workout.category || '-'}</td>
                  <td>{workout.durationMinutes ?? '-'}</td>
                  <td>{workout.description || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {workouts.length === 0 && <p className="mb-0">No workouts found.</p>}
        </div>
      )}
    </section>
  )
}

export default Workouts
