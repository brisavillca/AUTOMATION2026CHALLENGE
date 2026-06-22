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