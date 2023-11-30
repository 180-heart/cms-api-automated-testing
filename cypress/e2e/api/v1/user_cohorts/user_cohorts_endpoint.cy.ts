describe("Requests to /api/v1/usercohorts", () => {
    before(() => {
      // Authenticate and save the JWT token
      cy.authenticateAndSaveToken();
    });
  
    it("Should successfully fetch user cohorts data", () => {
        cy.pause()
      // Retrieve the JWT token from the Cypress environment
      const jwtoken = Cypress.env('jwtToken');
  
      // Send a GET request to the API endpoint
      cy.request({
        method: 'GET',
        url: 'http://20.92.231.254/api/v1/usercohorts',
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
  
        // Assuming the response is an array of user cohorts data
        const userCohortsData = response.body[0];
        expect(userCohortsData).to.have.property('id');
        expect(userCohortsData).to.have.property('name');
        expect(userCohortsData).to.have.property('admindescription');
        expect(userCohortsData).to.have.property('userdescription');
        expect(userCohortsData).to.have.property('createdby');
        expect(userCohortsData).to.have.property('createddate');
        expect(userCohortsData).to.have.property('modifiedby');
        expect(userCohortsData).to.have.property('modifieddate');
        expect(userCohortsData).to.have.property('isactive');
        expect(userCohortsData).to.have.property('image');
        expect(userCohortsData).to.have.property('identifier');
  
        // Add specific assertions for the data values if needed
        expect(userCohortsData.isactive).to.be.true;
      });
    });

      
    it("Should successfully create a user cohort", () => {
        cy.pause()
        // Retrieve the JWT token from the Cypress environment
        const jwtoken = Cypress.env('jwtToken');
    
        // Send a POST request to the API endpoint
        cy.request({
        method: 'POST',
        url: 'http://20.92.231.254/api/v1/usercohorts',
        headers: {
            accept: 'application/json',
            'X-ACCESS-TOKEN': jwtoken,
            'Content-Type': 'application/json',
        },
        body: {
            name: "usercohorts_post",
            admindescription: "admindescription",
            userdescription: "userdescription",
            userid: 1,
            image: "base64 Image",
        },
        }).then((response) => {
        // Assert the response status code
        expect(response.status).to.eq(201); // Expect a 201 status code for a successful creation
    
        // Assert the response body structure
        expect(response.body).to.have.property('message');
        expect(response.body).to.have.property('results');
        expect(response.body.results).to.be.an('array');
        expect(response.body.results.length).to.be.greaterThan(0);
    
        // Assuming the response contains the created user cohort data
        const response_body = response.body.results[0];
        expect(response_body).to.have.property('id');
        expect(response_body).to.have.property('name');
        expect(response_body).to.have.property('admindescription');
        expect(response_body).to.have.property('userdescription');
        expect(response_body).to.have.property('createdby');
        expect(response_body).to.have.property('createddate');
        expect(response_body).to.have.property('modifiedby');
        expect(response_body).to.have.property('modifieddate');
        expect(response_body).to.have.property('isactive');
        expect(response_body).to.have.property('image');
        expect(response_body).to.have.property('identifier');
    
        // Add specific assertions for the data values if needed
        expect(response_body.isactive).to.be.true;
        expect(response_body.name).to.equal("usercohorts_post");
        expect(response_body.admindescription).to.equal("admindescription");
        expect(response_body.userdescription).to.equal("userdescription");
        expect(response_body.createdby).to.equal(1);

        // Extract and save the identifier to a variable
        const identifier = response_body.identifier;
        Cypress.env('identifier', identifier);
    
        // Print the created identifier to the console
        cy.log(`identifier: ${identifier}`);
        });
    });

    it("Should successfully fetch a user cohort by identifier", () => {
        cy.pause()
        // Retrieve the JWT token from the Cypress environment
        const jwtoken = Cypress.env('jwtToken');
    
        // Retrieve the identifier from the Cypress environment
        const identifier = Cypress.env('identifier');
    
        // Send a GET request to the API endpoint with the identifier
        cy.request({
          method: 'GET',
          url: `http://20.92.231.254/api/v1/usercohorts/${identifier}`,
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
    
          // Assuming the response contains the user cohort data
          const response_body = response.body[0];
          expect(response_body).to.have.property('id');
          expect(response_body).to.have.property('name');
          expect(response_body).to.have.property('admindescription');
          expect(response_body).to.have.property('userdescription');
          expect(response_body).to.have.property('createdby');
          expect(response_body).to.have.property('createddate');
          expect(response_body).to.have.property('modifiedby');
          expect(response_body).to.have.property('modifieddate');
          expect(response_body).to.have.property('isactive');
          expect(response_body).to.have.property('image');
          expect(response_body).to.have.property('identifier');
    
          // Add specific assertions for the data values if needed
          expect(response_body.isactive).to.be.true;
          expect(response_body.name).to.equal("usercohorts_post");
          expect(response_body.admindescription).to.equal("admindescription");
          expect(response_body.userdescription).to.equal("userdescription");
          expect(response_body.createdby).to.equal(1);
          expect(response_body.identifier).to.equal(identifier);
        });
    });
      
    it("Should successfully update a user cohort by identifier", () => {
        cy.pause()
        // Retrieve the JWT token from the Cypress environment
        const jwtoken = Cypress.env('jwtToken');
    
        // Retrieve the identifier from the Cypress environment
        const identifier = Cypress.env('identifier');
    
        // Send a PUT request to the API endpoint with the updated data and identifier
        cy.request({
          method: 'PUT',
          url: `http://20.92.231.254/api/v1/usercohorts/${identifier}`,
          headers: {
            accept: 'application/json',
            'X-ACCESS-TOKEN': jwtoken,
            'Content-Type': 'application/json',
          },
          body: {
            name: "usercohorts_updated",
            admindescription: "admindescription_updated",
            userdescription: "userdescription_updated",
            userid: 28,
            image: "base64 Image",
          },
        }).then((response) => {
          // Assert the response status code
          expect(response.status).to.eq(200);
    
          // Assert the response body contains the success message
          expect(response.body).to.equal(`usercohorts modified with ID: ${identifier}`);
        });
    });

    it("Should successfully delete a user cohort by ID", () => {
        cy.pause()
        // Retrieve the JWT token from the Cypress environment
        const jwtoken = Cypress.env('jwtToken');
    
        // Retrieve the identifier from the Cypress environment
        const identifier = Cypress.env('identifier');
    
        // Send a DELETE request to the API endpoint with the user cohort's identifier
        cy.request({
          method: 'DELETE',
          url: `http://20.92.231.254/api/v1/usercohorts/${identifier}`,
          headers: {
            accept: '*/*',
            'X-ACCESS-TOKEN': jwtoken,
          },
        }).then((response) => {
          // Assert the response status code
          expect(response.status).to.eq(200);
    
          // Assert the response body contains the success message
          expect(response.body).to.equal(`usercohorts deleted with ID: ${identifier}`);
        });
    });

});
  