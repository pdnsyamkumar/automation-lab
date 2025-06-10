import { Locator, Page } from '@playwright/test'

export class CheckBoxComponent {
  constructor(readonly page: Page) {}

  async setCheckboxState(locator: Locator, check: boolean) {
    const checkBoxCurrentState = await locator.isChecked()
    if (check && !checkBoxCurrentState) {
      check ? await locator.check() : await locator.uncheck()
    }
  }
}
