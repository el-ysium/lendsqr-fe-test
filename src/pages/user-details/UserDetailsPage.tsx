import { Link, useParams } from 'react-router-dom'
import {
  IconArrowLeft,
  IconStar,
  IconUserPlaceholder,
} from '../../components/icons/Icons'
import { dummyUsers } from '../../data/users'
import './UserDetailsPage.scss'

const tabs = [
  'General Details',
  'Documents',
  'Bank Details',
  'Loans',
  'Savings',
  'App and System',
]

const personalInfo = [
  { label: 'Full Name', value: 'Grace Effiom' },
  { label: 'Phone Number', value: '07060780922' },
  { label: 'Email Address', value: 'grace@gmail.com' },
  { label: 'Bvn', value: '07060780922' },
  { label: 'Gender', value: 'Female' },
  { label: 'Marital status', value: 'Single' },
  { label: 'Children', value: 'None' },
  { label: 'Type of residence', value: "Parent's Apartment" },
]

const educationInfo = [
  { label: 'level of education', value: 'B.Sc' },
  { label: 'employment status', value: 'Employed' },
  { label: 'sector of employment', value: 'FinTech' },
  { label: 'Duration of employment', value: '2 years' },
  { label: 'office email', value: 'grace@lendsqr.com' },
  { label: 'Monthly income', value: '₦200,000.00 - ₦400,000.00' },
  { label: 'loan repayment', value: '40,000' },
]

const socials = [
  { label: 'Twitter', value: '@grace_effiom' },
  { label: 'Facebook', value: 'Grace Effiom' },
  { label: 'Instagram', value: '@grace_effiom' },
]

const guarantors = [
  [
    { label: 'Full Name', value: 'Debby Ogana' },
    { label: 'Phone Number', value: '07060780922' },
    { label: 'Email Address', value: 'debby@gmail.com' },
    { label: 'Relationship', value: 'Sister' },
  ],
  [
    { label: 'Full Name', value: 'Debby Ogana' },
    { label: 'Phone Number', value: '07060780922' },
    { label: 'Email Address', value: 'debby@gmail.com' },
    { label: 'Relationship', value: 'Sister' },
  ],
]

export function UserDetailsPage() {
  const { id } = useParams()
  const user = dummyUsers.find((u) => u.id === id) ?? dummyUsers[2]

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
            <h2>{user.username === 'Grace Effiom' ? 'Grace Effiom' : user.username}</h2>
            <p>LSQFf587g90</p>
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
          <div key={`${title ?? 'guarantor'}-${field.label}-${field.value}`} className="info-section__field">
            <p className="info-section__label">{field.label}</p>
            <p className="info-section__value">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
