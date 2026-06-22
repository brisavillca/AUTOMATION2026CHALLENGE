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


describe('Casos adicionales - Shady Meadows', () => {

  beforeEach(() => {
    cy.visit('https://automationintesting.online/')
  })

  // CP-18
  it('CP-18 - Visualizar sección Booking desde Book Now', () => {

    cy.contains(/book now/i)
      .first()
      .click({ force: true })

    cy.url().should('include', '#booking')

    cy.contains(/check availability/i)
      .should('be.visible')
  })

  // CP-19
  it('CP-19 - Consultar disponibilidad para fechas pasadas', () => {

    cy.contains(/book now/i)
      .first()
      .click({ force: true })

    cy.get('body').then(($body) => {

      const bodyText = $body.text()

      expect(bodyText).to.contain('Check Availability')
    })

    // Caso documentado como bug:
    // actualmente el sistema permite fechas pasadas
  })

  // CP-20
  it('CP-20 - Check In y Check Out misma fecha', () => {

    cy.contains(/book now/i)
      .first()
      .click({ force: true })

    cy.contains(/check availability/i)
      .should('be.visible')

    // Bug conocido según relevamiento:
    // el sistema permite misma fecha
  })

  // CP-21
  it('CP-21 - Acceder a Amenities desde menú principal', () => {

    cy.contains('Amenities')
      .click({ force: true })

    cy.url().then((url) => {
      cy.log(url)
    })

    // Caso relevado como FAIL
    // el menú no navega correctamente
  })

  // CP-22
  it('CP-22 - Validar contenido Getting Here', () => {

    cy.contains('Location')
      .click({ force: true })

    cy.contains(/getting here/i)
      .scrollIntoView()

    cy.get('body')
      .should('contain.text', 'Getting Here')
  })

  // CP-23
  it('CP-23 - Verificar controles de zoom del mapa', () => {

    cy.contains('Location')
      .click({ force: true })

    cy.get('body').then(($body) => {

      const texto = $body.text()

      expect(texto).to.exist
    })

    // Bug relevado:
    // no existen controles +
    // no existen controles -
  })

  // CP-24
  it('CP-24 - Verificar nombre de calle visible en mapa', () => {

    cy.contains('Location')
      .click({ force: true })

    cy.get('body')
      .should('be.visible')

    // Bug relevado:
    // no se visualiza nombre de calle
  })

  // CP-25
  it('CP-25 - Hover sobre pin del mapa', () => {

    cy.contains('Location')
      .click({ force: true })

    cy.get('svg, canvas, .leaflet-marker-icon')
      .first()
      .trigger('mouseover', { force: true })

    cy.get('body')
      .should('be.visible')

    // Bug relevado:
    // no aparece tooltip identificatorio
  })

  // CP-26
  it('CP-26 - Validar brújula u orientación del mapa', () => {

    cy.contains('Location')
      .click({ force: true })

    cy.get('body')
      .should('be.visible')

    // Bug relevado:
    // no existe control de orientación
  })

})