import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import Activities from './Activities'
import Leaderboard from './Leaderboard'
import Teams from './Teams'
import Users from './Users'
import Workouts from './Workouts'

const normalize = (payload) => (Array.isArray(payload) ? payload : [])
const apiBaseUrl = 'https://codespace-name-8000.app.github.dev/api'

const componentCases = [
  ['activities', Activities, '/activities/'],
  ['leaderboard', Leaderboard, '/leaderboard/'],
  ['teams', Teams, '/teams/'],
  ['users', Users, '/users/'],
  ['workouts', Workouts, '/workouts/'],
]

afterEach(() => {
  vi.restoreAllMocks()
})

describe('component API endpoints', () => {
  it.each(componentCases)('calls the %s API endpoint', async (_name, Component, path) => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    })

    vi.stubGlobal('fetch', fetchMock)

    render(<Component apiBaseUrl={apiBaseUrl} normalizeCollectionResponse={normalize} />)

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        `${apiBaseUrl}${path}`,
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      )
    })
  })
})
