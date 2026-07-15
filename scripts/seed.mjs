import { faker } from '@faker-js/faker';

const BASE_URL = 'https://6a56018ab17de7bebbddaf48.mockapi.io/Organizations';

function generateFakeUser() {
    return {
        createdAt: faker.date.past().toISOString(),
        username: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        Organization: faker.company.name(),
        status: faker.helpers.arrayElement(['active', 'inactive']),

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

async function seed(count = 500) {
    let success = 0;
    let failed = 0;

    for (let i = 0; i < count; i++) {
        const user = generateFakeUser();

        try {
            const res = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            if (!res.ok) throw new Error(`Status ${res.status}`);

            success++;
            console.log(`✅ Seeded ${i + 1}/${count}`);
        } catch (err) {
            failed++;
            console.error(`❌ Failed at ${i + 1}:`, err.message);
        }

        // small delay to avoid hitting mockapi.io rate limits
        await new Promise((resolve) => setTimeout(resolve, 120));
    }

    console.log(`\nDone. Success: ${success}, Failed: ${failed}`);
}

seed(500);
