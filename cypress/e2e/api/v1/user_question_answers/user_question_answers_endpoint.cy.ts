describe("Get User Question Answers", () => {
  before(() => {
      // Authenticate and save the JWT token
      cy.authenticateAndSaveToken();
      cy.createQuestion();
  });

  after(() => {
    cy.deleteQuestion();
  })

  it("Should successfully get user question answers", () => {
      cy.pause()
      // Retrieve the JWT token from the Cypress environment
      const jwtoken = Cypress.env('jwtToken');

      // Send a GET request to the API endpoint
      cy.request({
      method: 'GET',
      url: 'http://20.92.231.254/api/v1/userquestionanswers',
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

      // Assuming the response contains user question answer data
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('answer');
      expect(response_body).to.have.property('userid');
      expect(response_body).to.have.property('questionid');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('identifier');
      expect(response_body).to.have.property('username');
      expect(response_body).to.have.property('questionname');

      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;

      // Print the retrieved data to the console
      cy.log(JSON.stringify(response_body, null, 2));
      });
  });

  it("Should successfully create a user question answer", () => {
      cy.pause()
      // Retrieve the JWT token from the Cypress environment
      const jwtoken = Cypress.env('jwtToken');

      // Retrieve the question_id from the cypress enviroment
      const question_id = Cypress.env('question_id');
  
      // Send a POST request to the API endpoint
      cy.request({
        method: 'POST',
        url: 'http://20.92.231.254/api/v1/userquestionanswers',
        headers: {
          accept: 'application/json',
          'X-ACCESS-TOKEN': jwtoken,
          'Content-Type': 'application/json',
        },
        body: {
          questionid: question_id,
          userid: 1,
          answer: "user_question_answer_post_request_test",
        },
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(201);
  
        // Assert the response body structure
        expect(response.body).to.have.property('message');
        expect(response.body).to.have.property('results');
        expect(response.body.results).to.be.an('array');
        expect(response.body.results.length).to.be.greaterThan(0);
  
        // Assuming the response contains the created user question answer data
        const response_body = response.body.results[0];
        expect(response_body).to.have.property('id');
        expect(response_body).to.have.property('userid');
        expect(response_body).to.have.property('questionid');
        expect(response_body).to.have.property('answer');
        expect(response_body).to.have.property('createdby');
        expect(response_body).to.have.property('createddate');
        expect(response_body).to.have.property('modifiedby');
        expect(response_body).to.have.property('modifieddate');
        expect(response_body).to.have.property('isactive');
        expect(response_body).to.have.property('identifier');
  
        // Add specific assertions for the data values if needed
        expect(response_body.isactive).to.be.true;
        expect(response_body.userid).to.equal(1);
        expect(response_body.questionid).to.equal(question_id);
        expect(response_body.answer).to.equal("user_question_answer_post_request_test");

        // Print the retrieved data to the console
        cy.log(JSON.stringify(response_body, null, 2));
  
        // Extract and save the identifier to a variable
        const identifier = response_body.identifier;
        Cypress.env('identifier', identifier);
  
        // Print the created identifier to the console
        cy.log(`identifier: ${identifier}`);
      });
  });

  it("Should successfully fetch user question answers by user ID", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the question_id from the cypress enviroment
    const question_id = Cypress.env('question_id');
  
    // Perform the GET request with the user ID
    cy.request({
      method: 'GET',
      // this is a fixed user, "user id 1" aka admin user
      url: `http://20.92.231.254/api/v1/userquestionanswers/user/1`, 
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
  
      // Assuming the response is an array of user question answers
      const response_body = response.body[1];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('userid');
      expect(response_body).to.have.property('questionid');
      expect(response_body).to.have.property('answer');
      expect(response_body).to.have.property('createdby');
      expect(response_body).to.have.property('createddate');
      expect(response_body).to.have.property('modifiedby');
      expect(response_body).to.have.property('modifieddate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('identifier');
  
      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.userid).to.equal(1);
      expect(response_body.createdby).to.equal(1);
    });
  });    

  it("Should successfully fetch user question answers by question ID", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the 'question_id' from cypress environment
    const question_id = Cypress.env('question_id');
  
    // Perform the GET request with the question ID
    cy.request({
      method: 'GET',
      url: `http://20.92.231.254/api/v1/userquestionanswers/question/${question_id}`,
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
  
      // Assuming the response is an array of user question answers
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('userid');
      expect(response_body).to.have.property('questionid');
      expect(response_body).to.have.property('answer');
      expect(response_body).to.have.property('createdby');
      expect(response_body).to.have.property('createddate');
      expect(response_body).to.have.property('modifiedby');
      expect(response_body).to.have.property('modifieddate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('identifier');
  
      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.userid).to.equal(1);
      expect(response_body.questionid).to.equal(question_id);
      expect(response_body.answer).to.equal("user_question_answer_post_request_test");
      expect(response_body.createdby).to.equal(1);
    });
  });
  

  it("Should successfully retrieve a specific user question answer", () => {
      cy.pause()
      // Retrieve the JWT token from the Cypress environment
      const jwtoken = Cypress.env('jwtToken');

      // Retrieve the identifier from the Cypress environment
      const identifier = Cypress.env('identifier');

      // Retrieve the 'question_id' from cypress environment
      const question_id = Cypress.env('question_id');
  
      // Send a GET request to the API endpoint
      cy.request({
        method: 'GET',
        url: `http://20.92.231.254/api/v1/userquestionanswers/${identifier}`,
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
  
        // Assuming the response contains the user question answer data
        const response_body = response.body[0];
        expect(response_body).to.have.property('id');
        expect(response_body).to.have.property('answer');
        expect(response_body).to.have.property('userid');
        expect(response_body).to.have.property('questionid');
        expect(response_body).to.have.property('isactive');
        expect(response_body).to.have.property('identifier');
        expect(response_body).to.have.property('username');
        expect(response_body).to.have.property('questionname');
  
        // Add specific assertions for the data values if needed
        expect(response_body.isactive).to.be.true;
        expect(response_body.userid).to.equal(1);
        expect(response_body.questionid).to.equal(question_id);
        expect(response_body.answer).to.equal("user_question_answer_post_request_test");
        expect(response_body.username).to.equal("Admin User");
        expect(response_body.questionname).to.equal("post_request_question_test");
      });
  });

  it("Should successfully update a user question answer", () => {
      cy.pause()
      // Retrieve the JWT token from the Cypress environment
      const jwtoken = Cypress.env('jwtToken');

      // Retrieve the identifier from the Cypress environment
      const identifier = Cypress.env('identifier');
  
      // Send a PUT request to the API endpoint
      cy.request({
        method: 'PUT',
        url: `http://20.92.231.254/api/v1/userquestionanswers/${identifier}`,
        headers: {
          accept: 'application/json',
          'X-ACCESS-TOKEN': jwtoken,
          'Content-Type': 'application/json',
        },
        body: {
          id: 0,
          questionid: 1,
          userid: 1,
          answer: "put_request_test",
        },
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(200);
  
        // Assert the response body
        expect(response.body).to.equal(`userquestionanswers modified with ID: ${identifier}`);
      });
  });

  it("Should successfully delete a user question answer", () => {
      cy.pause()
      // Retrieve the JWT token from the Cypress environment
      const jwtoken = Cypress.env('jwtToken');

      // Retrieve the identifier from the Cypress environment
      const identifier = Cypress.env('identifier');
  
      // Send a DELETE request to the API endpoint
      cy.request({
        method: 'DELETE',
        url: `http://20.92.231.254/api/v1/userquestionanswers/${identifier}`,
        headers: {
          accept: '*/ *',
          'X-ACCESS-TOKEN': jwtoken,
        },
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(200);
  
        // Assert the response body
        expect(response.body).to.equal(`userquestionanswers deleted with ID: ${identifier}`);
      });
  });
});
  