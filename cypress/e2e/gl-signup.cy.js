import { faker } from '@faker-js/faker';
const email = faker.internet.email();

describe ('Should redirect to homepage', () => {
 
    /*************************SignUp*************************/
    beforeEach(() => {
        cy.visit('/signup')
    })
    it('SIGNUP', () => {})

    //scenario de test mdp pas correspondant
    it('Should display alert by wrong password', () => {       
        //cy.get('[data-cy="alert"]').should('not.exist') // vérifie que l'alerte n'existe pas si on a une alerte ds notre code
        cy.get('[data-cy="email"]').type('toto@alt.bzh') // va remplir le champ email
        cy.get('[data-cy="firstName"]').type('toto') // va remplir le champ firstName
        cy.get('[data-cy="lastName"]').type('toto') // va remplir le champ lastName 
        cy.get('[data-cy="password"]').type('123456') // va remplir le champ password
        cy.get('[data-cy="confirmPassword"]').type('1234567') // va remplir le champ confirmPassword
        cy.get('[data-cy="register-button"]').click() // va cliquer sur le bouton submit
        //cy.get('[data-cy="alert"]').should('exist')        
    })




    // scenario de test mdp correspondant mais email déjà existant
    it('Should display alert by email exist', () => {       
        //cy.get('[data-cy="alert"]').should('not.exist') 
        cy.get('[data-cy="email"]').type('sebzh29@outlook.com') 
        cy.get('[data-cy="firstName"]').type('toto') 
        cy.get('[data-cy="lastName"]').type('toto') 
        cy.get('[data-cy="password"]').type('12345678') 
        cy.get('[data-cy="confirmPassword"]').type('12345678') 
        cy.get('[data-cy="register-button"]').click()
        //cy.get('[data-cy="alert"]').should('exist')        
    })

        // scenario de test mdp correspondant mais email ok donc ajoute une ligne en BDD
        it('Should display redirect to signin page', () => {            
            //cy.get('[data-cy="alert"]').should('not.exist')             
            cy.get('[data-cy="email"]').type(email) 
            cy.get('[data-cy="firstName"]').type('toto')
            cy.get('[data-cy="lastName"]').type('toto') 
            cy.get('[data-cy="password"]').type('azerty29') 
            cy.get('[data-cy="confirmPassword"]').type('azerty29') 
            cy.get('[data-cy="register-button"]').click()
            //redirige vers page signin
            //cy.url().should('include', '/signin') 
            //envoie de mail

                                    
        })

})