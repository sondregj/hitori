import HitoriBoard from '../board'

import { IHitoriColumn, IHitoriRow } from '../types'

import { adjacentTriples, cellBetweenTwoEqual } from './patterns'

import { markUniqueWhite } from '../transforms/line'

export function startingTechniques(board: HitoriBoard): HitoriBoard {
    // TODO

    let transformedBoard: HitoriBoard = board.copy()

    transformedBoard = board
        // Cells unique in row or column
        // -> Mark white
        .transformAllRowsAndColumns(markUniqueWhite)

        // Search for adjacent triples
        // -> Mark middle white, adjacent black
        .transformAllRowsAndColumns(adjacentTriples)

        // Search for value between two cells of same number
        // -> Middle must be white, adjacent black
        .transformAllRowsAndColumns(cellBetweenTwoEqual)

        // Pair induction: a pair and a single on the same line
        // ->
        .transformAllRowsAndColumns(cellBetweenTwoEqual)

    return transformedBoard
}

export function basicTechniques(board: HitoriBoard): HitoriBoard {
    // TODO

    const boardToSolve = board.copy()

    const { size } = boardToSolve

    const rows: IHitoriRow[] = [...boardToSolve.asRows]
    const columns: IHitoriColumn[] = [...boardToSolve.asColumns]

    // Number can only appear one time in each row and column
    // -> Make violating cells black

    // Only white cells adjacent to black cells
    // -> Make adjacent cells to black cells white

    // Make white to avoid partitions

    return new HitoriBoard({ rows, size })
}

export function cornerTechniques(board: HitoriBoard): HitoriBoard {
    // TODO

    const boardToSolve = board.copy()

    const { size } = boardToSolve

    const rows: IHitoriRow[] = [...boardToSolve.asRows]
    const columns: IHitoriColumn[] = [...boardToSolve.asColumns]

    // Upper left corner

    // Upper right corner

    // Lower right corner

    // Lower left corner

    return new HitoriBoard({ rows, size })
}

export function advancedTechniques(board: HitoriBoard): HitoriBoard {
    // TODO

    return board
}
