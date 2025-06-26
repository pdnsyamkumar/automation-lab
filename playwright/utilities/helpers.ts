import fs from 'fs'
import path from 'path'

/**
 * Reads the CSRF token from the guest-user.json file in the auth directory.
 */
export function getCsrfTokenFromAuth() {
  const authFilePath = path.resolve(__dirname, '../auth/guest-user.json')
  try {
    const data = fs.readFileSync(authFilePath, 'utf-8')
    const json = JSON.parse(data)
    // Adjust the path to the token as per the actual structure of guest-user.json
    return json.csrftoken
  } catch (error) {
    console.error('Error reading CSRF token:', error)
  }
}
