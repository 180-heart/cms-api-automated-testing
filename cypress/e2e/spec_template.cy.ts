describe('template spec', () => {
  it('passes', () => {
  //Getting response from browserstack demo website 
  cy.request('GET','https://www.google.co.uk/').then((response) =>{
  //Expecting the response status code to be 200
  expect(response.status).to.eq(200)
  })
  })
  })