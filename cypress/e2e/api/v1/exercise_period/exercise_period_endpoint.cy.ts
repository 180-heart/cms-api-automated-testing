describe("Requests to /api/v1/exerciseperiod", () => {
  before(() => {
      // Authenticate and save the JWT token
      cy.authenticateAndSaveToken();
  });

  it("Should successfully fetch exercise periods", () => {
      cy.pause()
      // Retrieve the 'jwtoken' from Cypress environment
      const jwtoken = Cypress.env('jwtToken');

      // Perform the GET request
      cy.request({
          method: 'GET',
          url: 'http://20.92.231.254/api/v1/exerciseperiod',
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

          // Assuming the response is an array of exercise periods
          const response_body = response.body[0];
          expect(response_body).to.have.property('id');
          expect(response_body).to.have.property('name');
          expect(response_body).to.have.property('description');
          expect(response_body).to.have.property('noofdays');
          expect(response_body).to.have.property('createdby');
          expect(response_body).to.have.property('createddate');
          expect(response_body).to.have.property('modifiedby');
          expect(response_body).to.have.property('modifieddate');
          expect(response_body).to.have.property('isactive');
          expect(response_body).to.have.property('identifier');
      });
  });

  it("Should successfully add an exercise period", () => {
      cy.pause()
      // Retrieve the 'jwtoken' from the Cypress environment
      const jwtoken = Cypress.env('jwtToken');

      // Perform the POST request
      cy.request({
      method: 'POST',
      url: 'http://20.92.231.254/api/v1/exerciseperiod',
      headers: {
          accept: 'application/json',
          'X-ACCESS-TOKEN': jwtoken,
          'Content-Type': 'application/json',
      },
      body: {
          name: "exercise_period_post",
          description: "exerciseperiod_description",
          noofdays: 10,
          userid: 1,
      },
      }).then((response) => {
      if (response.status === 201) {
          // Success case
          expect(response.status).to.eq(201);
          
          // Assert the response structure and properties
          expect(response.body).to.have.property("message");
          expect(response.body).to.have.property("results");

          const response_body = response.body.results[0];
          expect(response_body).to.have.property('id');
          expect(response_body.name).to.equal("exercise_period_post");
          expect(response_body.description).to.equal("exerciseperiod_description");
          expect(response_body.noofdays).to.equal(10);
          expect(response_body.createdby).to.equal(1);
          expect(response_body).to.have.property('isactive', true);
          expect(response_body).to.have.property('identifier');

          // Extract and save the identifier to a variable
          const identifier = response.body.results[0].identifier;
          Cypress.env('identifier', identifier);

          // Print the created identifier to the console
          cy.log(`Identifier: ${identifier}`);
      }
      });
  });

  it("Should successfully fetch a specific exercise period with required fields", () => {
      cy.pause()
      // Retrieve the 'jwtoken' from Cypress environment
      const jwtoken = Cypress.env('jwtToken');
    
      // Retrieve the 'identifier" from Cypress environment
      const identifier = Cypress.env('identifier');
    
      // Perform the GET request with the 'identifier'
      cy.request({
        method: 'GET',
        url: `http://20.92.231.254/api/v1/exerciseperiod/${identifier}`,
        headers: {
          accept: 'application/json',
          'X-ACCESS-TOKEN': jwtoken,
        },
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(200);

        // Store the first exercise zone in a constant
          const response_body = response.body[0];

        // Assert the 'identifier' field matches the expected identifier
        expect(response_body).to.have.property('identifier', identifier);
    
        // Check the presence of other required fields
        expect(response_body).to.have.property('id');
        expect(response_body.name).to.equal("exercise_period_post");
        expect(response_body.description).to.equal("exerciseperiod_description");
        expect(response_body.noofdays).to.equal(10);
        expect(response_body.createdby).to.equal(1);
        expect(response_body.createddate).to.be.a('string');
        expect(response_body.modifiedby).to.be.null;
        expect(response_body.modifieddate).to.be.null;
        expect(response_body.isactive).to.be.true;
      });
  });
    
  it("Should successfully update a specific exercise period", () => {
      cy.pause()
      // Retrieve the 'jwtoken' from Cypress environment
      const jwtoken = Cypress.env('jwtToken');
    
      // Retrieve the 'identifier' from Cypress environment
      const identifier = Cypress.env('identifier');
    
      // Perform the PUT request with inline request body
      cy.request({
        method: 'PUT',
        url: `http://20.92.231.254/api/v1/exerciseperiod/${identifier}`,
        headers: {
          accept: 'application/json',
          'X-ACCESS-TOKEN': jwtoken,
          'Content-Type': 'application/json',
        },
        body: {
          name: "exerciseperiod_updated",
          description: "exerciseperiod_updated",
          noofdays: 10,
          userid: 1,
        },
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(200);
    
        // Assert the response message
        expect(response.body).to.equal(`Exerciseperiod is modified with Identifier: ${identifier}`);
      });
  });      
    
  it("Should successfully delete a specific exercise period", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the 'identifier' from Cypress environment
    const identifier = Cypress.env('identifier');

    // Perform the DELETE request
    cy.request({
      method: 'DELETE',
      url: `http://20.92.231.254/api/v1/exerciseperiod/${identifier}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response message
      expect(response.body).to.equal(`exerciseperiodmaster deleted with Identifier: ${identifier}`);
    });
  });
})