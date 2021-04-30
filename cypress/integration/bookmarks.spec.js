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

	context('Update URL functionality', () => {
		beforeEach(() => {
			cy.get('#addForm').type('https://tobeEdited.co.uk')
			cy.get('#addButton').click()
		})

		it("Check for an update button", function() {
			cy.get('#update-button-0').should('be.visible')
		})

		it('navigates to bookmark edit page', () => {
			cy.get('#update-button-0').click();
			cy.url().should('include', '/edit/');
		})

		it('edit page displays correct stuff', () => {
			cy.get('#update-button-0').click();
			cy.contains('https://tobeEdited.co.uk');
			cy.get('#update-text').should('be.visible');
			cy.get('#update-button').should('have.value', 'Update');
		})

		it('Check that url is updated', () => {
			cy.get('#update-button-0').click();
			cy.get('#update-text').type('https://Edited.co.uk');
			cy.get('#update-button').click();
			cy.get('#bookmark-0').contains('https://Edited.co.uk');
		})
	})

	context.only('Comments section', () => {
		beforeEach(() => {
			cy.get('#addForm').type('https://AddCommentsToEdited.co.uk')
			cy.get('#addButton').click()
			cy.get('#update-button-0').click();
		})

		it('shows comment form', () => {
			cy.get('#comment-text').should('be.visible');
			cy.get('#comment-submit').should('have.value', 'Add Comment');
		})

		it('displays a new comment', () => {
			cy.get('#comment-text').type('First Comment');
			cy.get('#comment-submit').click();
			cy.get('#comments').contains('First Comment');
		})

		it('can delete a comment', () => {
			cy.get('#comment-text').type('First Comment');
			cy.get('#comment-submit').click();
			cy.get('#comment-0-delete').should('have.value', 'Delete');
			cy.get('#comment-0-delete').click();
			cy.get('#comment-0').should('not.exist');
		})
	})
	context.only('Tags section', () => {
		beforeEach(() => {
			cy.get('#addForm').type('https://AddCommentsToEdited.co.uk')
			cy.get('#addButton').click()
			cy.get('#update-button-0').click();
		})
		it('Shows a form for the tags', () => {
			cy.get('#addTag').should('be.visible');
			cy.get('#addTag-button').should('have.value', 'Add Tag');
		})
		it('can add a tag to the comment', () => {
			cy.get('#addTag').type('First Tag');
			cy.get('#addTag-button').click()
			cy.get('#tags').contains('First Tag');
		})
	})
}) 