let token = ''; 

before(() => {
  cy.request('POST', 'http://localhost:4000/auth/login', {
    email: 'sebzh29@outlook.com',
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

  cy.visit('/');
  // reload de page 
  cy.contains('GraineLink').should('be.visible')
  cy.get('[data-cy="home-link"]').click()      
    
  // verifier la présence de l'element profil dans la page
  cy.get('[data-cy="avatar-link"]').should('be.visible')
  cy.get('[data-cy="avatar-link"]').click()
  cy.get('[data-cy="profile-link"]').should('be.visible')
  cy.get('[data-cy="profile-link"]').click() 
  
  //selectionne le bouton edit profile
  cy.get('[data-cy="edit-profile-button"]').click();
  cy.get('[data-cy="change-password-link"]').click();
});

it('Should incorrect current password', () => {
  cy.get('[data-cy="current-password"]').type('azerty28'); // Faux mot de passe
  cy.get('[data-cy="new-password"]').type('azerty29');
  cy.get('[data-cy="confirm-password"]').type('azerty29');
  cy.get('[data-cy="change-password-button"]').click();

  // Vérifie qu'un message d'erreur s'affiche
  cy.contains('The current password is incorrect').should('be.visible');
});

it('Should dont match changed password', () => {
  cy.get('[data-cy="current-password"]').type('azerty29'); 
  cy.get('[data-cy="new-password"]').type('azerty30');
  cy.get('[data-cy="confirm-password"]').type('azerty31'); 
  cy.get('[data-cy="change-password-button"]').click();
});

it('Should update password successfully', () => {
  cy.get('[data-cy="current-password"]').type('azerty29'); 
  cy.get('[data-cy="new-password"]').type('nouveauMdp123');
  cy.get('[data-cy="confirm-password"]').type('nouveauMdp123');
  cy.get('[data-cy="change-password-button"]').click();

  // Vérifie que le succès est affiché
  //cy.contains('Mot de passe mis à jour avec succès').should('be.visible');
});
