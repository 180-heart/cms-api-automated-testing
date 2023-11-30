/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    authenticateAndSaveToken(): Chainable<void>;
    categoryPostRequest(): Chainable<void>;
    createMessaging(): Chainable<void>;
    createProgram(): Chainable<void>;
    deleteMessaging(): Chainable<void>;
    deleteProgram(): Chainable<void>;
    createExercisePeriod(): Chainable<void>;
    createExeriseZone(): Chainable<void>;
    programPeriodMapping(): Chainable<void>;
    deleteExercisePeriod(): Chainable<void>;
    deleteExeriseZone(): Chainable<void>;
    createQuestionType(): Chainable<void>;
    deleteQuestionType(): Chainable<void>;
    createQuestion(): Chainable<void>;
    deleteQuestion(): Chainable<void>;
  }
}