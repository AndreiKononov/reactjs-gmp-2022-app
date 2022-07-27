describe('Search movies', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('redirects to http://localhost:3000/search from /', () => {
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/search');
      expect(loc.search).to.eq('');
      expect(loc.href).to.eq('http://localhost:3000/search');
    });
  });

  it('displays a search form successfully', () => {
    cy.get('.hero')
      .should('be.visible')
      .within(() => {
        cy.get('h1').should('contain.text', 'Find your movie');
        cy.get('form')
          .should('be.visible')
          .within(() => {
            cy.get('button').should('contain.text', 'Search').should('be.enabled');
          });
      });
  });

  it('displays a list of 10 fetched movies', () => {
    cy.get('ul.movies-list')
      .should('be.visible')
      .within(() => {
        cy.get('li.movies-list-item').should('have.length', 10);
      });
  });

  it('redirects to /search/:searchQuery on Search form submit', () => {
    cy.get('form.searchForm')
      .should('be.visible')
      .within(() => {
        cy.get('input.form-input').type('Moon');

        cy.get('button').should('contain.text', 'Search').should('be.enabled').click();

        cy.location().should((loc) => {
          expect(loc.pathname).to.eq('/search/moon');
          expect(loc.search).to.eq('');
          expect(loc.href).to.eq('http://localhost:3000/search/moon');
        });
      });
  });

  it('displays movies that match searchQuery by title', () => {
    cy.get('form.searchForm')
      .should('be.visible')
      .within(() => {
        cy.get('input.form-input').type('Moon');
        cy.get('button').should('contain.text', 'Search').should('be.enabled').click();
      });

    cy.get('h2').should('contain.text', 'Loading...');

    cy.get('ul.movies-list')
      .should('be.visible')
      .within(() => {
        cy.get('li.movies-list-item span.movies-list-card-title').each((movieItem) => {
          expect(movieItem.text()).to.match(/moon/i);
        });
      });
  });
});
