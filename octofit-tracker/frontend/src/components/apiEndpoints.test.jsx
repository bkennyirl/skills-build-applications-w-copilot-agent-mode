import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import Activities from './Activities'
import Leaderboard from './Leaderboard'
import Teams from './Teams'
import Users from './Users'
import Workouts from './Workouts'

const normalize = (payload) => (Array.isArray(payload) ? payload : [])

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

    render(<Component normalizeCollectionResponse={normalize} />)

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })

    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toMatch(new RegExp(`${path}$`))
    expect(url).toContain('/api')
    expect(options).toEqual(expect.objectContaining({ signal: expect.any(AbortSignal) }))
  })
})
