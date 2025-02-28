import { faker } from '@faker-js/faker';

describe ('Should redirect to profile page', () => {

    // scenario de test login mdp OK
    it('Should display redirect to homepage', () => {
        cy.visit('/signin')
        //cy.get('[data-cy="alert"]').should('not.exist') 
        cy.get('[data-cy="email"]').type('sebzh29@outlook.com') 
        cy.get('[data-cy="password"]').type('azerty29')
        cy.get('[data-cy="signin-button"]').click()       

        // reload de page 
        cy.contains('GraineLink').should('be.visible')
        cy.get('[data-cy="home-link"]').click()      

        // verifier la présence de l'element profil dans la page
        cy.get('[data-cy="avatar-link"]').should('be.visible')
        cy.get('[data-cy="avatar-link"]').click()
        cy.get('[data-cy="profile-link"]').should('be.visible')
        cy.get('[data-cy="profile-link"]').click() 
    })
})







  