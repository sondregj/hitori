export const testBoard: number[][] = [
    [5, 2, 1, 6, 2, 5],
    [3, 1, 4, 2, 6, 6],
    [4, 2, 3, 4, 6, 3],
    [4, 5, 6, 3, 2, 2],
    [2, 4, 3, 3, 4, 5],
    [6, 4, 6, 5, 3, 3],
]

export const invalid: number[][] = [[1, 2, 3], [1, 2], [1, 2, 3, 4]]

export const fiveByFive: number[][] = []

export const fourByFour: number[][] = [
    [1, 1, 1, 2],
    [3, 4, 5, 6],
    [7, 8, 9, 10],
    [3, 11, 5, 12],
]

export const unsolvable: number[][] = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
]

export default {
    fiveByFive,
    invalid,
    testBoard,
    unsolvable,
}
