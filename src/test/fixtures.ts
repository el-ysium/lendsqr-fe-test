import type { ApiUser, User } from '../data/users'
import { emptyFilters, type UserFilters } from '../utils/filter-users'

export function createUser(overrides: Partial<User> = {}): User {
  return {
    id: '1',
    organization: 'Lendsqr',
    username: 'Adedeji',
    email: 'adedeji@lendsqr.com',
    phone: '08078903721',
    dateJoined: 'May 15, 2020 10:00 AM',
    status: 'Active',
    personalInfo: {
      fullName: 'Adedeji Okeke',
      phoneNumber: '08078903721',
      email: 'adedeji@lendsqr.com',
      bvn: '12345678901',
      gender: 'Male',
      maritalStatus: 'Single',
      children: 'None',
      residenceType: "Parent's Apartment",
    },
    education: {
      level: 'B.Sc',
      employmentStatus: 'Employed',
      sector: 'FinTech',
      duration: '2 years',
      officeEmail: 'adedeji@lendsqr.com',
      monthlyIncome: '200,000 - 400,000',
      loanRepayment: '40000',
    },
    socials: {
      twitter: '@adedeji',
      facebook: 'Adedeji Okeke',
      instagram: '@adedeji',
    },
    guarantors: [
      {
        fullName: 'Debby Ogana',
        phoneNumber: '07060780922',
        email: 'debby@gmail.com',
        relationship: 'Sister',
      },
      {
        fullName: 'Tosin Dokunmu',
        phoneNumber: '07003309226',
        email: 'tosin@gmail.com',
        relationship: 'Friend',
      },
    ],
    ...overrides,
  }
}

export function createApiUser(overrides: Partial<ApiUser> = {}): ApiUser {
  return {
    id: '1',
    createdAt: '2020-05-15T10:00:00.000Z',
    username: 'Adedeji',
    email: 'adedeji@lendsqr.com',
    phone: '08078903721',
    Organization: 'Lendsqr',
    status: 'active',
    personalInfo_fullName: 'Adedeji Okeke',
    personalInfo_bvn: '12345678901',
    personalInfo_gender: 'Male',
    personalInfo_maritalStatus: 'Single',
    personalInfo_residenceType: "Parent's Apartment",
    employment_educationLevel: 'B.Sc',
    employment_status: 'Employed',
    employment_sector: 'FinTech',
    employment_duration: '2 years',
    employment_email: 'adedeji@lendsqr.com',
    employment_income: '200,000 - 400,000',
    employment_loanRepayment: '40000',
    socials_twitter: '@adedeji',
    socials_facebook: 'Adedeji Okeke',
    socials_instagram: '@adedeji',
    guarantor1_fullName: 'Debby Ogana',
    guarantor1_phone: '07060780922',
    guarantor1_email: 'debby@gmail.com',
    guarantor1_relationship: 'Sister',
    guarantor2_fullName: 'Tosin Dokunmu',
    guarantor2_phone: '07003309226',
    guarantor2_email: 'tosin@gmail.com',
    guarantor2_relationship: 'Friend',
    ...overrides,
  }
}

export function createFilters(overrides: Partial<UserFilters> = {}): UserFilters {
  return {
    ...emptyFilters,
    ...overrides,
  }
}

export const sampleUsers: User[] = [
  createUser({
    id: '1',
    organization: 'Lendsqr',
    username: 'Adedeji',
    email: 'adedeji@lendsqr.com',
    phone: '08078903721',
    dateJoined: 'May 15, 2020 10:00 AM',
    status: 'Active',
  }),
  createUser({
    id: '2',
    organization: 'Irorun',
    username: 'Debby Ogana',
    email: 'debby@irorun.com',
    phone: '08160780928',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Pending',
  }),
  createUser({
    id: '3',
    organization: 'Lendstar',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phone: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Blacklisted',
  }),
  createUser({
    id: '4',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phone: '07003309226',
    dateJoined: 'Apr 10, 2020 10:00 AM',
    status: 'Inactive',
  }),
]
