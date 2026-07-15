import { describe, expect, it } from 'vitest'
import { mapApiUser } from './users'
import { createApiUser } from '../test/fixtures'

describe('mapApiUser', () => {
  it('maps core user fields from the API response', () => {
    const result = mapApiUser(createApiUser())

    expect(result.id).toBe('1')
    expect(result.organization).toBe('Lendsqr')
    expect(result.username).toBe('Adedeji')
    expect(result.email).toBe('adedeji@lendsqr.com')
    expect(result.phone).toBe('08078903721')
  })

  it('formats a valid createdAt date for the table', () => {
    const result = mapApiUser(
      createApiUser({ createdAt: '2020-05-15T10:00:00.000Z' })
    )

    expect(result.dateJoined).toContain('2020')
    expect(result.dateJoined).toContain('15')
  })

  it('keeps the original string when createdAt is invalid', () => {
    const result = mapApiUser(createApiUser({ createdAt: 'not-a-date' }))

    expect(result.dateJoined).toBe('not-a-date')
  })

  it('maps personal information fields', () => {
    const result = mapApiUser(createApiUser())

    expect(result.personalInfo).toEqual({
      fullName: 'Adedeji Okeke',
      phoneNumber: '08078903721',
      email: 'adedeji@lendsqr.com',
      bvn: '12345678901',
      gender: 'Male',
      maritalStatus: 'Single',
      children: 'None',
      residenceType: "Parent's Apartment",
    })
  })

  it('maps education, socials, and both guarantors', () => {
    const result = mapApiUser(createApiUser())

    expect(result.education.level).toBe('B.Sc')
    expect(result.education.officeEmail).toBe('adedeji@lendsqr.com')
    expect(result.socials.twitter).toBe('@adedeji')
    expect(result.guarantors).toHaveLength(2)
    expect(result.guarantors[0]?.fullName).toBe('Debby Ogana')
    expect(result.guarantors[1]?.relationship).toBe('Friend')
  })

  it.each([
    ['active', 'Active'],
    ['ACTIVE', 'Active'],
    [' inactive ', 'Inactive'],
    ['pending', 'Pending'],
    ['Pending', 'Pending'],
    ['blacklisted', 'Blacklisted'],
    ['BLACKLISTED', 'Blacklisted'],
  ] as const)('normalizes status %s to %s', (input, expected) => {
    const result = mapApiUser(createApiUser({ status: input }))
    expect(result.status).toBe(expected)
  })

  it('falls back to Inactive for unknown statuses', () => {
    const result = mapApiUser(createApiUser({ status: 'unknown-state' }))
    expect(result.status).toBe('Inactive')
  })

  it('falls back to Inactive for an empty status', () => {
    const result = mapApiUser(createApiUser({ status: '' }))
    expect(result.status).toBe('Inactive')
  })
})
