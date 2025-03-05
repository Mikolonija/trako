import { ThemeType } from '../../src/types/enums/theme';
import { LanguageType } from '../../src/types/enums/language';
import { cyTestWebsiteLink } from '../../src/config';

describe('Settings Tests', () => {
  beforeEach(() => {
    cy.visit(cyTestWebsiteLink);
    cy.get('[data-testid="cy-resize-menu-btn"]').should('exist').click();
  });

  describe('Theme Tests', () => {
    it('Sets dark mode theme', () => {
      cy.get(`[data-testid="cy-${ThemeType.DM}"]`).click();
      cy.get(`[data-testid="cy-current-setting-${ThemeType.DM}"]`).should('exist');
    });

    it('Sets light mode theme', () => {
      cy.get(`[data-testid="cy-${ThemeType.LM}"]`).click();
      cy.get(`[data-testid="cy-current-setting-${ThemeType.LM}"]`).should('exist');
    });
  });

  describe('Language Tests', () => {
    it('Sets language to English', () => {
      cy.get(`[data-testid="cy-${LanguageType.EN}"]`).click();
      cy.get(`[data-testid="cy-current-setting-${LanguageType.EN}"]`).should('exist');
    });

    it('Sets language to Lithuanian', () => {
      cy.get(`[data-testid="cy-${LanguageType.LT}"]`).click();
      cy.get(`[data-testid="cy-current-setting-${LanguageType.LT}"]`).should('exist');
    });
  });
});
