import { identity } from "cypress/types/lodash";

describe("Requests to /api/v1/exercisezone", () => { 
  before(() => {
      // Authenticate and save the JWT token
      cy.authenticateAndSaveToken();
  });

  it("Should successfully fetch exercise zones", () => {
      cy.pause()
      // Retrieve the 'jwtoken' from Cypress environment
      const jwtoken = Cypress.env('jwtToken');
    
      // Perform the GET request
      cy.request({
        method: 'GET',
        url: 'http://20.92.231.254/api/v1/exercisezone',
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
    
        // Assuming the response is an array of exercise zones
        const response_body = response.body[0];
        expect(response_body).to.have.property('id');
        expect(response_body).to.have.property('name');
        expect(response_body).to.have.property('duration');
        expect(response_body).to.have.property('description');
        expect(response_body).to.have.property('bpmlower');
        expect(response_body).to.have.property('bmpupper');
        expect(response_body).to.have.property('createdby');
        expect(response_body).to.have.property('createddate');
        expect(response_body).to.have.property('modifiedby');
        expect(response_body).to.have.property('modifieddate');
        expect(response_body).to.have.property('isactive');
        expect(response_body).to.have.property('identifier');
      });
  });

  it("Should successfully add an exercise zone", () => {
      cy.pause()
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
          /* bpmupper and bpmlower are temporarily being removed from the api. So Had to remove these fields for now. 
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
        const identifier = response.body.results[0].identifier;
        Cypress.env('identifier', identifier);

        // Print the created identifier to the console
        cy.log(`Identifier: ${identifier}`);

        // Print the retrieved data to the console
        cy.log(JSON.stringify(response_body, null, 2));

      });
  });
    
      
  it("Should successfully fetch a specific exercise zone by identifier", () => {
      cy.pause()
      // Retrieve the 'jwtoken' from Cypress environment
      const jwtoken = Cypress.env('jwtToken');
  
      // Retrieve the 'identifier" from Cypress environment
      const identifier = Cypress.env('identifier');
  
      // Perform the GET request with the 'identifier'
      cy.request({
      method: 'GET',
      url: `http://20.92.231.254/api/v1/exercisezone/${identifier}`,
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
      expect(response_body.identifier).to.equal(identifier);
  
      // Check the presence of other required fields and their values
      expect(response_body.name).to.equal("exercise_zone_post");
      expect(response_body.duration).to.equal("10");
      expect(response_body.description).to.equal("exercisezone_description");
      /*
      expect(response_body.bmpupper).to.equal(100);
      expect(response_body.bpmlower).to.equal(90);
      */
      expect(response_body.createdby).to.equal(1);
      expect(response_body.createddate).to.be.a('string');
      expect(response_body.modifiedby).to.be.null;
      expect(response_body.modifieddate).to.be.null;
      expect(response_body.isactive).to.be.true;
      });
  });


  it("Should successfully update an exercise zone", () => {
    cy.pause()
    // Retrieve the 'jwtoken' from the Cypress environment
    const jwtoken = Cypress.env('jwtToken');
  
    // Retrieve the 'updatedIdentifier" from the Cypress environment
    const identifier = Cypress.env('identifier');
  
    // Perform the PUT request to update the exercise zone
    cy.request({
      method: 'PUT',
      url: `http://20.92.231.254/api/v1/exercisezone/${identifier}`,
      headers: {
        accept: 'application/json',
        'X-ACCESS-TOKEN': jwtoken,
        'Content-Type': 'application/json',
      },
      body: {
      name: "exercisezone_updated",
      duration: 10,
      description: "exercisezone_updated",
      /*
      bmpupper: 100,
      bpmlower: 90,
      */
      userid: 1,
      },
    }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);
  
      // Assert the response message
      expect(response.body).to.equal(`exercisezone modified with ID: ${identifier}`);
  
      // Additional assertions can be added as needed
    });
  });
    
      

  it("Should successfully delete an exercise zone", () => {
      cy.pause()
      // Retrieve the 'jwtoken' from Cypress environment
      const jwtoken = Cypress.env('jwtToken');
  
      // Retrieve the 'identifier" from Cypress environment
      const identifier = Cypress.env('identifier');
  
      // Perform the DELETE request with the 'exerciseZoneIdentifier'
      cy.request({
      method: 'DELETE',
      url: `http://20.92.231.254/api/v1/exercisezone/${identifier}`,
      headers: {
          accept: '*/*',
          'X-ACCESS-TOKEN': jwtoken,
      },
      }).then((response) => {
      // Assert the response status code
      expect(response.status).to.eq(200);
  
      // Assert the response message
      expect(response.body).to.equal(`exercisezone deleted with ID: ${identifier}`);
      });
  });
});