import { movies } from '../../src/mocks/movies';

describe('Select/Deselect Movie', () => {
  describe('Selecting movie from list', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    it('does not display a selected movie card', () => {
      cy.get('div.movie-card-selected').should('not.exist');
    });

    it('displays a list of 10 fetched movies', () => {
      cy.get('ul.movies-list')
        .should('be.visible')
        .within(() => {
          cy.get('li.movies-list-item').should('have.length', 10);
        });
    });

    it('should set movie query parameter to the selected movie id', () => {
      cy.get('ul.movies-list')
        .should('be.visible')
        .within(() => {
          cy.get('li.movies-list-item')
            .first()
            .within(() => {
              cy.get('span.movies-list-card-title').should('have.text', movies[0].title).click();

              cy.location().should((loc) => {
                expect(loc.search).to.eq(`?movie=${movies[0].id}`);
              });
            });
        });
    });

    it('should display selected movie card', () => {
      cy.get('ul.movies-list')
        .should('be.visible')
        .within(() => {
          cy.get('li.movies-list-item')
            .first()
            .within(() => {
              cy.get('span.movies-list-card-title').should('have.text', movies[0].title).click();
            });
        });

      cy.get('div.movie-card-selected')
        .should('be.visible')
        .within(() => {
          cy.get('span.movie-card-selected-title').should('have.text', movies[0].title);
        });
    });
  });

  describe('Going back to search', () => {
    beforeEach(() => {
      cy.visit(`http://localhost:3000/search?movie=${movies[1].id}`);
    });

    it('should hide open search form on search button click', () => {
      cy.get('div.movie-card-selected-container')
        .should('be.visible')
        .within(() => {
          cy.get('button.movie-card-selected-search-btn').should('be.visible').click();
        });

      cy.get('div.movie-card-selected-container').should('not.exist');
      cy.get('.hero')
        .should('be.visible')
        .within(() => {
          cy.get('h1').should('contain.text', 'Find your movie');
        });
    });

    it('should remove movie query parameter on search button click', () => {
      cy.get('div.movie-card-selected-container')
        .should('be.visible')
        .within(() => {
          cy.get('button.movie-card-selected-search-btn').should('be.visible').click();
        });

      cy.location().should((loc) => {
        expect(loc.search).to.eq(``);
      });
    });
  });
});
