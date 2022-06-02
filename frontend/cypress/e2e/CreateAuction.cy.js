describe('PurchaseDutchAuc.cy.js', () => {
    it('should visit', () => {
        cy.visit('http://localhost:3000/login')



        cy.get('input[type="username"]').type("Arla@gmail.com")
        cy.get('input[type="password"]').type("this is strong password yes")

        cy.get('button[class="btn btn-primary"]').click()

        

        cy.url().should('include', '/')
        cy.wait(500)
        
        cy.get("#create-auc-nav").click()
        

        

        cy.get("#title").type("Test auc")

        cy.get('#condition').select('Perfekt')

        cy.get('#auctionType').select('Engelsk')

        cy.get("#english-bid-input").type(100)

        cy.get("#weight-input").type(10)

        cy.get("#volume-input").type(20)

        cy.get("#description-input").type("Lorem ipsum ")


        cy.get("#create-auc-btn").click()

        cy.wait(2000)

        cy.on('window:alert', (t) => {
            expect(t).to.eq("Auktionen skapades")
            
        })

        cy.on('window:confirm', () => true)


        cy.url().should('include', '/auction?auctionId=')
        //alert(`Du la ett bud på ${bid}`)

    })
})
