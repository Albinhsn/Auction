describe('CreateAccount.cy.js', () => {
    it('should visit', () => {
        cy.visit('http://localhost:3000/signup')
        cy.get('#email').type("Arla@gmail.com")
        cy.get('#matchingEmail').type("Arla@gmail.com")
        cy.get('#name').type("Arlaharen")
        cy.get('#password').type("this is strong password yes")
        cy.get('#matchingPassword').type("this is strong password yes")
        cy.get('#submit-btn').click()
        cy.wait(4000)
        cy.on('window:alert' , (t) => {
            expect(t).to.eq("Kontot skapades, var vänligen logga in")
        })

        cy.on('window:confirm', ()=> true)

        cy.url().should('include', '/login')

        cy.get('input[type="username"]').type("Arla@gmail.com")
        cy.get('input[type="password"]').type("this is strong password yes")

        cy.get('button[class="btn btn-primary"]').click()


        cy.url().should('include', '/')

        cy.get("a[id=logout]").click()

        cy.contains('Login').should('be.visible')
    })

})


