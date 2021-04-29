describe("Bookmark page tests:", function(){
    
    beforeEach(function(){
        cy.task("resetDb");
        cy.visit('/bookmarks')
    })

    it("Checks for a form and add button", function(){
            cy.get('#addForm').should('be.visible')
            cy.get('#addButton').should('be.visible')  
    })

    it("Adds a new bookmark", function(){
        cy.get('#addForm').type('https://developer.mozilla.org/en-US/')
        cy.get('#addButton').click()  
    })

    it("Checks for header:", function(){
            cy.contains('Bookmarks');
    })

    it("Checks for a delete button and checks that item is deleted", function(){
        cy.get('#addForm').type('https://developer.mozilla.org/en-US/')
        cy.get('#addButton').click()
        cy.get('#addForm').type('https://google.com')
        cy.get('#addButton').click()  
        cy.get('#delete-button-1').click()
        cy.contains('https://google.com').should('not.exist')
    })
    it("Check for an update button", function() {
        cy.get('#addForm').type('https://tobeEdited.co.uk')
        cy.get('#addButton').click()
        cy.get('#update-button-0').should('be.visible')
    })
}) 