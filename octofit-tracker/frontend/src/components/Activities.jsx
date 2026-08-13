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

function Activities({ normalizeCollectionResponse }) {
  const endpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/'
  const normalize = normalizeCollectionResponse || defaultNormalizeCollectionResponse

  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadActivities() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(endpoint, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Activities request failed (${response.status})`)
        }

        const payload = await response.json()
        setActivities(normalize(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load activities')
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadActivities()

    return () => controller.abort()
  }, [endpoint, normalize])

  return (
    <section>
      <h2 className="h4">Activities</h2>
      <p className="text-body-secondary mb-3">GET {endpoint}</p>

      {isLoading && <div className="alert alert-info">Loading activities...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!isLoading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>Points</th>
                <th>Performed</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity.type}</td>
                  <td>{activity.user?.name || activity.userName || '-'}</td>
                  <td>{activity.durationMinutes ?? '-'}</td>
                  <td>{activity.caloriesBurned ?? '-'}</td>
                  <td>{activity.points ?? '-'}</td>
                  <td>{activity.performedAt ? new Date(activity.performedAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {activities.length === 0 && <p className="mb-0">No activities found.</p>}
        </div>
      )}
    </section>
  )
}

export default Activities
