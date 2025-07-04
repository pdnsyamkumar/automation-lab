import { Country, NamePrefix } from '@utilities/enums'

const firstName = 'Test'
const lastName = 'User'
export const existingUserData = {
  namePrefix: NamePrefix.MRS_,
  firstName,
  lastName,
  name: `${firstName} ${lastName}`,
  email: 'test.user@example.com',
  password: 'TestPassword123!',
  dateOfBirth: {
    day: '1',
    month: 'January',
    year: '1990',
  },
  signUpForOurNewsLetter: false,
  receiveSpecialOffersFromOurPartners: false,
  company: 'Test Company',
  address: '123 Test Street',
  address2: 'Test City',
  country: Country.INDIA,
  state: 'Telangana',
  city: 'Hyderabad',
  zipCode: '500045',
  mobileNumber: '9999999999',
}
