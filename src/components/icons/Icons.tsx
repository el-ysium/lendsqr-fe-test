import BriefcaseIcon from '../../assets/icons/organisation.png';
import HomeIcon from '../../assets/icons/home 1.png';
import UsersIcon from '../../assets/icons/users.svg';
import GuarantorIcon from '../../assets/icons/guarantors.svg';
import LoansIcon from '../../assets/icons/loans.png';
import DecisionIcon from '../../assets/icons/decision_models.svg';
import SavingsIcon from '../../assets/icons/customers_savings.svg';
import SavingsIcon2 from '../../assets/icons/savings.svg';
import LoanRequestIcon from '../../assets/icons/loan_request.svg';
import WhitelistIcon from '../../assets/icons/whitelist.svg';
import KarmaIcon from '../../assets/icons/karma.svg';
import FeesIcon from '../../assets/icons/fees.svg';
import FeesChargesIcon from '../../assets/icons/fees_charges.svg';
import TransactionsIcon from '../../assets/icons/transactions.svg';
import ServicesIcon from '../../assets/icons/service.svg';
import SettlementsIcon from '../../assets/icons/settlements.svg';
import ReportsIcon from '../../assets/icons/reports.svg';
import PreferencesIcon from '../../assets/icons/preferences.svg';
import AuditIcon from '../../assets/icons/audit_logs.svg';
import SystemsIcon from '../../assets/icons/system_health.svg';
import LogoutIcon from '../../assets/icons/logout.svg';
import searchIcon from '../../assets/icons/search.svg';
import NotificationIcon from '../../assets/icons/notifications.svg';
import ChevronDownIcon from '../../assets/icons/chevron_down.svg';
import ActiveUsersCardIcon from '../../assets/icons/active_users_dashboard.svg';
import UsersCardIcon from '../../assets/icons/users_dashboard.svg';
import LoansCardIcon from '../../assets/icons/loans_dashboard.svg';
import SavingsCardIcon from '../../assets/icons/savings_dashboard.svg';

interface IconProps {
  className?: string
  size?: number
}

export function IconBriefcase({ size = 16 }: IconProps) {
  return (
    <img
      src={BriefcaseIcon}
      alt="Briefcase"
      style={{ width: size, height: size }}
    />
  )
}

export function IconHome({ size = 16 }: IconProps) {
  return (
    <img
      src={HomeIcon}
      alt="Briefcase"
      style={{ width: size, height: size }}
    />
  )
}

export function IconUsers({ size = 16 }: IconProps) {
  return (
    <img
      src={UsersIcon}
      alt="Users"
      style={{ width: size, height: size }}
    />
  )
}

export function IconGuarantors({ size = 16 }: IconProps) {
  return (
    <img
      src={GuarantorIcon}
      alt="Guarantors"
      style={{ width: size, height: size }}
    />
  )
}

export function IconLoans({ size = 16 }: IconProps) {
  return (
    <img
      src={LoansIcon}
      alt="Users"
      style={{ width: size, height: size }}
    />
  )
}

export function IconDecision({ size = 16 }: IconProps) {
  return (
    <img
      src={DecisionIcon}
      alt="Users"
      style={{ width: size, height: size }}
    />
  )
}

export function IconSavings({ size = 16 }: IconProps) {
  return (
    <img
      src={SavingsIcon}
      alt="savings"
      style={{ width: size, height: size }}
    />
  )
}

export function IconSavings2({ size = 16 }: IconProps) {
  return (
    <img
      src={SavingsIcon2}
      alt="Savings Products"
      style={{ width: size, height: size }}
    />
  )
}

export function IconLoanRequest({ size = 16 }: IconProps) {
  return (
    <img
      src={LoanRequestIcon}
      alt="loan request"
      style={{ width: size, height: size }}
    />
  )
}

export function IconWhitelist({ size = 16 }: IconProps) {
  return (
    <img
      src={WhitelistIcon}
      alt="whitelist"
      style={{ width: size, height: size }}
    />
  )
}

export function IconKarma({ size = 16 }: IconProps) {
  return (
    <img
      src={KarmaIcon}
      alt="Karma"
      style={{ width: size, height: size }}
    />
  )
}


export function IconFees({ size = 16 }: IconProps) {
  return (
    <img
      src={FeesIcon}
      alt="Fees"
      style={{ width: size, height: size }}
    />
  )
}

export function IconFeesCharges({ size = 16 }: IconProps) {
  return (
    <img
      src={FeesChargesIcon}
      alt="fees and charges"
      style={{ width: size, height: size }}
    />
  )
}


export function IconTransactions({ size = 16 }: IconProps) {
  return (
    <img
      src={TransactionsIcon}
      alt="transactions"
      style={{ width: size, height: size }}
    />
  )
}

export function IconServices({ size = 16 }: IconProps) {
  return (
    <img
      src={ServicesIcon}
      alt="Users"
      style={{ width: size, height: size }}
    />
  )
}

export function IconSettlements({ size = 16 }: IconProps) {
  return (
    <img
      src={SettlementsIcon}
      alt="Settlements"
      style={{ width: size, height: size }}
    />
  )
}

export function IconReports({ size = 16 }: IconProps) {
  return (
    <img
      src={ReportsIcon}
      alt="Reports"
      style={{ width: size, height: size }}
    />
  )
}

export function IconPreferences({ size = 16 }: IconProps) {
  return (
    <img
      src={PreferencesIcon}
      alt="Prefrences"
      style={{ width: size, height: size }}
    />
  )
}


export function IconAudit({ size = 16 }: IconProps) {
  return (
    <img
      src={AuditIcon}
      alt="Audit Logs"
      style={{ width: size, height: size }}
    />
  )
}

export function IconLogout({ size = 16 }: IconProps) {
  return (
    <img
      src={LogoutIcon}
      alt="Logout"
      style={{ width: size, height: size }}
    />
  )
}

export function IconSystems({ size = 16 }: IconProps) {
  return (
    <img
      src={SystemsIcon}
      alt="System Messages"
      style={{ width: size, height: size }}
    />
  )
}


export function IconSearch({ size = 14 }: IconProps) {
  return (
    <img
      src={searchIcon}
      alt="search"
      style={{ width: size, height: size }}
    />
  )
}

export function IconBell({ size = 20 }: IconProps) {
  return (
    <img
      src={NotificationIcon}
      alt="notification"
      style={{ width: size, height: size }}
    />
  )
}

export function IconChevronDown({ size = 20 }: IconProps) {
  return (
    <img
      src={ChevronDownIcon}
      alt="Chevron Down"
      style={{ width: size, height: size }}
    />
  )
}

export function IconFilter({ className, size = 12 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M1.5 2.25h9M3 6h6M4.5 9.75h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function IconMore({ className, size = 20 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="4" r="1.2" fill="currentColor" />
      <circle cx="10" cy="10" r="1.2" fill="currentColor" />
      <circle cx="10" cy="16" r="1.2" fill="currentColor" />
    </svg>
  )
}

export function IconEye({ className, size = 16 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M1.333 8s2.667-5.333 6.667-5.333S14.667 8 14.667 8s-2.667 5.333-6.667 5.333S1.333 8 1.333 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function IconUserX({ className, size = 16 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M11.333 14v-1.333A2.667 2.667 0 0 0 8.667 10H4A2.667 2.667 0 0 0 1.333 12.667V14M6.333 7.333a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333ZM13.333 4.667 10 8M10 4.667l3.333 3.333" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconUserCheck({ className, size = 16 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M11.333 14v-1.333A2.667 2.667 0 0 0 8.667 10H4A2.667 2.667 0 0 0 1.333 12.667V14M6.333 7.333a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333ZM10.667 6l1.333 1.333L14.667 4.667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconArrowLeft({ className, size = 20 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M16.667 10H3.333M8.333 5 3.333 10l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconStar({ className, size = 16, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <svg className={className} width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill-rule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clip-rule="evenodd"
        stroke={filled ? '#E9B200' : '#E9B200'}
        fill={filled ? '#E9B200' : 'none'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconUserPlaceholder({ className, size = 40 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="20" fill="#213F7D" fillOpacity="0.16" />
      <path d="M20 20a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM8 32.4c0-5.302 5.373-9.6 12-9.6s12 4.298 12 9.6" fill="#213F7D" fillOpacity="0.4" />
    </svg>
  )
}

export function IconUsersCard({  size = 22 }: IconProps) {
  return (
    <img
    src={UsersCardIcon}
    alt="Users Card"
    style={{ width: size, height: size }}
  />
  )
}

export function IconActiveUsersCard({ size = 22 }: IconProps) {
  return (
    <img
      src={ActiveUsersCardIcon}
      alt="Active Users Card"
      style={{ width: size, height: size }}
    />
  )
}

export function IconLoansCard({ size = 22 }: IconProps) {
  return (
    <img
      src={LoansCardIcon}
      alt="Loans Card"
      style={{ width: size, height: size }}
    />
  )
}

export function IconSavingsCard({ size = 22 }: IconProps) {
  return (
    <img
      src={SavingsCardIcon}
      alt="Savings Card"
      style={{ width: size, height: size }}
    />
  )
}

export function IconMenu({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconClose({ className, size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
