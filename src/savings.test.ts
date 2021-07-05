import { createNewSolutionFromSaving, createStartSolution, savings } from './savings';
import { Instance } from './types';
import { expect } from 'chai';
import { getTestInstance } from './test-helper';

describe('create start solution', () => {
  const instance = { n: 5 };
  it('should create a start solution from an instance', () => {
    const startSolution = createStartSolution(instance as Instance);
    expect(startSolution).to.eql([[2], [3], [4], [5]]);
  });
});

describe('createNewSolutionFromSaving', () => {
  it('should create a new solution', () => {
    const solution = [
      [2, 3],
      [4, 5],
      [6, 7],
    ];
    const saving = { saving: -5, frontTour: 2, backTour: 0 };
    const newSolution = createNewSolutionFromSaving(saving, solution);
    expect(newSolution).to.eql([
      [6, 7, 2, 3],
      [4, 5],
    ]);
  });
});

describe('savings', () => {
  it('should find a solution', () => {
    const instance = getTestInstance();
    const result = savings(instance as Instance);
    expect(result).to.eql([[2, 4, 3], [5]]);
  });
});
