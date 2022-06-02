describe('HomeSearchInput.cy.js', () => {
    it('should visit', () => {
        cy.visit('http://localhost:3000')
        cy.get('#search-input').type("Nikon")
        cy.get('#search-btn').click()
        cy.url().should('include', 'Nikon')
    })

})