export type UserStatus = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted'

export interface User {
  id: string
  organization: string
  username: string
  email: string
  phone: string
  dateJoined: string
  status: UserStatus
}

export const dummyUsers: User[] = [
  {
    id: '1',
    organization: 'Lendsqr',
    username: 'Adedeji',
    email: 'adedeji@lendsqr.com',
    phone: '08078903721',
    dateJoined: 'May 15, 2020 10:00 AM',
    status: 'Inactive',
  },
  {
    id: '2',
    organization: 'Irorun',
    username: 'Debby Ogana',
    email: 'debby@irorun.com',
    phone: '08160780928',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Pending',
  },
  {
    id: '3',
    organization: 'Lendstar',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phone: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Blacklisted',
  },
  {
    id: '4',
    organization: 'Lendsqr',
    username: 'Tosin Dokunmu',
    email: 'tosin@lendsqr.com',
    phone: '07003309226',
    dateJoined: 'Apr 10, 2020 10:00 AM',
    status: 'Active',
  },
]
