import { expect as baseExpect, mergeExpects, mergeTests } from "@playwright/test";
import { pageFixtures } from "@pages/page.fixtures";
import { matchers } from "@matchers/base.matchers";

export const test = mergeTests(pageFixtures)
export const expect = mergeExpects(baseExpect, matchers);