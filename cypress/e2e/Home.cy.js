describe('Home', () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.chucknorris.io/jokes/random", {
      statusCode: 200,
      fixture: 'one_norris_joke'
    });
    cy.visit('localhost:3000');
  });

  it('should display a header', () => {
    cy.get('.main-header').should('have.text', 'Chuck Norris Jokes');
  });

  it('should display a friendly Chuck Norris image', () => {
    cy.get('.friendly-chuck').should('have.attr', 'src', '/assets/friendly_chuck.jpg');
  });

  it('should display a Get a Joke button', () => {
    cy.get('.joke-button').should('have.text', 'Get a Joke');
  });

  it('should display a Relax Chuck button', () => {
    cy.get('.relax-button').should('have.text', 'Relax Chuck');
  });

  it('should display a Joke History button', () => {
    cy.get('.history-button').should('have.text', 'Joke History');
  });

  it('should produce a joke when the Get a Joke button is clicked', () => {
    cy.get('.joke-button').click();
    cy.get('.joke').should('exist');
    cy.get('.joke').should('have.text', `Chuck Norris doesn't make HTTP requests. He makes HTTP demands.`);
  });

  it('should display an unfriendly Chuck Norris image when the Get a Joke button is clicked', () => {
    cy.get('.joke-button').click();
    cy.get('.unfriendly-chuck').should('exist');
  });

  it('should display a message when the Relax Chuck button is clicked', () => {
    cy.get('.relax-button').click();
    cy.get('.message').should('exist');
    cy.get('.message').should('have.text', `Chuck Norris is always relaxed.`);
  });

  it('should display a message when the Relax Chuck button is clicked after a joke is displayed', () => {
    cy.get('.joke-button').click();
    cy.get('.relax-button').click();
    cy.get('.message').should('exist');
    cy.get('.message').should('have.text', `Chuck Norris was always relaxed, even if it didn't look like it to you.`);
  });

  it('should display an image of friendly Chuck Norris when the Relax Chuck button is clicked', () => {
    cy.get('.relax-button').click();
    cy.get('.friendly-chuck').should('exist');
  });

  it('should display an image of friendly Chuck Norris when the Relax Chuck button is clicked after a joke is displayed', () => {
    cy.get('.joke-button').click();
    cy.get('.relax-button').click();
    cy.get('.friendly-chuck').should('exist');
  });


  it('should display a modal when the Joke History button is clicked', () => {
    cy.get('.history-button').click();
    cy.get('.modal-content').should('exist');
  });

  it('should close the modal when the modal overlay is clicked', () => {
    cy.get('.history-button').click();
    cy.get('.modal-overlay').click();
    cy.get('.modal-content').should('not.exist');
  });

  it('should close the modal when the close button is clicked', () => {
    cy.get('.history-button').click();
    cy.get('.close-button').click();
    cy.get('.modal-content').should('not.exist');
  });

  it('should display a modal with one joke when the Joke History button is clicked and there is one joke', () => {
    cy.fixture('one_norris_joke.json').then((joke) => {  
      cy.intercept('GET', 'https://api.chucknorris.io/jokes/random', {
        statusCode: 200,
        body: joke,
      }).as('getJoke');

      cy.get('.joke-button').click();
      cy.wait('@getJoke').its('response.statusCode').should('eq', 200);
      cy.get('.history-button').click();
      cy.get('.modal-content').should('exist');
      cy.get('.joke-history ul').should('have.length', 1);
      cy.get('.joke-history li').first().should('contain', joke.value);
    });
  });

  xit('should display a modal with multiple jokes when the Joke History button is clicked and there are multiple jokes', () => {
    cy.fixture('saved_norris_jokes.json').then((jokes) => {
      cy.intercept('GET', 'https://api.chucknorris.io/jokes/random', {
        statusCode: 200,
        body: jokes[0], 
      });

      jokes.forEach(() => {
        cy.get('.joke-button').click();
        cy.get('.history-button').click();
        cy.get('.modal-overlay').click();
      });

      cy.get('.history-button').click();
      cy.get('.modal-content').should('exist');
      cy.get('.joke-history ul').should('have.length', 4);
      jokes.forEach((joke, index) => {
        cy.get('.joke-history li').eq(index).should('have.text', joke.value);
      });
    });
  });

  xit('should delete a joke from the history when the delete button is clicked', () => {
    cy.fixture('saved_norris_jokes.json').then((jokes) => {
      cy.intercept('GET', 'https://api.chucknorris.io/jokes/random', {
        statusCode: 200,
        body: jokes[0],
      });

      jokes.forEach(() => {
        cy.get('.joke-button').click();
        cy.get('.history-button').click();
      });

      cy.get('.joke-history ul').should('have.length', 4);
      cy.get('.delete-button').first().click();
      cy.get('.joke-history ul').should('have.length', 3);
      cy.get('.joke-history li').first().should('have.text', jokes[1].value);
    });
  });
});