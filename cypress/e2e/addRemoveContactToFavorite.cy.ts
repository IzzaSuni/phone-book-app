describe("it add and remove favorite contact", () => {
  it("should add contact favorite list", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[datatype=button-add-remove-favorite]")
      .eq(0)
      .should("be.visible")
      .click();
    cy.get("[datatype=button-add-remove-favorite]")
      .eq(1)
      .should("be.visible")
      .click();
    cy.get("[datatype=favorite-card]").should("be.visible");
  });

  it("should remmove contact favorite list", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[datatype=button-add-remove-favorite]")
      .eq(0)
      .should("be.visible")
      .click();
    cy.get("[datatype=button-add-remove-favorite]")
      .eq(0)
      .should("be.visible")
      .click();
    cy.get("[datatype=favorite-card]").should("not.exist");
  });
});
