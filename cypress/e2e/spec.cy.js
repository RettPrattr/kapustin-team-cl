
describe('template spec', () => {
	it('passes', () => {
		cy.visit('https://kapustin.team/')
		cy.get('.nav-container', {
			timeout: 3000
		}).find('.nav-item', {
			timeout: 6000,
		}).each(($i) => {
			cy.get($i).click()
		})
		cy.get('[class*=button]', {
			timeout: 5000
		}).should('be.visible')
		cy.get('.header-btn', {
			timeout: 3000,
		}).click()
		cy.get('.fixedButton', {
			timeout: 3000,
		}).click()
		cy.get('.burger', {
			timeout: 4000,
		}).click()
		cy.get('.cards', {
			timeout: 3000,
		}).find('.cards-item', {
			timeout: 6000,
		})
			.should(($a) => {
				expect($a).to.have.attr('href')
			}).each(($i) => {
				cy.get($i, {timeout: 3000}).click().should('have.class', 'cards-item')
				cy.get('.caseBtn').invoke('attr', 'href')
				.then(href => {
				cy
					.request(href)
					.its('status')
					.should('eq', 200);
		  });
		})

		// cy.visit('https://kapustin.team/')
		// cy.get('.button', {
		// 	timeout: 3000,
		// }).click()
	}
	)
})