import { Link, useParams } from 'react-router-dom'
import {
  IconArrowLeft,
  IconStar,
  IconUserPlaceholder,
} from '../../components/icons/Icons'
import { useUser } from '../../hooks/use-user'
import './UserDetailsPage.scss'

const tabs = [
  'General Details',
  'Documents',
  'Bank Details',
  'Loans',
  'Savings',
  'App and System',
]

export function UserDetailsPage() {
  const { id } = useParams()
  const { user, isLoading, hasError, errorMessage } = useUser(id)

  if (isLoading) {
    return (
      <div className="user-details">
        <Link to="/users" className="user-details__back">
          <IconArrowLeft />
          <span>Back to Users</span>
        </Link>
        <p className="user-details__state">Loading user details…</p>
      </div>
    )
  }

  if (hasError || !user) {
    return (
      <div className="user-details">
        <Link to="/users" className="user-details__back">
          <IconArrowLeft />
          <span>Back to Users</span>
        </Link>
        <p className="user-details__state">{errorMessage || 'User not found.'}</p>
      </div>
    )
  }

  const personalInfo = [
    { label: 'Full Name', value: user.personalInfo.fullName },
    { label: 'Phone Number', value: user.personalInfo.phoneNumber },
    { label: 'Email Address', value: user.personalInfo.email },
    { label: 'Bvn', value: user.personalInfo.bvn },
    { label: 'Gender', value: user.personalInfo.gender },
    { label: 'Marital status', value: user.personalInfo.maritalStatus },
    { label: 'Children', value: user.personalInfo.children },
    { label: 'Type of residence', value: user.personalInfo.residenceType },
  ]

  const educationInfo = [
    { label: 'level of education', value: user.education.level },
    { label: 'employment status', value: user.education.employmentStatus },
    { label: 'sector of employment', value: user.education.sector },
    { label: 'Duration of employment', value: user.education.duration },
    { label: 'office email', value: user.education.officeEmail },
    { label: 'Monthly income', value: user.education.monthlyIncome },
    { label: 'loan repayment', value: user.education.loanRepayment },
  ]

  const socials = [
    { label: 'Twitter', value: user.socials.twitter },
    { label: 'Facebook', value: user.socials.facebook },
    { label: 'Instagram', value: user.socials.instagram },
  ]

  const guarantors = user.guarantors.map((guarantor) => [
    { label: 'Full Name', value: guarantor.fullName },
    { label: 'Phone Number', value: guarantor.phoneNumber },
    { label: 'Email Address', value: guarantor.email },
    { label: 'Relationship', value: guarantor.relationship },
  ])

  return (
    <div className="user-details">
      <Link to="/users" className="user-details__back">
        <IconArrowLeft />
        <span>Back to Users</span>
      </Link>

      <div className="user-details__header">
        <h1>User Details</h1>
        <div className="user-details__actions">
          <button type="button" className="user-details__btn user-details__btn--danger">
            BLACKLIST USER
          </button>
          <button type="button" className="user-details__btn user-details__btn--primary">
            ACTIVATE USER
          </button>
        </div>
      </div>

      <section className="user-details__summary">
        <div className="user-details__profile">
          <div className="user-details__avatar">
            <IconUserPlaceholder size={100} />
          </div>
          <div className="user-details__identity">
            <h2>{user.personalInfo.fullName}</h2>
            <p>LSQ{user.id.padStart(9, '0')}</p>
          </div>
          <div className="user-details__tier">
            <p>User&apos;s Tier</p>
            <div className="user-details__stars">
              <IconStar filled />
              <IconStar />
              <IconStar />
            </div>
          </div>
          <div className="user-details__balance">
            <h3>₦200,000.00</h3>
            <p>9912345678/Providus Bank</p>
          </div>
        </div>

        <nav className="user-details__tabs" aria-label="User detail sections">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={index === 0 ? 'is-active' : undefined}
            >
              {tab}
            </button>
          ))}
        </nav>
      </section>

      <section className="user-details__info">
        <InfoSection title="Personal Information" fields={personalInfo} columns={5} />
        <InfoSection title="Education and Employment" fields={educationInfo} columns={4} />
        <InfoSection title="Socials" fields={socials} columns={5} />
        {guarantors.map((fields, index) => (
          <InfoSection
            key={index}
            title={index === 0 ? 'Guarantor' : undefined}
            fields={fields}
            columns={4}
          />
        ))}
      </section>
    </div>
  )
}

interface Field {
  label: string
  value: string
}

interface InfoSectionProps {
  title?: string
  fields: Field[]
  columns: number
}

function InfoSection({ title, fields, columns }: InfoSectionProps) {
  return (
    <div className="info-section">
      {title && <h3>{title}</h3>}
      <div
        className="info-section__grid"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {fields.map((field) => (
          <div
            key={`${title ?? 'guarantor'}-${field.label}-${field.value}`}
            className="info-section__field"
          >
            <p className="info-section__label">{field.label}</p>
            <p className="info-section__value">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
