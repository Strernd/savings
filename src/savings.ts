import { getDemandOfTour, evaluateTour } from './evaluation';
import { Instance, Solution } from './types';

interface Saving {
    saving: number;
    frontTour: number;
    backTour: number;
  }

export function createStartSolution(instance: Instance): Solution {
  const startTours: Solution = [];
  for (let i = 2; i <= instance.n; i++) {
    startTours.push([i]);
  }
  return startTours;
}

export function createNewSolutionFromSaving(saving: Saving, currentSolution: Solution): Solution {
  const newTour = [...currentSolution[saving.frontTour], ...currentSolution[saving.backTour]];
  const newSolution = [newTour];
  currentSolution.forEach((tour, idx) => {
    if (idx !== saving.backTour && idx !== saving.frontTour) {
      newSolution.push(tour);
    }
  });
  return newSolution;
}

export function savings(instance: Instance): Solution {
  let currentSolution: Solution = [];
  let betterSolution: Solution | undefined = createStartSolution(instance);

  while (betterSolution !== undefined) {
    currentSolution = betterSolution;
    betterSolution = undefined;
    // Save computation by calculating each tour beforehand
    const tourScores: { [key: number]: number } = {};
    currentSolution.forEach((tour, idx) => (tourScores[idx] = evaluateTour(instance, tour)));

    const savings: Saving[] = [];
    currentSolution.forEach((tour1, tour1Idx) => {
      currentSolution.forEach((tour2, tour2Idx) => {
        if (tour1Idx === tour2Idx) return;
        const joinedTour = [...tour1, ...tour2];
        // Don't accept (or even calculate) the saving if the tour isn't feasible because of capacity restrictions
        if (getDemandOfTour(instance, joinedTour) <= instance.c) {
          const saving = evaluateTour(instance, joinedTour) - tourScores[tour1Idx] - tourScores[tour2Idx];
          if (saving < 0) savings.push({ saving, frontTour: tour1Idx, backTour: tour2Idx });
        }
      });
    });

    if (savings.length) {
      const sortedSavings = savings.sort((a, b) => a.saving - b.saving);
      const bestSaving = sortedSavings[0];
      betterSolution = createNewSolutionFromSaving(bestSaving, currentSolution);
    }
  }
  return currentSolution;
}
