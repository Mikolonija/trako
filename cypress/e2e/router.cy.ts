import { cyTestWebsiteLink, routerPath } from '../../src/config';

describe('Router Tests', () => {
  describe('Navigate to Help Page', () => {
    it('should visit the help page and verify the correct URL', () => {
      cy.visit(`${cyTestWebsiteLink}${routerPath.help.path}`);
      cy.url().should('include', routerPath.help.path);
    });
  });

  describe('Navigate to Home Page', () => {
    it('should visit the home page and verify the correct URL', () => {
      cy.visit(`${cyTestWebsiteLink}${routerPath.home.path}`);
      cy.url().should('include', routerPath.home.path);
    });
  });

  describe('Navigate to Current Date Habit Page', () => {
    it('should visit the current date habit page and verify the URL', () => {
      const currentDate = new Date().toISOString().split('T')[0];
      cy.visit(`${cyTestWebsiteLink}/day/${currentDate}`);
      cy.url().should('include', `/day/${currentDate}`);
    });
  });

  describe('Navigate to Current Date Range Habit Page', () => {
    it('should visit the current date range habit page and verify the URL', () => {
      const currentDate = new Date().toISOString().split('T')[0];
      cy.visit(`${cyTestWebsiteLink}/day/${currentDate}/${currentDate}`);
      cy.url().should('include', `/day/${currentDate}/${currentDate}`);
    });
  });
});
