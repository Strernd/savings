# Savings

This is a simple implementation of the savings heuristic for the capacitated Vehicle Routing Problem. It is tested with some instances from Augerat et al. from the package `vrpinstances`. The implementation is not specified by any paper, it is just implemented right from my head.

## Solution format

Customers are labeled from 2 to n. 1 is always the depot. Solutions are arrays of arrays. The inner array represents a tour with implicit start and end at the depot. `[[2,4],[3,5]]` for example is a solution where the first vehicle visits `2` and then `4` and the second vehicle visits `3` and then `5`.

## Usage

Use `yarn start` to run the algorithm against Augerat et al. instances.  
Use `yarn test` to run tests.

## Complexity

This algorithm should run in `O(n^3)`. In each iteration of the while loop every tour is combined with every other tour. The amount of tours can be estimated by `n`, hence `n^2`. A combination can be found at most `n` times because then the solution would be a single tour that visits every customer. So the loop is executed at most `n` times.
