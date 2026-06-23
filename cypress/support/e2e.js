Cypress.on('uncaught:exception', () => {
  return false
})

import './commands'