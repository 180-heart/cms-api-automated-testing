describe("GET Request to /api/v1/question", () => {
  before(() => {
    // Authenticate and save the JWT token
    cy.authenticateAndSaveToken();
    cy.createQuestionType();
  });

  after(() => {
    cy.deleteQuestionType();
  })

  it("Should successfully fetch question data", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Send a GET request to the API endpoint
    cy.request({
      method: 'GET',
      url: 'http://20.92.231.254/api/v1/question',
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

      // Assuming the response is an array of question data
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('name');
      expect(response_body).to.have.property('description');
      expect(response_body).to.have.property('questioncategoryid');
      expect(response_body).to.have.property('questiontypeid');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('identifier');
      expect(response_body).to.have.property('category');
      expect(response_body).to.have.property('questiontypename');

      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
    });
  });

  it("Should successfully create a question via POST request", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the question_type_id from cypress environment
    const question_type_id = Cypress.env('question_type_id');

    // Send a POST request to the API endpoint
    cy.request({
      method: 'POST',
      url: 'http://20.92.231.254/api/v1/question',
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
        'Content-Type': 'application/json',
      },
      body: {
        "name": "post_request_question_test",
        "description": "question_test_description",
        "questioncategoryid": 2,
        "questiontypeid": question_type_id,
        "userid": 1
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(201);

      // Assert the response body structure
      expect(response.body).to.have.property('message');
      expect(response.body).to.have.property('results');
      expect(response.body.results).to.be.an('array');
      expect(response.body.results.length).to.be.greaterThan(0);

      const response_body = response.body.results[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('name');
      expect(response_body).to.have.property('description');
      expect(response_body).to.have.property('createdby');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('questioncategoryid');
      expect(response_body).to.have.property('questiontypeid');
      expect(response_body).to.have.property('identifier');

      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.createdby).to.equal(1);
      expect(response_body.name).to.equal('post_request_question_test');
      expect(response_body.description).to.equal('question_test_description');
      expect(response_body.questioncategoryid).to.equal(2);
      expect(response_body.questiontypeid).to.equal(question_type_id);

      // Print the retrieved data to the console
      cy.log(JSON.stringify(response_body, null, 2));

      // Extract and save the identifier to a variable
      const identifier = response_body.identifier;
      Cypress.env('identifier', identifier);

      // Print the created identifier to the console
      cy.log(`identifier: ${identifier}`);
    });
  });    

  it("Should successfully retrieve a question by ID via GET request", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the identifier from the Cypress environment
    const identifier = Cypress.env('identifier');

    // Retrieve the question_type_id from cypress environment
    const question_type_id = Cypress.env('question_type_id');

    // Send a GET request to the API endpoint
    cy.request({
      method: 'GET',
      url: `http://20.92.231.254/api/v1/question/${identifier}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response body
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);

      // Assert the question details
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('name');
      expect(response_body).to.have.property('description');
      expect(response_body).to.have.property('questioncategoryid');
      expect(response_body).to.have.property('questiontypeid');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('identifier');
      expect(response_body).to.have.property('category');
      expect(response_body).to.have.property('questiontypename');

      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.name).to.equal('post_request_question_test');
      expect(response_body.description).to.equal('question_test_description');
      expect(response_body.questioncategoryid).to.equal(2);
      expect(response_body.questiontypeid).to.equal(question_type_id);
      expect(response_body.identifier).to.equal(`${identifier}`);

    });
  });

  it("Should successfully fetch questions by category ID", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the question_type_id from cypress environment
    const question_type_id = Cypress.env('question_type_id');
  
    // Perform the GET request with the category ID
    cy.request({
      method: 'GET',
      url: 'http://20.92.231.254/api/v1/question/category/2',
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
  
      // Assuming the response is an array of questions
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('name');
      expect(response_body).to.have.property('description');
      expect(response_body).to.have.property('createdby');
      expect(response_body).to.have.property('createddate');
      expect(response_body).to.have.property('modifiedby');
      expect(response_body).to.have.property('modifieddate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('questioncategoryid');
      expect(response_body).to.have.property('questiontypeid');
      expect(response_body).to.have.property('identifier');
  
      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.questioncategoryid).to.equal(2);
      expect(response_body.questiontypeid).to.equal(question_type_id);
      expect(response_body.name).to.equal("post_request_question_test");
      expect(response_body.createdby).to.equal(1);
    });
  }); 

  it("Should successfully fetch questions by type ID", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the question_type_id from cypress environment
    const question_type_id = Cypress.env('question_type_id');
  
    // Perform the GET request with the type ID
    cy.request({
      method: 'GET',
      url: `http://20.92.231.254/api/v1/question/type/${question_type_id}`,
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
  
      // Assuming the response is an array of questions
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('name');
      expect(response_body).to.have.property('description');
      expect(response_body).to.have.property('createdby');
      expect(response_body).to.have.property('createddate');
      expect(response_body).to.have.property('modifiedby');
      expect(response_body).to.have.property('modifieddate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('questioncategoryid');
      expect(response_body).to.have.property('questiontypeid');
      expect(response_body).to.have.property('identifier');
  
      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.questioncategoryid).to.equal(2);
      expect(response_body.questiontypeid).to.equal(question_type_id);
      expect(response_body.name).to.equal("post_request_question_test");
      expect(response_body.createdby).to.equal(1);
    });
  });
  

  it("Should successfully update a question by ID via PUT request", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the identifier from the Cypress environment
    const identifier = Cypress.env('identifier');

    // Send a PUT request to the API endpoint
    cy.request({
      method: 'PUT',
      url: `http://20.92.231.254/api/v1/question/${identifier}`,
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
        'Content-Type': 'application/json',
      },
      body: {
        name: "put_request_question_test",
        description: "question_test_description",
        questioncategoryid: 2,
        questiontypeid: 2,
        userid: 1,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response body
      expect(response.body).to.equal(`question modified with ID: ${identifier}`);
    });
  });

  it("Should successfully delete a question by ID via DELETE request", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the identifier from the Cypress environment
    const identifier = Cypress.env('identifier');

    // Send a DELETE request to the API endpoint
    cy.request({
      method: 'DELETE',
      url: `http://20.92.231.254/api/v1/question/${identifier}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response body
      expect(response.body).to.equal(`question deleted with ID: ${identifier}`);
    });
  });
});
  