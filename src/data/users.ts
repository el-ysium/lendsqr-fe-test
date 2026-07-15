export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted'

export interface ApiUser {
  id: string
  createdAt: string
  username: string
  email: string
  phone: string
  Organization: string
  status: string
  personalInfo_fullName: string
  personalInfo_bvn: string
  personalInfo_gender: string
  personalInfo_maritalStatus: string
  personalInfo_residenceType: string
  employment_educationLevel: string
  employment_status: string
  employment_sector: string
  employment_duration: string
  employment_email: string
  employment_income: string
  employment_loanRepayment: string
  socials_twitter: string
  socials_facebook: string
  socials_instagram: string
  guarantor1_fullName: string
  guarantor1_phone: string
  guarantor1_email: string
  guarantor1_relationship: string
  guarantor2_fullName: string
  guarantor2_phone: string
  guarantor2_email: string
  guarantor2_relationship: string
}

export interface User {
  id: string
  organization: string
  username: string
  email: string
  phone: string
  dateJoined: string
  status: UserStatus
  personalInfo: {
    fullName: string
    phoneNumber: string
    email: string
    bvn: string
    gender: string
    maritalStatus: string
    children: string
    residenceType: string
  }
  education: {
    level: string
    employmentStatus: string
    sector: string
    duration: string
    officeEmail: string
    monthlyIncome: string
    loanRepayment: string
  }
  socials: {
    twitter: string
    facebook: string
    instagram: string
  }
  guarantors: Array<{
    fullName: string
    phoneNumber: string
    email: string
    relationship: string
  }>
}

function formatDateJoined(isoDate: string) {
  const parsed = new Date(isoDate)
  if (Number.isNaN(parsed.getTime())) return isoDate

  return parsed.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function normalizeStatus(status: string): UserStatus {
  const value = status.trim().toLowerCase()

  if (value === 'active') return 'Active'
  if (value === 'inactive') return 'Inactive'
  if (value === 'pending') return 'Pending'
  if (value === 'blacklisted') return 'Blacklisted'

  return 'Inactive'
}

export function mapApiUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    organization: apiUser.Organization,
    username: apiUser.username,
    email: apiUser.email,
    phone: apiUser.phone,
    dateJoined: formatDateJoined(apiUser.createdAt),
    status: normalizeStatus(apiUser.status),
    personalInfo: {
      fullName: apiUser.personalInfo_fullName,
      phoneNumber: apiUser.phone,
      email: apiUser.email,
      bvn: apiUser.personalInfo_bvn,
      gender: apiUser.personalInfo_gender,
      maritalStatus: apiUser.personalInfo_maritalStatus,
      children: 'None',
      residenceType: apiUser.personalInfo_residenceType,
    },
    education: {
      level: apiUser.employment_educationLevel,
      employmentStatus: apiUser.employment_status,
      sector: apiUser.employment_sector,
      duration: apiUser.employment_duration,
      officeEmail: apiUser.employment_email,
      monthlyIncome: apiUser.employment_income,
      loanRepayment: apiUser.employment_loanRepayment,
    },
    socials: {
      twitter: apiUser.socials_twitter,
      facebook: apiUser.socials_facebook,
      instagram: apiUser.socials_instagram,
    },
    guarantors: [
      {
        fullName: apiUser.guarantor1_fullName,
        phoneNumber: apiUser.guarantor1_phone,
        email: apiUser.guarantor1_email,
        relationship: apiUser.guarantor1_relationship,
      },
      {
        fullName: apiUser.guarantor2_fullName,
        phoneNumber: apiUser.guarantor2_phone,
        email: apiUser.guarantor2_email,
        relationship: apiUser.guarantor2_relationship,
      },
    ],
  }
}
