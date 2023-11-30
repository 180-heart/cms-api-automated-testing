describe("Requests to /api/v1/users", () => {
  before(() => {
      // Authenticate and save the JWT token
      cy.authenticateAndSaveToken();
  });
  it("Should successfully retrieve users", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Send a GET request to the API endpoint
    cy.request({
      method: 'GET',
      url: 'http://20.92.231.254/api/v1/users',
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response body structure
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);

      // Assuming the response contains user data
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('firstname');
      expect(response_body).to.have.property('lastname');
      expect(response_body).to.have.property('fullname');
      expect(response_body).to.have.property('email');
      expect(response_body).to.have.property('dob');
      expect(response_body).to.have.property('mobilenumber');
      expect(response_body).to.have.property('current180hr');
      expect(response_body).to.have.property('createdby');
      expect(response_body).to.have.property('createddate');
      expect(response_body).to.have.property('modifiedby');
      expect(response_body).to.have.property('modifieddate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('image');
      expect(response_body).to.have.property('identifier');
      expect(response_body).to.have.property('isadmin');

      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;

      // Print the retrieved data to the console
      cy.log(JSON.stringify(response_body, null, 2));
    });
  });

  it("Should successfully create a user", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Send a POST request to the API endpoint
    cy.request({
      method: 'POST',
      url: 'http://20.92.231.254/api/v1/users',
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
        'Content-Type': 'application/json',
      },
      body: {
        firstname: "user_first_name_post",
        lastname: "user_last_name",
        email: "user_post@gmail.com",
        dob: "1990-10-10T00:00:00.000Z",
        mobilenumber: "9191919191",
        password: "user_password",
        image: "base64 Image",
        userid: 1,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(201);

      // Assert the response body structure
      expect(response.body).to.have.property('message');
      expect(response.body).to.have.property('results');
      expect(response.body.results).to.be.an('array');
      expect(response.body.results.length).to.be.greaterThan(0);

      // Assuming the response contains the created user data
      const response_body = response.body.results[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('firstname');
      expect(response_body).to.have.property('lastname');
      expect(response_body).to.have.property('fullname');
      expect(response_body).to.have.property('email');
      expect(response_body).to.have.property('dob');
      expect(response_body).to.have.property('mobilenumber');
      expect(response_body).to.have.property('current180hr');
      expect(response_body).to.have.property('createdby');
      expect(response_body).to.have.property('createddate');
      expect(response_body).to.have.property('modifiedby');
      expect(response_body).to.have.property('modifieddate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('image');
      expect(response_body).to.have.property('identifier');

      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.firstname).to.equal("user_first_name_post");
      expect(response_body.lastname).to.equal("user_last_name");
      expect(response_body.email).to.equal("user_post@gmail.com");
      expect(response_body.dob).to.equal("1990-10-10T00:00:00.000Z");
      expect(response_body.mobilenumber).to.equal("9191919191");
      expect(response_body.createdby).to.equal(1);

      // Extract and save the identifier to a variable
      const identifier = response_body.identifier;
      Cypress.env('identifier', identifier);

      // Print the created identifier to the console
      cy.log(`identifier: ${identifier}`);
    });
  });

  it("Should successfully get user data", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the identifier from the Cypress environment
    const identifier = Cypress.env('identifier');

    // Send a GET request to the API endpoint
    cy.request({
      method: 'GET',
      url: `http://20.92.231.254/api/v1/users/${identifier}`,
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response body structure
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);

      // Assuming the response contains the user data
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('firstname');
      expect(response_body).to.have.property('lastname');
      expect(response_body).to.have.property('fullname');
      expect(response_body).to.have.property('email');
      expect(response_body).to.have.property('dob');
      expect(response_body).to.have.property('mobilenumber');
      expect(response_body).to.have.property('current180hr');
      expect(response_body).to.have.property('createdby');
      expect(response_body).to.have.property('createddate');
      expect(response_body).to.have.property('modifiedby');
      expect(response_body).to.have.property('modifieddate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('image');
      expect(response_body).to.have.property('identifier');

      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.firstname).to.equal("user_first_name_post");
      expect(response_body.lastname).to.equal("user_last_name");
      expect(response_body.email).to.equal("user_post@gmail.com");
      expect(response_body.dob).to.equal("1990-10-10T00:00:00.000Z");
      expect(response_body.mobilenumber).to.equal("9191919191");
      expect(response_body.createdby).to.equal(1);
      expect(response_body.identifier).to.equal(identifier);
    });
  });

  it("Should successfully update user data", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the identifier from the Cypress environment
    const identifier = Cypress.env('identifier');

    // Send a PUT request to the API endpoint
    cy.request({
      method: 'PUT',
      url: `http://20.92.231.254/api/v1/users/${identifier}`,
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
        'Content-Type': 'application/json',
      },
      body: {
        firstname: "user_first_name_updated",
        lastname: "user_last_name_updated",
        email: "abc@gmail.com",
        dob: "1990-10-10T00:00:00.000Z",
        mobilenumber: "9191919191",
        password: "user_password",
        image: "base64 Image",
        userid: 1,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response body structure
      expect(response.body).to.equal(`user modified with ID: ${identifier}`);
    });
  });

  it("Should successfully delete a user", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the identifier from the Cypress environment
    const identifier = Cypress.env('identifier');

    // Send a DELETE request to the API endpoint
    cy.request({
      method: 'DELETE',
      url: `http://20.92.231.254/api/v1/users/${identifier}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response body structure
      expect(response.body).to.equal(`user deleted with ID: ${identifier}`);
    });
  });
});