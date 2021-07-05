export type Point = { x: number; y: number };

export function calculateDistance(a: Point, b: Point) {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

export function getTestInstance() {
  const points = [
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 2 },
    { x: 1, y: 0 },
  ];
  const distances: { [key: string]: { [key: string]: number } } = {};
  points.forEach((p1, idx1) => {
    const innerDistances: { [key: number]: number } = {};
    points.forEach((p2, idx2) => {
      innerDistances[idx2 + 1] = calculateDistance(p1, p2);
    });
    distances[idx1 + 1] = innerDistances;
  });
  const demand: { [key: string]: number } = {
    1: 0,
    2: 10,
    3: 10,
    4: 10,
    5: 10,
  };
  return {
    distances,
    demand,
    n: 5,
    c: 30,
  };
}
