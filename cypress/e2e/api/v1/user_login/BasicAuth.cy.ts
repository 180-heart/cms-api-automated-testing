describe("Authentication Test", () => {
  it("Should authenticate and save the JWT token", () => {
    cy.request({
      method: 'POST',
      url: 'http://20.92.231.254/api/v1/authenticate',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        username: 'admin@gmail.com',
        password: 'admin@123',
        identifier: '61b337c2-a3b6-405b-8c52-f9ad7522618e',
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the presence of the "message" field
      expect(response.body).to.have.property("message");
      expect(response.body.message).to.equal("Login Successful");

      // Assert the "user" object in the response body
      expect(response.body).to.have.property("user");
      expect(response.body.user).to.deep.equal({
        name: "Admin User",
        userid: 1,
        image: "Uploads/Images/Users/Photo_1697772551863_952.png"
      });

      // Assert that the "jwtoken" exists in the response body
      expect(response.body).to.have.property("jwtoken");

      // Save the JWT token in a variable available across all tests
      Cypress.env('jwtToken', response.body.jwtoken);

      // Assert response headers
      expect(response.headers).to.include({
        'access-control-allow-origin': '*',
        'content-type': 'application/json; charset=utf-8',
        // Add more headers as needed
      });
    });
  });
});
