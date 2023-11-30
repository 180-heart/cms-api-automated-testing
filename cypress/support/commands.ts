/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


Cypress.Commands.add('authenticateAndSaveToken', () => {
  cy.request({
    method: 'POST',
    url: 'http://20.92.231.254/api/v1/authenticate',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: {
      username: 'admin@gmail.com',
      password: 'admin@123',
      identifier: '61b337c2-a3b6-405b-8c52-f9ad7522618e',
    },
  }).then((response) => {
    // Assert the response status code
    expect(response.status).to.eq(200);

    // Assert the presence of the "message" field
    expect(response.body).to.have.property("message");
    expect(response.body.message).to.equal("Login Successful");

    // Save the JWT token in a variable available across all tests
    Cypress.env('jwtToken', response.body.jwtoken);

    // Access the saved JWT token
    const jwtToken = Cypress.env('jwtToken');

    // Use the JWT token in your test logic
    cy.log(`JWT Token: ${jwtToken}`);
    });
});


// ** Commands used in program_messaging endpoint are below ** //
  // command to create a messaging
  Cypress.Commands.add('createMessaging', () => {
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
    expect(response_body).to.have.property('id');
    expect(response_body.name).to.equal("messaging_post");
    expect(response_body.createdby).to.equal(1);
    expect(response_body.isactive).to.be.true;
    expect(response_body).to.have.property("image");
    expect(response_body).to.have.property('identifier');

    // Extract and save the 'id' to a variable
    const messaging_id = response_body.id;
    Cypress.env('messaging_id', messaging_id);

    // Extract and save the identifier to a variable
    const messaging_identifier = response_body.identifier;
    Cypress.env('messaging_identifier', messaging_identifier);

    // Print the created identifier to the console
    cy.log(`identifier: ${messaging_identifier}`);

    // Print the id to the console
    cy.log(`messaging_id: ${messaging_id}`);
    });
  });  

  // command to delete messaging
  Cypress.Commands.add('deleteMessaging', () => {
    // Retrieve the 'jwtToken' from Cypress environment
    const jwtToken = Cypress.env('jwtToken');
    // Retrieve the 'identifier" from Cypress environment
    const messaging_identifier = Cypress.env('messaging_identifier');

    // Send a DELETE request to the specific API endpoint
    cy.request({
    method: 'DELETE',
    url: `http://20.92.231.254/api/v1/messaging/${messaging_identifier}`,
    headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtToken,
    },
    }).then((response) => {
    // Assert the response status code
    expect(response.status).to.eq(200);

    // Assert the response message
    expect(response.body).to.equal(`Messaging deleted with ID: ${messaging_identifier}`);
    });
  });

  // command to create a program
  Cypress.Commands.add('createProgram', () => {
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
        name: "program_post_name",
        description: "program_post_description",
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
      expect(response_body.name).to.equal("program_post_name");
      expect(response_body.description).to.equal("program_post_description");
      expect(response_body.createdby).to.equal(1);
      expect(response_body.periods).to.equal("2");
      expect(response_body.days).to.equal("5");

      // Extract and save the identifier to a variable
      const program_identifier = response_body.identifier;
      Cypress.env('program_identifier', program_identifier);

      // Extract and save the 'id' to a variable
      const program_id = response_body.id;
      Cypress.env('program_id', program_id);

      // Print the id to the console
      cy.log(`program_id: ${program_id}`);

      // Print the created identifier to the console
      cy.log(`identifier: ${program_identifier}`);
      
    });
  });

  // command to delete program
  Cypress.Commands.add('deleteProgram', () => {
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');
    // Retrieve the 'identifier" from Cypress environment
    const program_identifier = Cypress.env('program_identifier');

    // Send a DELETE request to the specific API endpoint
    cy.request({
      method: 'DELETE',
      url: `http://20.92.231.254/api/v1/program/${program_identifier}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response message
      expect(response.body).to.equal(`program deleted with ID: ${program_identifier}`);
    });
  });



// ** Commands used in program_period_day_mapping endpoint are below ** //
  Cypress.Commands.add('createExercisePeriod', () => {
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
        const exerciseperiod_identifier = response_body.identifier;
        Cypress.env('exerciseperiod_identifier', exerciseperiod_identifier);

        // Print the created identifier to the console
        cy.log(`Identifier: ${exerciseperiod_identifier}`);

        // Extract and save the 'id' to a variable
        const exerciseperiod_id = response_body.id;
        Cypress.env('exerciseperiod_id', exerciseperiod_id);

        // Print the id to the console
        cy.log(`exerciseperiod_id: ${exerciseperiod_id}`);
      }
    });
  });

  Cypress.Commands.add('deleteExercisePeriod', () => {
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the 'identifier' from Cypress environment
    const exerciseperiod_identifier = Cypress.env('exerciseperiod_identifier');

    // Perform the DELETE request
    cy.request({
      method: 'DELETE',
      url: `http://20.92.231.254/api/v1/exerciseperiod/${exerciseperiod_identifier}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response message
      expect(response.body).to.equal(`exerciseperiodmaster deleted with Identifier: ${exerciseperiod_identifier}`);
    });
  });

  Cypress.Commands.add('createExeriseZone', () => {
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');
  
    // Perform the POST request
    cy.request({
      method: 'POST',
      url: 'http://20.92.231.254/api/v1/exercisezone',
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
        'Content-Type': 'application/json',
      },
      body: {
        name: "exercise_zone_post",
        duration: 10,
        description: "exercisezone_description",
        /* bpmupper and bpmlower are temporarily being removed from the api. So had to comment out these fields for now. 
        NOTE: Typo on bmpupper.
        bmpupper: 100, 
        bpmlower: 90,
        */
        userid: 1,
      },
      }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(201);

        // Assert the response structure and properties
        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("results");

        // Extract the first exercise zone from the response
        const response_body = response.body.results[0];

        // Assert that the properties match the request body
        expect(response_body.name).to.equal("exercise_zone_post");
        expect(response_body.duration).to.equal("10");
        expect(response_body.description).to.equal("exercisezone_description");
        /*
        expect(response_body.bmpupper).to.equal(100);
        expect(response_body.bpmlower).to.equal(90);
        */
        expect(response_body.createdby).to.equal(1);

        // Check other properties in the response
        expect(response_body.isactive).to.be.true;
        expect(response_body).to.have.property('identifier');

        // Extract and save the identifier to a variable
        const exercisezone_identifier = response.body.results[0].identifier;
        Cypress.env('exercisezone_identifier', exercisezone_identifier);

        // Print the created identifier to the console
        cy.log(`Identifier: ${exercisezone_identifier}`);

        // Extract and save the 'id' to a variable
        const exercisezone_id = response_body.id;
        Cypress.env('exercisezone_id', exercisezone_id);

        // Print the id to the console
        cy.log(`exercisezone_id: ${exercisezone_id}`);

        // Print the retrieved data to the console
        cy.log(JSON.stringify(response_body, null, 2));
      });
  });

  Cypress.Commands.add('deleteExeriseZone', () => {
    // Retrieve the 'jwtoken' from Cypress environment
    const jwtoken = Cypress.env('jwtToken');
  
    // Retrieve the 'identifier" from Cypress environment
    const exercisezone_identifier = Cypress.env('exercisezone_identifier');

    // Perform the DELETE request with the 'exerciseZoneIdentifier'
    cy.request({
    method: 'DELETE',
    url: `http://20.92.231.254/api/v1/exercisezone/${exercisezone_identifier}`,
    headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
    },
    }).then((response) => {
    // Assert the response status code
    expect(response.status).to.eq(200);

    // Assert the response message
    expect(response.body).to.equal(`exercisezone deleted with ID: ${exercisezone_identifier}`);
    });
  });

  Cypress.Commands.add('programPeriodMapping', () => {
    
  });




// ** Commands used in question endpoint are below ** //
  Cypress.Commands.add('createQuestionType', () => {
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
        description: "this_is_a_test_question_type",
        userid: 1,
        answertype: "Dropdown",
        answerhrimpact: "Not Impacted",
        dropdownoptions: "Yes"
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
    expect(response_body.description).to.equal("this_is_a_test_question_type");
    expect(response_body.createdby).to.equal(1);
    expect(response_body.answertype).to.equal("Dropdown");
    expect(response_body.answerhrimpact).to.equal("Not Impacted");
    expect(response_body.dropdownoptions).to.equal("Yes");

    // Extract and save the identifier to a variable
    const question_type_identifier = response_body.identifier;
    Cypress.env('question_type_identifier', question_type_identifier);

    // Print the created identifier to the console
    cy.log(`identifier: ${question_type_identifier}`);

    // Extract and save the 'id' to a variable
    const question_type_id = response_body.id;
    Cypress.env('question_type_id', question_type_id);

    // Print the id to the console
    cy.log(`question_type_id: ${question_type_id}`);
    });
  });

  Cypress.Commands.add('deleteQuestionType', () => {
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');
    // Retrieve the 'identifier" from Cypress environment
    const question_type_identifier = Cypress.env('question_type_identifier');

    // Send a DELETE request to the specific API endpoint
    cy.request({
      method: 'DELETE',
      url: `http://20.92.231.254/api/v1/questiontype/${question_type_identifier}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response message
      expect(response.body).to.equal(`questiontype deleted with ID: ${question_type_identifier}`);
    });
  });




// ** Commands used in user_question_answer ** //
  Cypress.Commands.add('createQuestion', () => {
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
        "questiontypeid": 2,
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
      expect(response_body.questiontypeid).to.equal(2);

      // Print the retrieved data to the console
      cy.log(JSON.stringify(response_body, null, 2));

      // Extract and save the identifier to a variable
      const question_identifier = response_body.identifier;
      Cypress.env('question_identifier', question_identifier);

      // Print the created identifier to the console
      cy.log(`identifier: ${question_identifier}`);

      // Extract and save the 'id' to a variable
      const question_id = response_body.id;
      Cypress.env('question_id', question_id);

      // Print the id to the console
      cy.log(`question_id: ${question_id}`);
    });
  });

  Cypress.Commands.add('deleteQuestion', () => {
    // Retrieve the JWT token from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');

    // Retrieve the identifier from the Cypress environment
    const question_identifier = Cypress.env('question_identifier');

    // Send a DELETE request to the API endpoint
    cy.request({
      method: 'DELETE',
      url: `http://20.92.231.254/api/v1/question/${question_identifier}`,
      headers: {
        accept: '*/*',
        'X-ACCESS-TOKEN': jwtoken,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);

      // Assert the response body
      expect(response.body).to.equal(`question deleted with ID: ${question_identifier}`);
    });
  });

