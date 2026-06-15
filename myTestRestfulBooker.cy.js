describe('Challenge Final - Shady Meadows', () => {

    beforeEach(() => {
        cy.visit('https://automationintesting.online/')
    })

    // ==========================
    // 3.1 Reserva exitosa
    // ==========================

    it('Reserva exitosa como usuario invitado', () => {

        // Verificar habitaciones disponibles
        cy.get('.room-card').should('exist')

        // Abrir primera habitación disponible
        cy.get('.room-card')
            .first()
            .click()

        // Completar formulario
        cy.get('#firstname').type('Brisa')
        cy.get('#lastname').type('Villca')
        cy.get('#email').type('brisa@test.com')
        cy.get('#phone').type('1122334455')

        // Seleccionar fechas
        cy.get('input[name="checkin"]')
            .type('2026-07-10')

        cy.get('input[name="checkout"]')
            .type('2026-07-15')

        // Confirmar reserva
        cy.contains('Book').click()

        // Validación
        cy.contains(/booking|reserved|success/i)
            .should('be.visible')
    })


    // ==========================
    // 3.2 Validaciones formulario
    // ==========================

    it('Validaciones del formulario de reserva', () => {

        cy.get('.room-card')
            .first()
            .click()

        // Intentar reservar vacío
        cy.contains('Book').click()

        // Validar mensajes de error
        cy.contains(/firstname|required/i)
            .should('be.visible')

        cy.contains(/lastname|required/i)
            .should('be.visible')

        cy.contains(/email|required/i)
            .should('be.visible')

        cy.contains(/phone|required/i)
            .should('be.visible')

        // No debería aparecer mensaje exitoso
        cy.contains(/booking successful|reserved/i)
            .should('not.exist')
    })


    // ==========================
    // 3.3 Formulario de contacto
    // ==========================

    it('Enviar formulario de contacto exitosamente', () => {

        cy.get('#name').type('Brisa Villca')

        cy.get('#email')
            .type('brisa@test.com')

        cy.get('#phone')
            .type('1122334455')

        cy.get('#subject')
            .type('Consulta Cypress')

        cy.get('#description')
            .type('Mensaje enviado desde prueba automatizada.')

        cy.contains('Submit')
            .click()

        cy.contains(/thanks|success|message sent/i)
            .should('be.visible')
    })

})