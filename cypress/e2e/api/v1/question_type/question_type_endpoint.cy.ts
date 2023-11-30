describe("Requests to /api/v1/question", () => {
  before(() => {
    // Authenticate and save the JWT token
    cy.authenticateAndSaveToken();
  });

  it("Should successfully fetch question type data", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Send a GET request to the API endpoint
    cy.request({
      method: 'GET',
      url: 'http://20.92.231.254/api/v1/questiontype',
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

      // Assuming the response is an array of question type data
      const questionTypeData = response.body[0];
      expect(questionTypeData).to.have.property('id');
      expect(questionTypeData).to.have.property('typename');
      expect(questionTypeData).to.have.property('description');
      expect(questionTypeData).to.have.property('createdby');
      expect(questionTypeData).to.have.property('createddate');
      expect(questionTypeData).to.have.property('modifiedby');
      expect(questionTypeData).to.have.property('modifieddate');
      expect(questionTypeData).to.have.property('isactive');
      expect(questionTypeData).to.have.property('answertype');
      expect(questionTypeData).to.have.property('answerhrimpact');
      expect(questionTypeData).to.have.property('dropdownoptions');
      expect(questionTypeData).to.have.property('identifier');

      // Add specific assertions for the data values if needed
      expect(questionTypeData.isactive).to.be.true;
    });
  });

  it("Should successfully add a question type", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Send a POST request to the specific API endpoint
    cy.request({
    method: 'POST',
    url: 'http://20.92.231.254/api/v1/questiontype',
    headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
        'Content-Type': 'application/json',
    },
    body:{
        typename: "questiontype_post",
        description: "this is a test question",
        userid: 1,
        answertype: "Textbox",
        answerhrimpact: "Not Impacted",
        dropdownoptions: ""
    },
    }).then((response) => {
    // Assert the response status code
    expect(response.status).to.eq(201);

    // Assert the response body message
    expect(response.body).to.have.property('message');
    expect(response.body).to.have.property('results');
    expect(response.body.results).to.be.an('array');
    expect(response.body.results.length).to.be.greaterThan(0);

    // Assuming the response contains question type data
    const response_body = response.body.results[0];
    expect(response_body).to.have.property('id');
    expect(response_body).to.have.property('typename');
    expect(response_body).to.have.property('description');
    expect(response_body).to.have.property('createdby');
    expect(response_body).to.have.property('createddate');
    expect(response_body).to.have.property('modifiedby');
    expect(response_body).to.have.property('modifieddate');
    expect(response_body).to.have.property('isactive');
    expect(response_body).to.have.property('answertype');
    expect(response_body).to.have.property('answerhrimpact');
    expect(response_body).to.have.property('dropdownoptions');
    expect(response_body).to.have.property('identifier');

    // Add specific assertions for the data values if needed
    expect(response_body.isactive).to.be.true;
    expect(response_body.typename).to.equal("questiontype_post");
    expect(response_body.description).to.equal("this is a test question");
    expect(response_body.createdby).to.equal(1);
    expect(response_body.answertype).to.equal("Textbox");
    expect(response_body.answerhrimpact).to.equal("Not Impacted");

    // Extract and save the identifier to a variable
    const identifier = response_body.identifier;
    Cypress.env('identifier', identifier);

    // Print the created identifier to the console
    cy.log(`identifier: ${identifier}`);
    });
  });

    
  it("Should successfully fetch a question type by identifier", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');
    // Retrieve the 'identifier" from Cypress environment
    const identifier = Cypress.env('identifier');

    // Send a GET request to the specific API endpoint
    cy.request({
    method: 'GET',
    url: `http://20.92.231.254/api/v1/questiontype/${identifier}`,
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

    // Assuming the response is an array of question type data
    const response_body = response.body[0];
    expect(response_body).to.have.property('id');
    expect(response_body).to.have.property('typename');
    expect(response_body).to.have.property('description');
    expect(response_body).to.have.property('createdby');
    expect(response_body).to.have.property('createddate');
    expect(response_body).to.have.property('modifiedby');
    expect(response_body).to.have.property('modifieddate');
    expect(response_body).to.have.property('isactive');
    expect(response_body).to.have.property('answertype');
    expect(response_body).to.have.property('answerhrimpact');
    expect(response_body).to.have.property('dropdownoptions');
    expect(response_body).to.have.property('identifier');

    // Add specific assertions for the data values if needed
    expect(response_body.isactive).to.be.true;
    expect(response_body.typename).to.equal("questiontype_post");
    expect(response_body.description).to.equal("this is a test question");
    expect(response_body.createdby).to.equal(1);
    expect(response_body.answertype).to.equal("Textbox");
    expect(response_body.answerhrimpact).to.equal("Not Impacted");
    expect(response_body.identifier).to.equal(identifier);
    });
  });
    
  it("Should successfully update a question type by identifier", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');
    // Retrieve the 'updatedIdentifier" from the Cypress environment
    const identifier = Cypress.env('identifier');

    // Send a PUT request to the specific API endpoint
    cy.request({
      method: 'PUT',
      url: `http://20.92.231.254/api/v1/questiontype/${identifier}`,
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
        'Content-Type': 'application/json',
      },
      body: {
        typename: "questiontype_updated",
        description: "questiontype_updated",
        userid: 1,
        answertype: "Textbox",
        answerhrimpact: "Not Impacted",
        dropdownoptions: ""
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response body message
      expect(response.body).to.equal(`questiontype modified with ID: ${identifier}`);
    });
  });

  it("Should successfully delete a question type by identifier", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');
    // Retrieve the 'identifier" from Cypress environment
    const identifier = Cypress.env('identifier');

    // Send a DELETE request to the specific API endpoint
    cy.request({
      method: 'DELETE',
      url: `http://20.92.231.254/api/v1/questiontype/${identifier}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response message
      expect(response.body).to.equal(`questiontype deleted with ID: ${identifier}`);
    });
  });
});