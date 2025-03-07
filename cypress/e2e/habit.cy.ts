import { cyTestWebsiteLink } from '../../src/config';

describe('Habit Tests', () => {
  beforeEach(() => {
    cy.visit(cyTestWebsiteLink);
    cy.get('[data-testid="cy-open-create-habit-modal-btn"]').should('be.visible').click();
    cy.get('[data-testid="cy-habit-name"]').should('be.visible').type('testHabit');
    cy.get('[data-testid="cy-habit-end-date"]').should('be.visible').click();
    cy.get('[data-testid="cy-habit-end-time"]').should('be.visible').click();
    cy.get('[data-testid="cy-submit-habit"]').should('be.visible').click();
  });

  it('Create and Read', () => {
    cy.get('[data-testid="cy-current-habit-card"]').should('be.visible');
  });

  it('Update', () => {
    cy.get('[data-testid="cy-open-edit-habit-modal-btn"]').should('be.visible').click();
    cy.get('[data-testid="cy-habit-name"]').should('be.visible').clear().type('testHabitEdit');
    cy.get('[data-testid="cy-submit-habit"]').should('be.visible').click();
    cy.get('[data-testid="cy-current-habit-card"]').should('be.visible');
  });

  it('Mark', () => {
    cy.get('[data-testid="cy-open-mark-habit-modal-btn"]').should('be.visible').click();
    cy.get('[data-testid="cy-confirm-action"]').should('be.visible').click();
    cy.get('[data-testid="cy-current-habit-card"]').should('be.visible');
  });

  it('Unmark', () => {
    cy.get('[data-testid="cy-open-mark-habit-modal-btn"]').should('be.visible').click();
    cy.get('[data-testid="cy-confirm-action"]').should('be.visible').click();
    cy.get('[data-testid="cy-open-unmark-habit-modal-btn"]').should('be.visible').click();
    cy.get('[data-testid="cy-confirm-action"]').should('be.visible').click();
    cy.get('[data-testid="cy-current-habit-card"]').should('be.visible');
  });

  it('Disable', () => {
    cy.get('[data-testid="cy-open-disable-habit-modal-btn"]').should('be.visible').click();
    cy.get('[data-testid="cy-confirm-action"]').should('be.visible').click();
    cy.get('[data-testid="cy-current-habit-card"]').should('not.exist');

    cy.get('[data-testid="cy-habit-inactive-section"]').should('be.visible').click();
    cy.get('[data-testid="cy-current-habit-card"]').should('be.visible');
  });

  it('Enable', () => {
    cy.get('[data-testid="cy-open-disable-habit-modal-btn"]').should('be.visible').click();
    cy.get('[data-testid="cy-confirm-action"]').should('be.visible').click();
    cy.get('[data-testid="cy-current-habit-card"]').should('not.exist');

    cy.get('[data-testid="cy-habit-inactive-section"]').should('be.visible').click();
    cy.get('[data-testid="cy-open-enable-habit-modal-btn"]').should('be.visible').click();
    cy.get('[data-testid="cy-confirm-action"]').should('be.visible').click();
    cy.get('[data-testid="cy-current-habit-card"]').should('not.exist');

    cy.get('[data-testid="cy-habit-active-section"]').should('be.visible').click();
    cy.get('[data-testid="cy-current-habit-card"]').should('be.visible');
  });

  it('Delete', () => {
    cy.get('[data-testid="cy-open-delete-habit-modal-btn"]').should('be.visible').click();
    cy.get('[data-testid="cy-confirm-action"]').should('be.visible').click();
  });
});
