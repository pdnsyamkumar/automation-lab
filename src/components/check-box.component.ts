import { Locator, Page } from '@playwright/test'

export class CheckBoxComponent {
  constructor(readonly page: Page) {}

  async setCheckboxState(locator: Locator, check: boolean) {
    const checkBoxCurrentState = await locator.isChecked()
    if (check && !checkBoxCurrentState) {
      if (check) {
        await locator.check()
      } else {
        await locator.uncheck()
      }
    }
  }
}
