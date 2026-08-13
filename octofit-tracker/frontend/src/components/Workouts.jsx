import { useEffect, useState } from 'react'

function Workouts({ apiBaseUrl, normalizeCollectionResponse }) {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadWorkouts() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch(`${apiBaseUrl}/workouts/`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Workouts request failed (${response.status})`)
        }

        const payload = await response.json()
        setWorkouts(normalizeCollectionResponse(payload))
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
  }, [apiBaseUrl, normalizeCollectionResponse])

  return (
    <section>
      <h2 className="h4">Workouts</h2>
      <p className="text-body-secondary mb-3">GET {apiBaseUrl}/workouts/</p>

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
