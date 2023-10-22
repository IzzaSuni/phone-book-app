describe("it will show contact list in first page load", () => {
  it("should display contact lists", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[datatype=contact-card]").should("be.visible");
  });
});
