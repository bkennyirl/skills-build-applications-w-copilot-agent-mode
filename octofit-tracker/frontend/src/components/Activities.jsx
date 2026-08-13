import { useEffect, useState } from 'react'

function Activities({ apiBaseUrl, normalizeCollectionResponse }) {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadActivities() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(`${apiBaseUrl}/activities/`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Activities request failed (${response.status})`)
        }

        const payload = await response.json()
        setActivities(normalizeCollectionResponse(payload))
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
  }, [apiBaseUrl, normalizeCollectionResponse])

  return (
    <section>
      <h2 className="h4">Activities</h2>
      <p className="text-body-secondary mb-3">GET {apiBaseUrl}/activities/</p>

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
