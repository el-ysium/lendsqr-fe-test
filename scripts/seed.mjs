import { faker } from '@faker-js/faker';
import { writeFileSync } from 'fs';

function generateFakeUser(id) {
  return {
    id: String(id),
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    Organization: faker.company.name(),
    status: faker.helpers.arrayElement(['active', 'inactive', 'pending', 'blacklisted']),

    personalInfo_fullName: faker.person.fullName(),
    personalInfo_bvn: faker.string.numeric(11),
    personalInfo_gender: faker.helpers.arrayElement(['Male', 'Female']),
    personalInfo_maritalStatus: faker.helpers.arrayElement([
      'Single',
      'Married',
      'Divorced',
      'Widowed',
    ]),
    personalInfo_residenceType: faker.helpers.arrayElement([
      "Parent's Apartment",
      'Rented Apartment',
      'Own Apartment',
    ]),

    employment_educationLevel: faker.helpers.arrayElement([
      'SSCE',
      'OND',
      'HND',
      'B.Sc',
      'M.Sc',
      'PhD',
    ]),
    employment_status: faker.helpers.arrayElement([
      'Employed',
      'Self-Employed',
      'Unemployed',
      'Student',
      'Retired',
    ]),
    employment_sector: faker.commerce.department(),
    employment_duration: faker.helpers.arrayElement([
      'Less than 1 year',
      '1-3 years',
      '3-5 years',
      '5-10 years',
      'Over 10 years',
    ]),
    employment_email: faker.internet.email(),
    employment_income: faker.helpers.arrayElement([
      '50,000 - 100,000',
      '100,000 - 200,000',
      '200,000 - 400,000',
      '400,000 - 800,000',
      '800,000+',
    ]),
    employment_loanRepayment: faker.finance.amount({ min: 10000, max: 100000, dec: 2 }),

    socials_twitter: `@${faker.internet.username()}`,
    socials_facebook: faker.person.fullName(),
    socials_instagram: `@${faker.internet.username()}`,

    guarantor1_fullName: faker.person.fullName(),
    guarantor1_phone: faker.phone.number(),
    guarantor1_email: faker.internet.email(),
    guarantor1_relationship: faker.helpers.arrayElement([
      'Sibling',
      'Parent',
      'Friend',
      'Colleague',
      'Spouse',
    ]),

    guarantor2_fullName: faker.person.fullName(),
    guarantor2_phone: faker.phone.number(),
    guarantor2_email: faker.internet.email(),
    guarantor2_relationship: faker.helpers.arrayElement([
      'Sibling',
      'Parent',
      'Friend',
      'Colleague',
      'Spouse',
    ]),
  };
}

const users = Array.from({ length: 500 }, (_, i) => generateFakeUser(i + 1));

writeFileSync('db.json', JSON.stringify({ users }, null, 2));

console.log(`Generated ${users.length} users into db.json`);