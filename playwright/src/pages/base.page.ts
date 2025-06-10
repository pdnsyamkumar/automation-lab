import { Page } from "@playwright/test";
import { CheckBoxComponent } from "@components/check-box.component";

export class BasePage {
    readonly checkBoxComponent: CheckBoxComponent
    constructor(readonly page: Page) {
        this.checkBoxComponent = new CheckBoxComponent(this.page);
    }
}