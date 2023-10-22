describe("it create and delete contact progressively", () => {
  it("should create new contact", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[datatype=button-show-modal-form-add-contact]")
      .should("be.visible")
      .click();

    cy.get("[datatype=modal-form-add-contact]").should("be.visible");
    cy.get("[datatype=field-contact-name]").type("izza damn99");
    cy.get("[datatype=field-contact-number]").type(`${new Date()}`);
    cy.get("[datatype=button-submit-form-add-contact]").click();

    cy.get("[datatype=contact-card]").first().contains("izza damn99");
  });

  it("should delete contact just added before", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[datatype=field-search-contact]").type("izza damn99");
    cy.get("[datatype=contact-card]").first().contains("izza damn99");
    cy.get("[datatype=button-edit-contact]").first().click();
    cy.get("[datatype=button-delete-form-add-contact]").click();
    cy.get(".notistack-Snackbar").click();
    cy.get("[datatype=screen-empty]").should("be.visible");
  });
});
