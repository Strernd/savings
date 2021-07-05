import { Instance, Solution, Tour } from './types';

// Requires a valid tour as input
export function evaluateTour(instance: Instance, tour: Tour): number {
  if (tour.length === 0) return 0;
  let idx = 0;
  let p1 = 1;
  let p2 = 1;
  let distance = 0;
  while (idx < tour.length) {
    p2 = p1;
    p1 = tour[idx];
    distance += instance.distances[p2][p1];
    idx++;
  }
  distance += instance.distances[tour[tour.length - 1]][1];
  return distance;
}

// Requires a valid solution as input
export function evaluateSolution(instance: Instance, solution: Solution): number {
  let sum = 0;
  solution.forEach((tour) => (sum += evaluateTour(instance, tour)));
  return sum;
}

export function getDemandOfTour(instance: Instance, tour: Tour) {
  let sum = 0;
  tour.forEach((stop) => (sum += instance.demand[stop]));
  return sum;
}
