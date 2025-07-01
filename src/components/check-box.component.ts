import { Locator, Page } from '@playwright/test'

export class CheckBoxComponent {
  constructor(readonly page: Page) {}

  async setCheckboxState(locator: Locator, check: boolean) {
    const checkBoxCurrentState = await locator.isChecked()
    if (check && !checkBoxCurrentState) {
      await locator.check()
    } else if (!check && checkBoxCurrentState) {
      await locator.uncheck()
    }
  }
}
