import vrp from 'vrpinstances';
import { evaluateSolution } from './evaluation';
import { savings } from './savings';
import { Instance, Solution } from './types';

const instanceNames: string[] = vrp.listInstances();

function fmtSolution(s: Solution) {
  let out = '';
  s.forEach((tour) => {
    out += '[';
    tour.forEach((stop) => {
      out += `${stop},`;
    });
    out += '] ';
  });
  return out;
}

instanceNames.forEach((instanceName) => {
  const instance: Instance = vrp.get(instanceName);
  const solution = savings(instance);
  const score = evaluateSolution(instance, solution);
  console.log('Instance ', instanceName);
  console.log(fmtSolution(solution));
  console.log(`Vehicles: ${solution.length}`);
  console.log(`Score: ${score}, Best: ${instance.best}`);
  console.log(' ');
});
