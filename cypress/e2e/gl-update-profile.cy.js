let token = ''; 

before(() => {
  cy.request('POST', 'http://localhost:4000/auth/login', {
    email: 'sebzh291@outlook.com',
    password: 'azerty29'
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 201]); // Accepte 200 et 201
    expect(response.body).to.have.property('access_token');

    token = response.body.access_token;
    window.sessionStorage.setItem('accessToken', token);
  });
});

beforeEach(() => {
  // 🔥 Injecte le token à chaque test et visite la page Profil
  cy.window().then((win) => {
    win.sessionStorage.setItem('accessToken', token);
  });

  cy.visit('/profile');
  cy.contains('Profil').should('be.visible');
  //cy.get('[data-cy="edit-profile-button"]').click();  
});

it('Should update lastname', () => {
  // Modifier le profil champs lastname
  cy.get('[data-cy="edit-profile-button"]').click() 
  cy.get('[data-cy="lastname"]').clear()
  cy.get('[data-cy="lastname"]').type('Glippa')
  cy.get('[data-cy="update-profile-button"]').click()
});

it('Should test update profile page', () => {
  // Modifier le profil champs description
  cy.get('[data-cy="edit-profile-button"]').click() 
  cy.get('[data-cy="description"]').clear()
  cy.get('[data-cy="description"]').type('Je suis un développeur!!')
  cy.get('[data-cy="update-profile-button"]').click()
});