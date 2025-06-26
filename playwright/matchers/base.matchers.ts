import { expect as baseExpect } from '@playwright/test'
import { topNavbarMatchers } from '@matchers/top-navbar.matcher'
import { productsMatcher } from '@matchers/products.matcher'

export const matchers = baseExpect.extend({
  ...topNavbarMatchers,
  ...productsMatcher,
})
