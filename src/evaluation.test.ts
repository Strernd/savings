import { expect } from 'chai';
import { evaluateSolution, evaluateTour, getDemandOfTour } from './evaluation';
import { calculateDistance, Point, getTestInstance } from './test-helper';
import { Instance } from './types';

describe('calculate Distance', () => {
  const x: Point = { x: 1, y: 1 };
  it('should calculate the right distance for (1,1) and (2,1)', () => {
    const actual = calculateDistance(x, { x: 2, y: 1 });
    expect(actual).to.equal(1);
  });
  it('should calculate the right distance for (1,1) and (0,1)', () => {
    const actual = calculateDistance(x, { x: 0, y: 1 });
    expect(actual).to.equal(1);
  });
  it('should calculate the right distance for (1,1) and (1,2)', () => {
    const actual = calculateDistance(x, { x: 1, y: 2 });
    expect(actual).to.equal(1);
  });
  it('should calculate the right distance for (1,1) and (1,0)', () => {
    const actual = calculateDistance(x, { x: 1, y: 0 });
    expect(actual).to.equal(1);
  });
  it('should calculate the right distance for (1,1) and (2,2)', () => {
    const actual = calculateDistance(x, { x: 2, y: 2 });
    expect(actual).to.equal(Math.sqrt(2));
  });
});


const instance = getTestInstance();

describe('evaluateTour', () => {
  it('should evaluate tour with one stop correctly', () => {
    const dist = evaluateTour(instance as Instance, [2]);
    expect(dist).to.equal(2);
  });

  it('should evaluate tour with two stops correctly', () => {
    const dist = evaluateTour(instance as Instance, [2, 3]);
    expect(dist).to.equal(4);
  });

  it('should evaluate a different tour with two stops correctly', () => {
    const dist = evaluateTour(instance as Instance, [4, 5]);
    expect(dist).to.equal(4);
  });

  it('should evaluate a tour with 4 stops correctly', () => {
    const dist = evaluateTour(instance as Instance, [2, 3, 4, 5]);
    expect(dist).to.be.closeTo(7.414, 0.001);
  });

  it('should evaluate a tour with 4 stops in another order correctly', () => {
    const dist = evaluateTour(instance as Instance, [2, 4, 3, 5]);
    expect(dist).to.be.closeTo(6.242, 0.001);
  });
});

describe('evaluateSolution', () => {
  it('should evaluate two tours correctly', () => {
    const dist = evaluateSolution(instance as Instance, [
      [2, 3],
      [4, 5],
    ]);
    expect(dist).to.equal(8);
  });
});

describe('getDemandOfTour', () => {
  it('should give the correct demand for a tour of two stops', () => {
    const d = getDemandOfTour(instance as Instance, [2, 3]);
    expect(d).to.equal(20);
  });
  it('should give the correct demand for a tour of four stops', () => {
    const d = getDemandOfTour(instance as Instance, [2, 3, 4, 5]);
    expect(d).to.equal(40);
  });
});
