import { expect as baseExpect } from '@playwright/test'
import { topNavbarMatchers } from '@matchers/top-navbar.matcher'

export const matchers = baseExpect.extend({...topNavbarMatchers})
