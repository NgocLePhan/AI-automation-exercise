import { faker } from '@faker-js/faker';

export interface UserAccountData {
  title: 'Mr' | 'Mrs';
  name: string;
  email: string;
  password: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile_number: string;
}

/**
 * Generates a realistic dynamic user dataset for registration and checkout workflows.
 */
export function generateUserData(overrides: Partial<UserAccountData> = {}): UserAccountData {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const day = faker.number.int({ min: 1, max: 28 }).toString();
  const month = faker.number.int({ min: 1, max: 12 }).toString();
  const year = faker.number.int({ min: 1970, max: 2002 }).toString();

  return {
    title: faker.helpers.arrayElement(['Mr', 'Mrs']),
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName, provider: 'example.qa.com' }).toLowerCase(),
    password: faker.internet.password({ length: 12, memorable: false }),
    birth_date: day,
    birth_month: month,
    birth_year: year,
    firstname: firstName,
    lastname: lastName,
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'United States',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode('#####'),
    mobile_number: faker.phone.number({ style: 'national' }),
    ...overrides,
  };
}
