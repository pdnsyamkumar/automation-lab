import { test as baseTest } from '@playwright/test'
import { SignUpPage } from '@pages/sign-up.page'
import { HomePage } from '@pages/home.page'
import { TopNavigationPage } from '@pages/top-navigation.page'

export const pageFixtures = baseTest.extend<PageTypes>({
signUpPage: async ({page}, use) => {
    await use(new SignUpPage(page))
  },

homePage: async ({page}, use) => {
  await use(new HomePage(page))
},
topNavigationPage: async ({page}, use) => {
  await use(new TopNavigationPage(page))
}
})

export interface PageTypes {
 signUpPage: SignUpPage
 homePage: HomePage
 topNavigationPage: TopNavigationPage
}