import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function getCodespaceNameFromHost() {
  if (typeof window === 'undefined') {
    return ''
  }

  const host = window.location.hostname
  const match = host.match(/^([a-z0-9-]+)-\d+\.app\.github\.dev$/i)
  return match?.[1] || ''
}

function normalizeCollectionResponse(payload) {
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

function App() {
  const envCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  const inferredCodespaceName = getCodespaceNameFromHost()
  const codespaceName = envCodespaceName || inferredCodespaceName
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api`
    : 'http://localhost:8000/api'

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="h2 mb-2">Octofit Tracker</h1>
        <p className="text-body-secondary mb-3">Multi-tier activity, team, and workout dashboard</p>

        {!codespaceName && (
          <div className="alert alert-warning py-2" role="alert">
            VITE_CODESPACE_NAME is not set. Using localhost fallback at {apiBaseUrl}.
          </div>
        )}

        <nav className="nav nav-pills flex-wrap gap-2">
          <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Users
          </NavLink>
          <NavLink to="/activities" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Activities
          </NavLink>
          <NavLink to="/teams" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Teams
          </NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Leaderboard
          </NavLink>
          <NavLink to="/workouts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Workouts
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route
          path="/users"
          element={<Users normalizeCollectionResponse={normalizeCollectionResponse} />}
        />
        <Route
          path="/activities"
          element={<Activities normalizeCollectionResponse={normalizeCollectionResponse} />}
        />
        <Route
          path="/teams"
          element={<Teams normalizeCollectionResponse={normalizeCollectionResponse} />}
        />
        <Route
          path="/leaderboard"
          element={<Leaderboard normalizeCollectionResponse={normalizeCollectionResponse} />}
        />
        <Route
          path="/workouts"
          element={<Workouts normalizeCollectionResponse={normalizeCollectionResponse} />}
        />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </div>
  )
}

export default App
