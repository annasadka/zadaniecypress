/// <reference types="cypress" />


describe('Test Cypress - weryfikacja komunikatu o braku dostępności', () => {
    it('Wypełnienie formularza i weryfikacja komunikatu o braku dostępności', () => {
        cy.visit('https://testy-zadanie.zapisani.dev/')


        // Accept all cookies
        //cy.get('#CookieBoxSaveButton').click();
        cy.contains('[type="button"]', 'Akceptuj wszystkie').click()


        // Fill out the form
        cy.get('input[name="email_main"]').type("test@example.com", { force: true })
        cy.get('input[name="phone_number"]').type('123456789', { force: true });
        cy.get('input[name="first_name"]').type('John', { force: true });
        cy.get('input[name="last_name"]').type('Doe', { force: true });
        cy.get('#select_option_372a8bb8').check();
        cy.get('input[name="basic_field_ee0b49fb"]').type('100', { force: true });
        cy.get('textarea[name="basic_field_855dd2b7"]').type('email', { force: true });


        // Select "Produkt ze skończoną pulą"
        cy.get('div').parents('.align-items-center').click({ multiple: true });


        // Click "Uzyskaj dostęp przedpremierowy"
        cy.contains("Uzyskaj dostęp przedpremierowy").click();


        // Verify error message
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Przepraszamy, produkt zapisani.pl jest obecnie niedostępny.');
        });
    });
});
