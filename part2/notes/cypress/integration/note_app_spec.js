describe('Note app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Hank Hill',
			username: 'Hank',
			password: 'PropanePropain'
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.visit('http://localhost:3000')
	})

	it('front page can be opened', function() {
		cy.contains('Notes')
	})

	it('login form can be opened', function() {
		cy.contains('log in')
			.click()
	})

	it('user can login', function() {
		cy.contains('log in')
			.click()
		cy.get('#username')
			.type('Hank')
		cy.get('#password')
			.type('PropanePropain')
		cy.contains('login')
			.click()
		cy.contains('Hank Hill logged in')
	})

	describe('when logged in', function() {
		beforeEach(function() {
			// cy.visit('http://localhost:3000')
			cy.contains('log in')
				.click()
			cy.get('#username')
				.type('Hank')
			cy.get('#password')
				.type('PropanePropain')
			cy.contains('login')
				.click()
		})

		it('name of the user is shown', function() {
			cy.contains('Hank Hill logged in')
		})

		it('a new note can be created', function() {
			cy.contains('new note')
				.click()

			cy.get('#newnote')
				.type('a note created by cypress')
			cy.contains('save')
				.click()
			cy.contains('a note created by cypress')
		})

		describe('and a note is created', function () {
			beforeEach(function () {
				cy.contains('new note')
					.click()
				cy.get('input')
					.type('another note cypress')
				cy.contains('save')
					.click()
			})

			it('it can be made important', function () {
				cy.contains('another note cypress')
					.contains('make important')
					.click()

				cy.contains('another note cypress')
					.contains('make not important')
			})
		})
	})
})
