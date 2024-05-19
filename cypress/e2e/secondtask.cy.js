describe('Formularz', () => {

    it('Wypełnia formularz i sprawdza liczbę produktów', () => {
        let initialProductCount;

        cy.visit('https://testy-zadanie.zapisani.dev/formularz');

        // Accept all cookies
        cy.contains('[type="button"]', 'Akceptuj wszystkie').click({ force: true });

        cy.get(':nth-child(2) > .react-page-cell-inner > [style="display: flex; flex-direction: column; height: 100%;"] > #alignment-decorator > .d-flex > .m-2 > .p-4 > :nth-child(6) > .col')
            .invoke("text")
            .then(($valueFromField) => {
                const indexOfSemicolon = $valueFromField.indexOf(':');
                initialProductCount = Number($valueFromField.substring(indexOfSemicolon + 1).trim());
            });


        // Fill out the form
        cy.get('input[name="email_main"]').type("test@example.com", { force: true })
        cy.get('input[name="phone_number"]').type('123456789', { force: true });
        cy.get('input[name="first_name"]').type('John', { force: true });
        cy.get('input[name="last_name"]').type('Doe', { force: true });
        cy.get('#select_option_372a8bb8').check();
        cy.get('input[name="basic_field_ee0b49fb"]').type('100', { force: true });
        cy.get('textarea[name="basic_field_855dd2b7"]').type('email', { force: true });


        // Select "Produkt ze skończoną pulą"
        cy.get('.btn-group').click({ multiple: true });


        // Click "Uzyskaj dostęp przedpremierowy"
        cy.contains("Uzyskaj dostęp przedpremierowy").click();


        // Select "płatność gotówką"
        cy.get('.btn-outline-secondary').click();


        // Click "Zarejestruj i zapłać"
        cy.get('.my-auto > .shadow').click();


        // Click "Zakończ"
        cy.contains("Zakończ", { timeout: 10000 }).click();


        // Verify that the number of available products will be 1 less than the number of products originally available
        cy.get(':nth-child(2) > .react-page-cell-inner > [style="display: flex; flex-direction: column; height: 100%;"] > #alignment-decorator > .d-flex > .m-2 > .p-4 > :nth-child(6) > .col')
            .invoke("text")
            .then(($valueFromField) => {
                const indexOfSemicolon = $valueFromField.indexOf(':');
                const finalProductCount = Number($valueFromField.substring(indexOfSemicolon + 1).trim());
                cy.log('product counts: ' + initialProductCount + ', ' + finalProductCount);
                expect(finalProductCount).to.equal(initialProductCount - 1);
            });
    });
});