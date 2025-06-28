import { Country, NamePrefix } from '@utilities/enums'

const firstName = 'Dola Naga Syam Kumar'
const lastName = 'Peraka'
export const exitingUserData = {
  namePrefix: NamePrefix.MRS_,
  firstName,
  lastName,
  name: `${firstName} ${lastName}`,
  email: 'pdnsyamkumar@gmail.com',
  password: `Pdnsk@0173`,
  dateOfBirth: {
    day: '24',
    month: 'May',
    year: '1996',
  },
  signUpForOurNewsLetter: false,
  receiveSpecialOffersFromOurPartners: false,
  company: 'PDNSK',
  address: '8-3-234/447',
  address2: 'LN Nagar',
  country: Country.INDIA,
  state: 'Telangana',
  city: 'Hyderabad',
  zipCode: '500045',
  mobileNumber: '9014117617',
}
