describe("Requests to /api/v1/messaging", () => {
  before(() => {
      // Authenticate and save the JWT token
      cy.authenticateAndSaveToken();
  });

  it("Should successfully fetch messaging data", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Send a GET request to the API endpoint
    cy.request({
      method: 'GET',
      url: 'http://20.92.231.254/api/v1/messaging',
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

      // Assuming the response is an array of messaging data
      const resposne_body = response.body[0];
      expect(resposne_body).to.have.property('id');
      expect(resposne_body).to.have.property('name');
      expect(resposne_body).to.have.property('createdby');
      expect(resposne_body).to.have.property('createddate');
      expect(resposne_body).to.have.property('modifiedby');
      expect(resposne_body).to.have.property('modifieddate');
      expect(resposne_body).to.have.property('isactive');
      expect(resposne_body).to.have.property('image');
      expect(resposne_body).to.have.property('identifier');

      // add more specific assertions for the data values if needed
      expect(resposne_body.isactive).to.be.true;
    });
  });

    
  it("Should successfully add messaging data", () => {
      cy.pause();
      // Retrieve the 'jwtToken' from Cypress environment
      const jwtToken = Cypress.env('jwtToken');
  
      // Send a POST request to the API endpoint
      cy.request({
      method: 'POST',
      url: 'http://20.92.231.254/api/v1/messaging',
      headers: {
          accept: 'application/json',
          'X-ACCESS-TOKEN': jwtToken,
          'Content-Type': 'application/json',
      },
      body: {
          name: "messaging_post",
          image: "base64 Image",
          userid: 1, 
      },
      }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(201);
  
      // Assert the response body structure
      expect(response.body).to.have.property("message");
      expect(response.body).to.have.property("results");
  
      // Extract the first messaging data from the response
      const response_body = response.body.results[0];
  
      // Assert that the properties in the response match the request body
      expect(response_body.name).to.equal("messaging_post");
      expect(response_body.createdby).to.equal(1);
      expect(response_body.isactive).to.be.true;
      expect(response_body).to.have.property("image");
      expect(response_body).to.have.property('identifier');

      // Extract and save the identifier to a variable
      const identifier = response_body.identifier;
      Cypress.env('identifier', identifier);

      // Print the created identifier to the console
      cy.log(`identifier: ${identifier}`);
      });
  });

  it("Should successfully fetch messaging data by identifier", () => {
      cy.pause();
      // Retrieve the 'jwtToken' from Cypress environment
      const jwtToken = Cypress.env('jwtToken');
      
      // Retrieve the 'identifier" from Cypress environment
      const identifier = Cypress.env('identifier');
  
      // Send a GET request to the specific API endpoint
      cy.request({
        method: 'GET',
        url: `http://20.92.231.254/api/v1/messaging/${identifier}`,
        headers: {
          accept: '*/*',
          'X-ACCESS-TOKEN': jwtToken,
        },
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(200);
  
        // Assert the response body structure
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
  
        // Assuming the response is an array of messaging data
        const response_body = response.body[0];
        expect(response_body.name).to.equal("messaging_post");
        expect(response_body.createdby).to.equal(1);
        expect(response_body).to.have.property('createddate');
        expect(response_body).to.have.property('modifiedby');
        expect(response_body).to.have.property('modifieddate');
        expect(response_body.isactive).to.be.true;
        expect(response_body).to.have.property('image');
        expect(response_body).to.have.property('identifier');

        // Assert the 'identifier' field matches the expected identifier
        expect(response_body.identifier).to.equal(identifier);
      });
  });      


  it("Should successfully update a specific message", () => {
      cy.pause();
      // Retrieve the 'jwtToken' from Cypress environment
      const jwtToken = Cypress.env('jwtToken');
  
      // Retrieve the 'updatedidentifier" from the Cypress environment
      const identifier = Cypress.env('identifier');
  
      // Send a PUT request to the specific API endpoint
      cy.request({
      method: 'PUT',
      url: `http://20.92.231.254/api/v1/messaging/${identifier}`,
      headers: {
          accept: 'application/json',
          'X-ACCESS-TOKEN': jwtToken,
          'Content-Type': 'application/json',
      },
      body: {
          name: "messaging_updated",
          image: "base64 Image",
          userid: 1,
      },
      }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);
  
      // Assert the response body message
      expect(response.body).to.equal(`Messaging modified with Identifier: ${identifier}`);
      });
  });
    
  it("Should successfully delete messaging data by identifier", () => {
      cy.pause();
      // Retrieve the 'jwtToken' from Cypress environment
      const jwtToken = Cypress.env('jwtToken');
      // Retrieve the 'identifier" from Cypress environment
      const identifier = Cypress.env('identifier');
  
      // Send a DELETE request to the specific API endpoint
      cy.request({
      method: 'DELETE',
      url: `http://20.92.231.254/api/v1/messaging/${identifier}`,
      headers: {
          accept: '*/*',
          'X-ACCESS-TOKEN': jwtToken,
      },
      }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);
  
      // Assert the response message
      expect(response.body).to.equal(`Messaging deleted with ID: ${identifier}`);
      });
  });
});
  