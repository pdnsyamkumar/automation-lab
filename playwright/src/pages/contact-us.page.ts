import { ContactUsData } from '@testData/contact-us.testdata'
import { BasePage } from './base.page'
import path from 'path'

export class ContactUsPage extends BasePage {
  readonly getContactUsLint = () =>
    this.page.getByRole('link', { name: 'Contact Us' })
  readonly getContactUsTitle = () =>
    this.page.getByRole('heading', { name: 'Contact Us' })
  readonly getGetInTouchTitle = () =>
    this.page.getByRole('heading', { name: 'Get in Touch' })
  readonly getNameInput = () => this.page.getByTestId(`name`)
  readonly getEmailInput = () => this.page.getByTestId(`email`)
  readonly getSubjectInput = () => this.page.getByTestId(`subject`)
  readonly getMessageInput = () => this.page.getByTestId(`message`)
  readonly getUploadFileInput = () => this.page.locator(`input[type="file"]`)
  readonly getSubmitButton = () => this.page.getByTestId(`submit-button`)
  readonly getSuccessMessage = () =>
    this.page.locator(`//div[contains(@class, 'status')]`)
  readonly getHomeButton = () => this.page.locator(`.btn-success`)

  /**
   * Navigates to the Contact Us page by clicking the Contact Us link and waiting for the page to load.
   */
  async navigateToContactUsPage() {
    await this.getContactUsLint().click()
    await this.page.waitForLoadState('load')
  }

  /**
   * Fills the contact form with the provided data.
   * @param contactUsFormData - The data to fill in the contact form fields.
   */
  async fillContactForm(contactUsFormData: ContactUsData) {
    await this.getNameInput().fill(contactUsFormData.name)
    await this.getEmailInput().fill(contactUsFormData.email)
    await this.getSubjectInput().fill(contactUsFormData.subject)
    await this.getMessageInput().fill(contactUsFormData.message)
  }

  /**
   * Uploads a file using the file input in the contact form.
   * @param filepath - The path to the file to upload.
   */
  async uploadFile(filepath: string, filename: string = 'sample.pdf') {
    await this.getUploadFileInput().setInputFiles(path.join(filepath, filename))
  }

  /**
   * Submits the contact form and waits for the page to load.
   */
  async submitContactUsForm() {
    this.page.once('dialog', (dialog) => dialog.accept())
    await this.getSubmitButton().click()
    await this.page.waitForLoadState('load')
  }
}
