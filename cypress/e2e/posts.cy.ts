
describe('Posts Page', () => {
  it('should login and CRUD', () => {
    // Start from the index page
    cy.visit('/')

    cy.get('[data-test="sign-in-by-name"]').type("Testing by cypress")
    cy.get('[data-test="sign-in-by-token"]').type("1f045fa13f266bb3e7dc51918dc4df0af050a87ed29bc481eb581f0ef5bf2dea")

    cy.get('[data-test="submit-form-modal"]').click();

    // should create a post into list page
    cy.get('[data-test="create-post"]').click();

    cy.get('body').find('[role="dialog"]').should('be.visible');

    cy.get('[data-test="form-field-title"]').type("Title testing by cypress")
    cy.get('[data-test="form-field-body"]').type("This is body testing created by cypress")

    cy.get('[data-test="submit-form-modal"]').click();

    cy.intercept('GET', 'https://gorest.co.in/public/v2/posts').then(() => {
      cy.get('[data-test="posts-list"]').should('exist');

      // should read a post at list
      cy.get('[data-test="posts-list"]', { timeout: 10000 })
        .eq(0)
        .within(() => {
          cy.get('[data-test="post-title-0"]').should("contain", "Title testing by cypress");
          cy.get('[data-test="post-body-0"]').should("contain", "This is body testing created by cypress");
          
          cy.get('[data-test="post-detail-0"]').click();
        })
  
      cy.wait(6000)

      cy.get('[data-test="back-button-detail-post"]').click();
    });

    // should update a post at list
    cy.get('[data-test="posts-list"]')
      .eq(0)
      .within(() => {
        cy.get('[data-test="post-edit-0"]').click();
      });
    
    cy.get('[data-test="submit-form-modal"]').click();

    // should delete a post at list
    cy.get('[data-test="posts-list"]')
      .eq(0)
      .within(() => {
        cy.get('[data-test="post-delete-0"]').click();
      });
    
    cy.get('[data-test="submit-confirm-modal"]').click();

  })
})
