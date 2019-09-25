import HitoriBoard from '../board'

import { BoardTransformer, IHitoriColumn, IHitoriRow } from '../types'

import { markUniqueWhite } from './line'

export const markUniqueCellsWhiteOnBoard: BoardTransformer = (
    board,
    x?: number,
    y?: number,
) => {
    const boardToTransform = board.copy()

    return boardToTransform.transformAllRowsAndColumns(markUniqueWhite)
}

/**
 * Given the coordinates of a cell, mark it's adjacent cells black
 */
export const markAdjacentCellsWhite: BoardTransformer = (
    board,
    x: number,
    y: number,
) => {
    const { size } = board

    if (Math.max(x, y) + 1 > size) {
        throw new Error('Index out of bounds.')
    }

    // Tuples of indices that should be marked white, [x, y]
    const targets: Array<[number, number]> = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
    ]

    const rows: IHitoriRow[] = board.asRows.map((row, yIndex) => ({
        cells: row.cells.map((cell, xIndex) =>
            targets.filter(target => target[0] === xIndex && target[1] === yIndex)
                .length >= 1
                ? { ...cell, white: true }
                : cell,
        ),
    }))

    return new HitoriBoard({ size, rows })
}

export const markCellBlack: BoardTransformer = (board, x: number, y: number) => {
    const { size } = board

    if (Math.max(x, y) + 1 > size) {
        throw new Error('Index out of bounds.')
    }

    const rows: IHitoriRow[] = board.asRows.map((row, yIndex) => ({
        cells: row.cells.map((cell, xIndex) =>
            xIndex === x && yIndex === y ? { ...cell, confirmedBlack: true } : cell,
        ),
    }))

    return new HitoriBoard({ size, rows: board.asRows })
}
