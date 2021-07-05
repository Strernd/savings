export interface Instance {
    best: number;
    n: number;
    distances: {[key: string]: {[key: string]: number} }
    demand: {[key: string]: number}
    c: number;
    depot: number;
}
export type Tour = number[]

export type Solution = Tour[];
