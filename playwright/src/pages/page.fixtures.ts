import { test as baseTest } from '@playwright/test'
import { LoginPage } from '@pages/login.page'
import { SignUpPage } from '@pages/sign-up.page'
import { HomePage } from '@pages/home.page'
import { TopNavigationPage } from '@pages/top-navigation.page'
import { ProductsPage } from '@pages/products.page'
import { ContactUsPage } from './contact-us.page'

export const pageFixtures = baseTest.extend<PageTypes>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },

  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page))
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },

  topNavigationPage: async ({ page }, use) => {
    await use(new TopNavigationPage(page))
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page))
  },

  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page))
  },
})

export interface PageTypes {
  loginPage: LoginPage
  signUpPage: SignUpPage
  homePage: HomePage
  topNavigationPage: TopNavigationPage
  productsPage: ProductsPage
  contactUsPage: ContactUsPage
}
