describe("Requests to /api/v1/category", () => {
  
  before(() => {
    // Authenticate and save the JWT token
    cy.authenticateAndSaveToken();
  });
    
  it("Should successfully fetch categories", () => {
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Perform the GET request with the 'jwtoken' in headers
    cy.request({
      method: 'GET',
      url: 'http://20.92.231.254/api/v1/category',
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken, // Use the 'jwtoken' variable
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response body structure
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);

      // Assuming the response is an array of categories
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('name');
      expect(response_body).to.have.property('description');
      expect(response_body).to.have.property('createdby');
      expect(response_body).to.have.property('createddate');
      expect(response_body).to.have.property('modifiedby');
      expect(response_body).to.have.property('modifieddate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('identifier');
    });
  });

  it("Should successfully add a category", () => {

    cy.pause()

    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');
  
    // Perform the POST request
    cy.request({
      method: 'POST',
      url: 'http://20.92.231.254/api/v1/category',
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
        'Content-Type': 'application/json',
      },
      body: {
        name: "category_post",
        description: "category_description",
        userid: 1,
      },
    }).then((response) => {
      if (response.status === 201) {
        // Success case
        expect(response.status).to.eq(201);
  
        // Assert the response structure and properties
        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("results");

        // Assert specific fields in the response
        expect(response.body.results[0].name).to.equal("category_post");
        expect(response.body.results[0].description).to.equal("category_description");
        expect(response.body.results[0].createdby).to.equal(1);
  
        // Extract and save the identifier to a variable
        Cypress.env('identifier', response.body.results[0].identifier);
  
        // Access the saved identifier
        const identifier = Cypress.env('identifier');
  
        // Print the created identifier to the console
        cy.log(`Identifier: ${identifier}`);
  
      }
    });
  });
  

  it("Should successfully fetch a specific category with required fields", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the 'identifier" from Cypress enviroment
    const identifier = Cypress.env('identifier');

    // Perform the GET request with the 'identifier'
    cy.request({
        method: 'GET',
        url: `http://20.92.231.254/api/v1/category/${identifier}`,
        headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
        },
    }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(200);

        // Assert the 'identifier' field matches the expected identifier
        expect(response.body[0]).to.have.property('identifier', identifier);

        // Check the presence of other required fields
        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('name');
        expect(response.body[0]).to.have.property('description');
        expect(response.body[0]).to.have.property('createdby');
        expect(response.body[0]).to.have.property('createddate');
        expect(response.body[0]).to.have.property('modifiedby');
        expect(response.body[0]).to.have.property('modifieddate');
        expect(response.body[0]).to.have.property('isactive');
    });
  });

  it("Should successfully update a specific category", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the 'identifier" from Cypress enviroment
    const identifier = Cypress.env('identifier');

    // Perform the PUT request
    cy.request({
        method: 'PUT',
        url: `http://20.92.231.254/api/v1/category/${identifier}`,
        headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
        'Content-Type': 'application/json',
        },
        body: {
        name: "category_updated",
        description: "category_updated",
        userid: 1,
        },
    }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(200);

        // Assert the response message
        expect(response.body).to.equal(`Category modified with ID: ${identifier}`);
    });
  });

  it("Should successfully delete a specific category", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the 'identifier" from Cypress enviroment
    const identifier = Cypress.env('identifier');

    // Perform the DELETE request with the 'categoryIdentifier' in the URL
    cy.request({
      method: 'DELETE',
      url: `http://20.92.231.254/api/v1/category/${identifier}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response message
      expect(response.body).to.equal(`Category deleted with ID: ${identifier}`);
    });
  });
});