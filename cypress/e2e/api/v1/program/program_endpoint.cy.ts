describe("Requests to /api/v1/program", () => {
    before(() => {
        // Authenticate and save the JWT token
        cy.authenticateAndSaveToken();
    });

    it("Should successfully fetch program data", () => {

      cy.pause()
      // Retrieve the 'jwtoken' from Cypress environment
      const jwtoken = Cypress.env('jwtToken');

      // Send a GET request to the API endpoint
      cy.request({
        method: 'GET',
        url: 'http://20.92.231.254/api/v1/program',
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
  
        // Assuming the response is an array of program data
        const programData = response.body[0];
        expect(programData).to.have.property('id');
        expect(programData).to.have.property('name');
        expect(programData).to.have.property('description');
        expect(programData).to.have.property('createdby');
        expect(programData).to.have.property('createddate');
        expect(programData).to.have.property('modifiedby');
        expect(programData).to.have.property('modifieddate');
        expect(programData).to.have.property('isactive');
        expect(programData).to.have.property('image');
        expect(programData).to.have.property('periods');
        expect(programData).to.have.property('days');
        expect(programData).to.have.property('totaldays');
        expect(programData).to.have.property('identifier');
  
        // Add specific assertions for the data values if needed
        expect(programData.isactive).to.be.true;
      });
    });

    
    it("Should successfully add a program", () => {
      cy.pause();
      // Retrieve the JWT token from the Cypress environment
      const jwtoken = Cypress.env('jwtToken');
  
      // Send a POST request to the API endpoint
      cy.request({
        method: 'POST',
        url: 'http://20.92.231.254/api/v1/program',
        headers: {
          accept: 'application/json',
          'X-ACCESS-TOKEN': jwtoken,
          'Content-Type': 'application/json',
        },
        body: {
          name: "5 day program",
          description: "This program is 5 days long",
          days: 5,
          image: "base64 Image",
          periods: "2",
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
  
        // Assuming the response contains program data
        const response_body = response.body.results[0];
        expect(response_body).to.have.property('id');
        expect(response_body).to.have.property('name');
        expect(response_body).to.have.property('description');
        expect(response_body).to.have.property('createdby');
        expect(response_body).to.have.property('createddate');
        expect(response_body).to.have.property('modifiedby');
        expect(response_body).to.have.property('modifieddate');
        expect(response_body).to.have.property('isactive');
        expect(response_body).to.have.property('image');
        expect(response_body).to.have.property('periods');
        expect(response_body).to.have.property('days');
        expect(response_body).to.have.property('totaldays');
        expect(response_body).to.have.property('identifier');
  
        // Add specific assertions for the data values if needed
        expect(response_body.isactive).to.be.true;
        expect(response_body.name).to.equal("5 day program");
        expect(response_body.description).to.equal("This program is 5 days long");
        expect(response_body.createdby).to.equal(1);
        expect(response_body.periods).to.equal("2");
        expect(response_body.days).to.equal("5");

        // Extract and save the identifier to a variable
        const identifier = response_body.identifier;
        Cypress.env('identifier', identifier);

        // Print the created identifier to the console
        cy.log(`identifier: ${identifier}`);
      });
    });
    
    
    it("Should successfully fetch program data by identifier", () => {
      cy.pause()
      // Retrieve the JWT token from the Cypress environment
      const jwtoken = Cypress.env('jwtToken');
      // Retrieve the 'identifier" from Cypress environment
      const identifier = Cypress.env('identifier');
  
      // Send a GET request to the specific API endpoint
      cy.request({
        method: 'GET',
        url: `http://20.92.231.254/api/v1/program/${identifier}`,
        headers: {
          accept: '*/*',
          'X-ACCESS-TOKEN': jwtoken,
        },
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(200);
  
        // Assert the response body structure
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);
  
        // Assuming the response is an array of program data
        const response_body = response.body[0];
        expect(response_body).to.have.property('id');
        expect(response_body).to.have.property('name');
        expect(response_body).to.have.property('description');
        expect(response_body).to.have.property('createdby');
        expect(response_body).to.have.property('createddate');
        expect(response_body).to.have.property('modifiedby');
        expect(response_body).to.have.property('modifieddate');
        expect(response_body).to.have.property('isactive');
        expect(response_body).to.have.property('image');
        expect(response_body).to.have.property('periods');
        expect(response_body).to.have.property('days');
        expect(response_body).to.have.property('totaldays');
        expect(response_body).to.have.property('identifier');
  
        // Add specific assertions for the data values if needed
        expect(response_body.isactive).to.be.true;
        expect(response_body.identifier).to.equal(identifier);
        expect(response_body.name).to.equal("5 day program");
        expect(response_body.description).to.equal("This program is 5 days long");
        expect(response_body.createdby).to.equal(1);
        expect(response_body.periods).to.equal("2");
        expect(response_body.days).to.equal("5");
      });
    });

    
    it("Should successfully update a program by identifier", () => {
      cy.pause()
      // Retrieve the JWT token from the Cypress environment
      const jwtoken = Cypress.env('jwtToken');
      // Retrieve the 'updatedIdentifier" from the Cypress environment
      const identifier = Cypress.env('identifier');
  
      // Send a PUT request to the specific API endpoint
      cy.request({
        method: 'PUT',
        url: `http://20.92.231.254/api/v1/program/${identifier}`,
        headers: {
          accept: 'application/json',
          'X-ACCESS-TOKEN': jwtoken,
          'Content-Type': 'application/json',
        },
        body: {
          name: "program_updated",
          description: "program_updated",
          days: 10,
          image: "",
          periods: "3",
          userid: 1
        },
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(200);
  
        // Assert the response body message
        expect(response.body).to.equal(`program modified with ID: ${identifier}`);
      });
    });


    it("Should successfully delete a program by identifier", () => {
      cy.pause()
      // Retrieve the JWT token from the Cypress environment
      const jwtoken = Cypress.env('jwtToken');
      // Retrieve the 'identifier" from Cypress environment
      const identifier = Cypress.env('identifier');
  
      // Send a DELETE request to the specific API endpoint
      cy.request({
        method: 'DELETE',
        url: `http://20.92.231.254/api/v1/program/${identifier}`,
        headers: {
          accept: '*/*',
          'X-ACCESS-TOKEN': jwtoken,
        },
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(200);
  
        // Assert the response message
        expect(response.body).to.equal(`program deleted with ID: ${identifier}`);
      });
    });
});
  