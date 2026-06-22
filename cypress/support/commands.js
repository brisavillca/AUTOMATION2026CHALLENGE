Cypress.Commands.add('consultarDisponibilidad', (checkIn, checkOut) => {

    cy.get('[type="text"]').eq(0)
        .clear()
        .type(checkIn)
    cy.get('[type="text"]').eq(1)
        .clear()
        .type(checkOut)
    cy.get('.btn.btn-primary').eq(1).click()
    cy.get('.btn.btn-primary').eq(2).click()
    cy.get('#doReservation').click()
})

Cypress.Commands.add('completarFormularioReserva', (user) => {
    cy.get('[name="firstname"]').type(user.FirstName)
    cy.get('[name="lastname"]').type(user.LastName)
    cy.get('[name="email"]').type(user.Email)
    cy.get('[name="phone"]').type(user.Phone)
})

Cypress.Commands.add('reservarHabitacion', (checkIn, checkOut) => {
    cy.get('.btn-primary').click()
    cy.get('.card-title.fs-4.fw-bold.mb-3')
        .should('be.visible')
        .and('contain', 'Booking Confirmed')
    cy.get('.text-center.pt-2')
        .should('be.visible')
        .and('contain', `${checkIn} - ${checkOut}`)
})

Cypress.Commands.add('eliminarReserva', (bookingId) => {
    cy.fixture('credencialesAdmin').then((adminData) => {

        const admin = adminData.adminValido

        cy.request({
            method: 'POST',
            url: 'https://automationintesting.online/api/auth/login',
            body: {
                username: admin.Username,
                password: admin.Password
            }
        }).then((loginResponse) => {

            const token = loginResponse.body.token

            cy.request({
                method: 'DELETE',
                url: `https://automationintesting.online/api/booking/${bookingId}`,
                failOnStatusCode: false,
                headers: {
                    Cookie: `token=${token}`
                }
            }).then((response) => {
                expect(response.status).to.eq(202)
            })

        })
    })
})

Cypress.Commands.add('verMsjsCamposObligatorios', () => {
    cy.get('.alert')
        .should('be.visible')
        .and('contain', 'Firstname should not be blank')
        .and('contain', 'must not be empty')
        .and('contain', 'Lastname should not be blank')
        .and('contain', 'must not be empty')
})

Cypress.Commands.add('verMsjErrorFN', () => {
    cy.get('.alert')
        .should('be.visible')
        .and('contain', 'size must be between 3 and 18')
})

Cypress.Commands.add('verMsjErrorLN', () => {
    cy.get('.alert')
        .should('be.visible')
        .and('contain', 'size must be between 3 and 30')
})

Cypress.Commands.add('verMsjErrorEmail', () => {
    cy.get('.alert')
        .should('be.visible')
        .and('contain', 'must be a well-formed email address')
})

Cypress.Commands.add('verMsjErrorPhone', () => {
    cy.get('.alert')
        .should('be.visible')
        .and('contain', 'size must be between 11 and 21')
})

Cypress.Commands.add('validarReservaExitosa', (alias) => {
    cy.wait(alias).then(({ response }) => {
        const bookingId = response.body.bookingid
        expect(response.statusCode).to.eq(201)
        cy.eliminarReserva(bookingId)
    })
})

Cypress.Commands.add('validarErrorReserva', (alias) => {
    cy.wait(alias).then(({ response }) => {
        expect(response.statusCode).to.eq(400)
    })
})