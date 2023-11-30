describe("Requests to /api/v1/programmessaging", () => {
  before(() => {
    // Authenticate and save the JWT token
    cy.authenticateAndSaveToken();
    cy.createMessaging();
    cy.createProgram();
  });

  after(() => {
    cy.deleteMessaging();
    cy.deleteProgram();
  })

  it("Should successfully fetch program messaging data", () => {
    cy.pause()
    // Retrieve the 'jwtToken' from Cypress environment
    const jwtToken = Cypress.env('jwtToken');

    // Send a GET request to the API endpoint
    cy.request({
      method: 'GET',
      url: 'http://20.92.231.254/api/v1/programmessaging',
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtToken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response body structure
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);

      // Assuming the response is an array of program messaging data
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('identifier');
      expect(response_body).to.have.property('programid');
      expect(response_body).to.have.property('messagingid');
      expect(response_body).to.have.property('expirydate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('program');
      expect(response_body).to.have.property('messaging');

      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
    });
  });

  it("Should successfully create a programmessaging", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the messaging_id from the cypress environment
    const messaging_id = Cypress.env('messaging_id');

    // Retrieve the program_id from the cypress environment
    const program_id = Cypress.env('program_id');

    // Perform the POST request
    cy.request({
      method: 'POST',
      url: 'http://20.92.231.254/api/v1/programmessaging',
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
        'Content-Type': 'application/json',
      },
      body: {
        messagingid: `${messaging_id}`,
        programid: `${program_id}`,
        expirydate: "2025-01-1",
        userid: 1,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(201);


      // Assert the response body structure
      expect(response.body).to.have.property("message");
      expect(response.body).to.have.property("results");

      // Assert the response structure and properties
      const response_body = response.body.results[0];
      expect(response_body).to.have.property("id");
      expect(response_body).to.have.property("programid");
      expect(response_body).to.have.property("messagingid");
      expect(response_body).to.have.property("createdby");
      expect(response_body).to.have.property("createddate");
      expect(response_body).to.have.property("modifiedby");
      expect(response_body).to.have.property("modifieddate");
      expect(response_body).to.have.property("isactive");
      expect(response_body).to.have.property("expirydate");
      expect(response_body).to.have.property("identifier");

      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.programid).to.equal(program_id);
      expect(response_body.messagingid).to.equal(messaging_id);
      expect(response_body.expirydate).to.equal("2025-01-01T00:00:00.000Z");
      expect(response_body.createdby).to.equal(1);

      // Extract and save the identifier to a variable
      const identifier = response_body.identifier;
      Cypress.env('identifier', identifier);
  
      // Print the created identifier to the console
      cy.log(`identifier: ${identifier}`);
    });
  });

  it("Should successfully fetch a specific programmessaging with required fields", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');
  
    // Retrieve the 'identifier' from Cypress environment
    const identifier = Cypress.env('identifier');

    // Retrieve the messaging_id from the cypress environment
    const messaging_id = Cypress.env('messaging_id');

    // Retrieve the program_id from the cypress environment
    const program_id = Cypress.env('program_id');
  
    // Perform the GET request with the 'identifier'
    cy.request({
      method: 'GET',
      url: `http://20.92.231.254/api/v1/programmessaging/${identifier}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);
  
      const response_body = response.body[0];
      // Assert the 'identifier' field matches the expected identifier
      expect(response_body).to.have.property('identifier', identifier);
  
      // Check the presence of other required fields
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('programid');
      expect(response_body).to.have.property('messagingid');
      expect(response_body).to.have.property('expirydate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('program');
      expect(response_body).to.have.property('messaging');
  
      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.programid).to.equal(program_id);
      expect(response_body.messagingid).to.equal(messaging_id);
      expect(response_body.expirydate).to.equal("2025-01-01T00:00:00.000Z");
      expect(response_body.program).to.equal("program_post_name");
      expect(response_body.messaging).to.equal("messaging_post");
  
      // Log the response body to the console
      cy.log(JSON.stringify(response.body, null, 2));
    });
  });

  it("Should successfully update a specific programmessaging", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the 'identifier" from Cypress environment
    const identifier = Cypress.env('identifier');

    // Retrieve the messaging_id from the cypress environment
    const messaging_id = Cypress.env('messaging_id');

    // Retrieve the program_id from the cypress environment
    const program_id = Cypress.env('program_id');

    // Perform the PUT request
    cy.request({
      method: 'PUT',
      url: `http://20.92.231.254/api/v1/programmessaging/${identifier}`,
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
        'Content-Type': 'application/json',
      },
      body: {
        messagingid: `${messaging_id}`,
        programid: `${program_id}`,
        expirydate: "2026-01-1",
        userid: 1,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response message
      expect(response.body).to.equal(`programmessaging modified with ID: ${identifier}`);
    });
  });

  it("Should successfully check that the specific programmessaging updated correctly", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');
  
    // Retrieve the 'identifier' from Cypress environment
    const identifier = Cypress.env('identifier');

    // Retrieve the messaging_id from the cypress environment
    const messaging_id = Cypress.env('messaging_id');

    // Retrieve the program_id from the cypress environment
    const program_id = Cypress.env('program_id');
  
    // Perform the GET request with the 'identifier'
    cy.request({
      method: 'GET',
      url: `http://20.92.231.254/api/v1/programmessaging/${identifier}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);
  
      const response_body = response.body[0];
      // Assert the 'identifier' field matches the expected identifier
      expect(response_body).to.have.property('identifier', identifier);
  
      // Check the presence of other required fields
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('programid');
      expect(response_body).to.have.property('messagingid');
      expect(response_body).to.have.property('expirydate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('program');
      expect(response_body).to.have.property('messaging');
  
      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.programid).to.equal(program_id);
      expect(response_body.messagingid).to.equal(messaging_id);
      expect(response_body.expirydate).to.equal("2026-01-01T00:00:00.000Z");
      expect(response_body.program).to.equal("program_post_name");
      expect(response_body.messaging).to.equal("messaging_post");
  
      // Log the response body to the console
      cy.log(JSON.stringify(response.body, null, 2));
    });
  });

  it("Should successfully fetch a specific programmessaging by messaging ID", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the id from the cypress environment
    const id = Cypress.env('id');

    // Retrieve the messaging_id from the cypress environment
    const messaging_id = Cypress.env('messaging_id');

    // Retrieve the program_id from the cypress environment
    const program_id = Cypress.env('program_id');
  
    // Perform the GET request with the messaging ID
    cy.request({
      method: 'GET',
      url: `http://20.92.231.254/api/v1/programmessaging/messaging/${messaging_id}`,
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
  
      // Assuming the response is an array of programmessaging
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('programid');
      expect(response_body).to.have.property('messagingid');
      expect(response_body).to.have.property('createdby');
      expect(response_body).to.have.property('createddate');
      expect(response_body).to.have.property('modifiedby');
      expect(response_body).to.have.property('modifieddate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('expirydate');
      expect(response_body).to.have.property('identifier');
  
      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.programid).to.equal(program_id);
      expect(response_body.messagingid).to.equal(messaging_id);
      expect(response_body.expirydate).to.equal("2026-01-01T00:00:00.000Z");
      expect(response_body.createdby).to.equal(1);
    });
  });  

  it("Should successfully fetch programmessaging by program ID", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the messaging_id from the cypress environment
    const messaging_id = Cypress.env('messaging_id');

    // Retrieve the program_id from the cypress environment
    const program_id = Cypress.env('program_id');

    // Retrieve the program_id from the cypress environment
    const program_identifier = Cypress.env('program_identifier');

    // Print the identifier to the console
    cy.log(`program_identifier: ${program_identifier}`);
  
    // Perform the GET request with the program ID
    cy.request({
      method: 'GET',
      url: `http://20.92.231.254/api/v1/programmessaging/program/${program_identifier}`,
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
  
      // Assuming the response is an array of programmessaging
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('programid');
      expect(response_body).to.have.property('messagingid');
      expect(response_body).to.have.property('createdby');
      expect(response_body).to.have.property('createddate');
      expect(response_body).to.have.property('modifiedby');
      expect(response_body).to.have.property('modifieddate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('expirydate');
      expect(response_body).to.have.property('identifier');
  
      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.programid).to.equal(program_id);
      expect(response_body.messagingid).to.equal(messaging_id);
      expect(response_body.expirydate).to.equal("2026-01-01T00:00:00.000Z");
      expect(response_body.createdby).to.equal(1);
    });
  });

  it("Should successfully delete a specific programmessaging", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');
  
    // Retrieve the 'identifier" from Cypress environment
    const identifier = Cypress.env('identifier');
  
    // Perform the DELETE request with the 'identifier' in the URL
    cy.request({
      method: 'DELETE',
      url: `http://20.92.231.254/api/v1/programmessaging/${identifier}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);
  
      // Assert the response message
      expect(response.body).to.equal(`programmessaging deleted with ID: ${identifier}`);
    });
  });
});
  