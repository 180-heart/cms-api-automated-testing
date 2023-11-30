describe("Requests to /api/v1/programexerciseperioddaymapping", () => {
  before(() => {
    // Authenticate and save the JWT token
    cy.authenticateAndSaveToken();
    cy.createProgram();
    cy.createExercisePeriod();
    cy.createExeriseZone();
    // cy.programPeriodMapping();
  });

  after(() =>{
    cy.deleteProgram();
    cy.deleteExercisePeriod();
    cy.deleteExeriseZone()
  })

  it("Should successfully fetch program exercise period day mapping data", () => {
    cy.pause()
    // Retrieve the 'jwtToken' from Cypress environment
    const jwtToken = Cypress.env('jwtToken');

    // Send a GET request to the API endpoint
    cy.request({
      method: 'GET',
      url: 'http://20.92.231.254/api/v1/programexerciseperioddaymapping',
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

      // Assuming the response is an array of program exercise period day mapping data
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('day');
      expect(response_body).to.have.property('exerciseperiodid');
      expect(response_body).to.have.property('exercisezoneid');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('identifier');
      expect(response_body).to.have.property('exerciseperiodname');
      expect(response_body).to.have.property('exercisezonename');

      // add more specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
    });
  });

    
  it("Should successfully add program exercise period day mapping data", () => {
      cy.pause()
      // Retrieve the 'jwtToken' from Cypress environment
      const jwtToken = Cypress.env('jwtToken');

      // Retrieve the 'exercisezoneid' from cypress environment
      const exercisezone_id = Cypress.env('exercisezone_id');

      // Retrieve the 'exerciseperiodid' from cypress environment
      const exerciseperiod_id = Cypress.env('exerciseperiod_id');

      // Send a POST request to the API endpoint
      cy.request({
      method: 'POST',
      url: 'http://20.92.231.254/api/v1/programexerciseperioddaymapping',
      headers: {
          accept: 'application/json',
          'X-ACCESS-TOKEN': jwtToken,
          'Content-Type': 'application/json',
      },
      body: {
          exerciseperiodid: exerciseperiod_id,
          day: 40,
          exercisezoneid: exercisezone_id,
          userid: 1,  
      },
      }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(201);
  
      // Assert the response body message and results
      expect(response.body).to.have.property("message");
      expect(response.body).to.have.property("results");
  
      // Extract the first added program exercise period day mapping data from the response
      const response_body = response.body.results[0];
  
      // Assert that the properties in the response match the request body
      expect(response_body.exerciseperiodid).to.equal(exerciseperiod_id);
      expect(response_body.day).to.equal(40);
      expect(response_body.exercisezoneid).to.equal(exercisezone_id);
      expect(response_body.createdby).to.equal(1);
      expect(response_body.isactive).to.be.true;
      expect(response_body).to.have.property('identifier');
      expect(response_body).to.have.property('id');

      // Extract and save the identifier to a variable
      const identifier = response_body.identifier;
      Cypress.env('identifier', identifier);

      // Print the created identifier to the console
      cy.log(`identifier: ${identifier}`);

      // Extract and save the 'id' to a variable
      const id = response_body.id;
      Cypress.env('id', id);

      // Print the id to the console
      cy.log(`id: ${id}`);
      });
  });

  it("Should successfully create program period mapping post request", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the exercise_id from the cypress environment
    const exerciseperiod_id = Cypress.env('exerciseperiod_id');

    // Retrieve the program_id from the cypress environment
    const program_id = Cypress.env('program_id');

    // Perform the POST request
    cy.request({
      method: 'POST',
      url: 'http://20.92.231.254/api/v1/programperiodmapping',
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
        'Content-Type': 'application/json',
      },
      body: {
        programid: program_id,
        startday: 1,
        periodid: exerciseperiod_id,
        userid: 1,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(201);

      // Assert the response body structure
      expect(response.body).to.have.property("message");
      expect(response.body).to.have.property("results");

      // Add specific assertions for the response message if needed
      expect(response.body.message).to.equal("Mapping created sucessfully");
    });
  })

  it("Should successfully get program exercise period day mapping details", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the identifier from the Cypress environment
    const identifier = Cypress.env('identifier');

    // Retrieve the 'exerciseperiodid' from cypress environment
    const exerciseperiod_id = Cypress.env('exerciseperiod_id');

    // Retrieve the 'exercisezoneid' from cypress environment
    const exercisezone_id = Cypress.env('exercisezone_id');


    // Send a GET request to the API endpoint
    cy.request({
      method: 'GET',
      url: `http://20.92.231.254/api/v1/programexerciseperioddaymapping/${identifier}`,
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

      // Assuming the response contains the program exercise period day mapping data
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('day');
      expect(response_body).to.have.property('exerciseperiodid');
      expect(response_body).to.have.property('exercisezoneid');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('identifier');
      expect(response_body).to.have.property('exerciseperiodname');
      expect(response_body).to.have.property('exercisezonename');


      // Add specific assertions for the data values if needed
      expect(response_body.exerciseperiodid).to.equal(exerciseperiod_id);
      expect(response_body.day).to.equal(40);
      expect(response_body.exercisezoneid).to.equal(exercisezone_id);
      expect(response_body.isactive).to.be.true;
    });
  });

  it("Should successfully fetch program exercise period day mapping by program ID", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the 'program id' from cypress environment
    const program_id = Cypress.env('program_id');

    // Retrieve the 'exercisezoneid' from cypress environment
    const exercisezone_id = Cypress.env('exercisezone_id');

    // Retrieve the 'exerciseperiodid' from cypress environment
    const exerciseperiod_id = Cypress.env('exerciseperiod_id');
  
    // Perform the GET request with the program ID
    cy.request({
      method: 'GET',
      url: `http://20.92.231.254/api/v1/programexerciseperioddaymapping/program/${program_id}`,
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
  
      // Assuming the response is an array of program exercise period day mapping
      const response_body = response.body[0];
      expect(response_body).to.have.property('id');
      expect(response_body).to.have.property('programid');
      expect(response_body).to.have.property('exerciseperiodid');
      expect(response_body).to.have.property('day');
      expect(response_body).to.have.property('exercisezoneid');
      expect(response_body).to.have.property('createdby');
      expect(response_body).to.have.property('createddate');
      expect(response_body).to.have.property('modifiedby');
      expect(response_body).to.have.property('modifieddate');
      expect(response_body).to.have.property('isactive');
      expect(response_body).to.have.property('identifier');
  
      // Add specific assertions for the data values if needed
      expect(response_body.isactive).to.be.true;
      expect(response_body.programid).to.equal(`${program_id}`);
      expect(response_body.exerciseperiodid).to.equal(exerciseperiod_id);
      expect(response_body.day).to.equal(40);
      expect(response_body.exercisezoneid).to.equal(exercisezone_id);
      expect(response_body.createdby).to.equal(1);
    });
  });  
  
  it("Should successfully delete program exercise period day mapping", () => {
    cy.pause()
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the id from the cypress environment
    const id = Cypress.env('id');

    // Send a DELETE request to the API endpoint
    cy.request({
      method: 'DELETE',
      url: `http://20.92.231.254/api/v1/programexerciseperioddaymapping/${id}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response body
      expect(response.body).to.equal('Activity is being used in Program. So can not be deleted.');
    });
  });
});
  