import {
  expect as baseExpect,
  mergeExpects,
  mergeTests,
} from '@playwright/test'
import { pageFixtures } from '@pages/page.fixtures'
import { matchers } from '@matchers/base.matchers'
import { apiFixtures } from '@apis/api.fixtures'
import { testDataFixtures } from '@testData/testdata.fixtures'

export const test = mergeTests(pageFixtures, apiFixtures, testDataFixtures)
export const expect = mergeExpects(baseExpect, matchers)
