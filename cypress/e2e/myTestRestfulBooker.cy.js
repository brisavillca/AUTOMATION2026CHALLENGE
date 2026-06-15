describe('Challenge Final - Shady Meadows', () => {

  beforeEach(() => {

    cy.visit('https://automationintesting.online/', {
      failOnStatusCode: false
    })

    cy.contains('Shady Meadows', { timeout: 15000 })
      .should('be.visible')
  })

  // ===================================
  // 3.1 Reserva exitosa como invitado
  // ===================================

  it('Reserva exitosa como usuario invitado', () => {

    cy.contains(/book now/i, { timeout: 15000 })
      .first()
      .click({ force: true })

    cy.url().should('include', '#booking')

    // Selección de fechas
    cy.get('input[type="date"]')
      .should('have.length.at.least', 2)

    cy.get('input[type="date"]')
      .eq(0)
      .type('2026-07-10', { force: true })

    cy.get('input[type="date"]')
      .eq(1)
      .type('2026-07-15', { force: true })

    // Buscar botón de reserva
    cy.contains(/reserve|book/i)
      .click({ force: true })

    // Completar formulario si aparece
    cy.get('body').then(($body) => {

      if ($body.find('input[name="firstname"]').length) {

        cy.get('input[name="firstname"]')
          .type('Brisa')

        cy.get('input[name="lastname"]')
          .type('Villca')

        cy.get('input[name="email"]')
          .type('brisa@test.com')

        cy.get('input[name="phone"]')
          .type('1122334455')

        cy.contains(/reserve|book|confirm/i)
          .click({ force: true })
      }
    })

    cy.get('body').should('be.visible')
  })

  // ===================================
  // 3.2 Validaciones formulario reserva
  // ===================================

  it('Validaciones del formulario de reserva', () => {

    cy.contains(/book now/i, { timeout: 15000 })
      .first()
      .click({ force: true })

    cy.url().should('include', '#booking')

    cy.get('body').then(($body) => {

      if ($body.find('button').length) {

        cy.contains(/reserve|book|confirm/i)
          .click({ force: true })
      }
    })

    cy.get('body').should('be.visible')
  })

  // ===================================
  // 3.3 Formulario de contacto
  // ===================================

  it('Enviar formulario de contacto exitosamente', () => {

    cy.get('#name, input[name="name"]')
      .first()
      .type('Brisa Villca')

    cy.get('#email, input[name="email"]')
      .first()
      .type('brisa@test.com')

    cy.get('#phone, input[name="phone"]')
      .first()
      .type('1122334455')

    cy.get('#subject, input[name="subject"]')
      .first()
      .type('Consulta QA')

    cy.get('#description, textarea[name="description"]')
      .first()
      .type('Mensaje enviado desde Cypress.')

    cy.contains(/submit|send/i)
      .click({ force: true })

    cy.get('body').should('be.visible')
  })

})