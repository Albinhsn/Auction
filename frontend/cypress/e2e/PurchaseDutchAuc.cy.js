describe('PurchaseDutchAuc.cy.js', () => {
    it('should visit', () => {
        cy.visit('http://localhost:3000/login')



        cy.get('input[type="username"]').type("Arla@gmail.com")
        cy.get('input[type="password"]').type("this is strong password yes")

        cy.get('button[class="btn btn-primary"]').click()

        cy.wait(1000)

        cy.url().should('include', '/')

        cy.visit("http://localhost:3000/auction?auctionId=6247545c643cc19aaa52da93")

        cy.get("#make-purchase-btn").click()


        cy.wait(2000)

        cy.on('window:alert', (t) => {
            expect(t).to.eq("Grattis du vann auktionen")
          
        })

        cy.on('window:confirm', () => true)

        cy.get("#finished-date").contains("Slutade:")


        //alert(`Du la ett bud på ${bid}`)

    })
})
