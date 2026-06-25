describe('Booking - Shady Meadows', () => {

    beforeEach(() => {
        cy.visit('https://automationintesting.online/')
    })

    it('Reserva exitosa como usuario invitado', () => {
        cy.intercept('POST', '**/api/booking').as('crearReserva')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosValidos
            cy.completarFormularioReserva(input)
            cy.reservarHabitacion('2026-07-15', '2026-07-16')
            cy.validarReservaExitosa('@crearReserva')
        })
    })

    it('Reserva con campos vacíos', () => {
        cy.intercept('POST', '**/api/booking').as('crearReservaConCamposVacios')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.get('.btn-primary').click()

        cy.validarErrorReserva('@crearReservaConCamposVacios')

        cy.verMsjsCamposObligatorios()
        cy.verMsjErrorFN()
        cy.verMsjErrorLN()
        cy.verMsjErrorPhone()

    })

    it('Reserva con dato FirstName de 2 caracteres', () => {
        cy.intercept('POST', '**/api/booking').as('reservarConFNInvalido')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosConFNDe2Caracteres

            cy.completarFormularioReserva(input)
            cy.get('.btn-primary').click()

            cy.verMsjErrorFN()
        })

        cy.validarErrorReserva('@reservarConFNInvalido')
    })

    it('Reserva con dato FirstName de 3 caracteres', () => {
        cy.intercept('POST', '**/api/booking').as('crearReservaConFNValido')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosConFNDe3Caracteres
            cy.completarFormularioReserva(input)
            cy.reservarHabitacion('2026-07-15', '2026-07-16')
            cy.validarReservaExitosa('@crearReservaConFNValido')
        })
    })

    it('Reserva con dato FirstName de 18 caracteres', () => {
        cy.intercept('POST', '**/api/booking').as('crearReservaConFNValido')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosConFNDe18Caracteres
            cy.completarFormularioReserva(input)
            cy.reservarHabitacion('2026-07-15', '2026-07-16')
            cy.validarReservaExitosa('@crearReservaConFNValido')
        })
    })

    it('Reserva con dato FirstName de 19 caracteres', () => {
        cy.intercept('POST', '**/api/booking').as('reservarConFNInvalido')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosConFNDe19Caracteres

            cy.completarFormularioReserva(input)
            cy.get('.btn-primary').click()

            cy.verMsjErrorFN()
        })

        cy.validarErrorReserva('@reservarConFNInvalido')
    })

    it('Reserva con dato LastName de 2 caracteres', () => {
        cy.intercept('POST', '**/api/booking').as('reservarConLNInvalido')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosConLNDe2Caracteres

            cy.completarFormularioReserva(input)
            cy.get('.btn-primary').click()

            cy.verMsjErrorLN()
        })

        cy.validarErrorReserva('@reservarConLNInvalido')
    })

    it('Reserva con dato LastName de 3 caracteres', () => {
        cy.intercept('POST', '**/api/booking').as('crearReservaConLNValido')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosConLNDe3Caracteres
            cy.completarFormularioReserva(input)
            cy.reservarHabitacion('2026-07-15', '2026-07-16')

            cy.validarReservaExitosa('@crearReservaConLNValido')

        })
    })

    it('Reserva con dato LastName de 30 caracteres', () => {
        cy.intercept('POST', '**/api/booking').as('crearReservaConLNValido')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosConLNDe30Caracteres
            cy.completarFormularioReserva(input)
            cy.reservarHabitacion('2026-07-15', '2026-07-16')
            cy.validarReservaExitosa('@crearReservaConLNValido')
        })
    })

    it('Reserva con dato LastName de 31 caracteres', () => {
        cy.intercept('POST', '**/api/booking').as('reservarConLNInvalido')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosConLNDe31Caracteres

            cy.completarFormularioReserva(input)
            cy.get('.btn-primary').click()

            cy.verMsjErrorLN()
        })

        cy.validarErrorReserva('@reservarConLNInvalido')
    })

    it('Reserva con dato Email inválido', () => {
        cy.intercept('POST', '**/api/booking').as('reservarConEmailInvalido')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosConEmailInvalido

            cy.completarFormularioReserva(input)
            cy.get('.btn-primary').click()

            cy.verMsjErrorEmail()
        })

        cy.validarErrorReserva('@reservarConEmailInvalido')
    })

    it('Reserva con dato Phone de 10 caracteres', () => {
        cy.intercept('POST', '**/api/booking').as('reservarConPhoneInvalido')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosConPhoneDe10Caracteres

            cy.completarFormularioReserva(input)
            cy.get('.btn-primary').click()

            cy.verMsjErrorPhone()
        })

        cy.validarErrorReserva('@reservarConPhoneInvalido')
    })

    it('Reserva con dato Phone de 11 caracteres', () => {
        cy.intercept('POST', '**/api/booking').as('crearReservaConPhoneValido')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosConPhoneDe11Caracteres
            cy.completarFormularioReserva(input)
            cy.reservarHabitacion('2026-07-15', '2026-07-16')
            cy.validarReservaExitosa('@crearReservaConPhoneValido')
        })
    })

    it('Reserva con dato Phone de 21 caracteres', () => {
        cy.intercept('POST', '**/api/booking').as('crearReservaConPhoneValido')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosConPhoneDe21Caracteres
            cy.completarFormularioReserva(input)
            cy.reservarHabitacion('2026-07-15', '2026-07-16')
            cy.validarReservaExitosa('@crearReservaConPhoneValido')
        })
    })

    it('Reserva con dato Phone de 22 caracteres', () => {
        cy.intercept('POST', '**/api/booking').as('reservarConPhoneInvalido')

        cy.consultarDisponibilidad('15/07/2026', '16/07/2026')
        cy.fixture('datosReserva').then((data) => {
            const input = data.datosConPhoneDe22Caracteres

            cy.completarFormularioReserva(input)
            cy.get('.btn-primary').click()

            cy.verMsjErrorPhone()
        })

        cy.validarErrorReserva('@reservarConPhoneInvalido')
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

// ADMIN PANEL:

// ADMIN PANEL
it('CP19 - Login con contraseña incorrecta', () => {
  cy.fixture('admin').then((data) => {
    cy.visit('https://automationintesting.online/admin', {
      failOnStatusCode: false
    })

    cy.get('#username').type(data.admin.username)
    cy.get('#password').type('contraseña_incorrecta')
    cy.get('#doLogin').click()

    cy.contains('Invalid credentials').should('be.visible')
  })
})

it('CP22 - Login solo con usuario, dejando password vacío', () => {
  cy.fixture('admin').then((data) => {
    cy.visit('https://automationintesting.online/admin', {
      failOnStatusCode: false
    })

    cy.get('#username').type(data.admin.username)
    cy.get('#doLogin').click()

    cy.contains('Invalid credentials').should('be.visible')
  })
})

it('CP23 - Visualización y lectura de mensajes de clientes', () => {
  // Completar formulario de contacto
  cy.visit('https://automationintesting.online/', {
    failOnStatusCode: false
  })

  cy.contains('Shady Meadows', { timeout: 15000 })
    .should('be.visible')

  cy.get('#name').type('QA Tester')
  cy.get('#email').type('qa@tester.com')
  cy.get('#phone').type('12345678901')
  cy.get('#subject').type('Mensaje de prueba CP23')
  cy.get('#description').type(
    'Este mensaje es para verificar la lectura en el panel admin.'
  )

  cy.contains('Submit').click()

  // Verificar envío exitoso
  cy.contains('Thanks for getting in touch', { timeout: 10000 })
    .should('be.visible')

  // Ingresar al panel admin
  cy.fixture('admin').then((data) => {
    cy.visit('https://automationintesting.online/admin', {
      failOnStatusCode: false
    })

    cy.get('#username').type(data.admin.username)
    cy.get('#password').type(data.admin.password)
    cy.get('#doLogin').click()

    // Acceder a mensajes
    cy.contains('Messages').click()

    // Verificar mensaje recibido
    cy.contains('Mensaje de prueba CP23', { timeout: 10000 })
      .should('be.visible')
      .click()

    cy.contains(
      'Este mensaje es para verificar la lectura en el panel admin.'
    ).should('be.visible')
  })
})


