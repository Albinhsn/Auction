describe('HomeSearchInput.cy.js', () => {
    it('should visit', () => {
        cy.visit('http://localhost:3000')
        cy.get('#search-input').type("Nikon")
        cy.url().should('include', 'Nikon')
    })

})