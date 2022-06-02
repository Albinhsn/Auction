describe('HomeSearch.cy.js', () => {
  it('should visit', () => {
    cy.visit('http://localhost:3000')
    cy.get('#link-Nikon').click()
    cy.url().should('include', 'Nikon')
  })
  
})
