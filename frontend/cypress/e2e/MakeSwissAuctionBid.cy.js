describe('CreateAccount.cy.js', () => {
    it('should visit', () => {
        cy.visit('http://localhost:3000/login')



        cy.get('input[type="username"]').type("Arla@gmail.com")
        cy.get('input[type="password"]').type("this is strong password yes")

        cy.get('button[class="btn btn-primary"]').click()

        cy.wait(1000)

        cy.url().should('include', '/')

        cy.visit("http://localhost:3000/auction?auctionId=6247545c643cc19aaa52da91")

        cy.get("#current-bid").contains("Du har inte lagt något bud")
        cy.get("input[type='number']").type(7300)

        cy.get("button[id='make-bid-btn']").click()

        cy.wait(4000)

        cy.on('window:alert', (t) => {
            expect(t).to.eq("Du la ett bud på 7300")
          
        })

        cy.on('window:confirm', () => true)

        cy.get("#current-bid").contains("7300")


        //alert(`Du la ett bud på ${bid}`)

    })
})
