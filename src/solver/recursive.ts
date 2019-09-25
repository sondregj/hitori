import HitoriBoard from '../board'
import { IHitoriRow } from '../types'

import { conflictsHorizontallyOrVertically } from '../checks/board'
import { isSolved } from './validator'

export function solveRecursive(board: HitoriBoard): HitoriBoard | undefined {
    const { size } = board

    // Make a copy of the board
    const testRows: IHitoriRow[] = [...board.rows].map(row => ({
        cells: row.cells.map(cell => ({ ...cell })),
    }))

    // Cache cells with no conflicts before recursing for performance
    const noConflicts: boolean[][] = testRows.map((row, yIndex) =>
        testRows[0].cells.map(
            (column, xIndex) =>
                !conflictsHorizontallyOrVertically(
                    new HitoriBoard({ size, rows: testRows }),
                    xIndex,
                    yIndex,
                ),
        ),
    )

    const solvedRows = _solveRecursive(
        testRows,
        board.asRows,
        board.size,
        0,
        0,
        noConflicts,
    )

    if (!solvedRows) {
        return undefined
    }

    return new HitoriBoard({ size: board.size, rows: solvedRows })
}

function _solveRecursive(
    rows: IHitoriRow[],
    confirmed: IHitoriRow[],
    size: number,
    x: number,
    y: number,
    noConflicts: boolean[][],
): IHitoriRow[] | undefined {
    // * - OPTIMALIZATION - *
    // The check for solved currently takes around 1/8 of the time.
    // For the main test set that currently means going from 800 secs for main test,
    // to 100 secs, which is way too much. Best efforts may be placed in pattern techniques,
    // and similar things, as each cell confirmed before recursing cuts the time in half.

    // Base case, all rules satisfied
    if (isSolved(new HitoriBoard({ rows, size }))) {
        return rows
    }

    // Out of bounds
    if (Math.max(x, y) >= size) {
        return undefined
    }

    // Compute the indices to check in next recursive call
    const nextX = x >= size - 1 ? 0 : x + 1
    const nextY = x >= size - 1 ? y + 1 : y

    // For each choice that can be made
    // We respect the choices made in previous pattern checkers
    // Another goal here is also to eliminate decision trees that we know
    // are going to fail, by the rules of Hitori
    // -> Make that choice and recur

    // - There are no conflicts
    // if (noConflicts[y][x]) {
    // 		return _solveRecursive(rows, confirmed, size, nextX, nextY, noConflicts)
    // }

    // - We have already concluded on this cell before recursing
    if (confirmed[y].cells[x].confirmedWhite || confirmed[y].cells[x].confirmedBlack) {
        return _solveRecursive(rows, confirmed, size, nextX, nextY, noConflicts)
    }

    const noAdjacentBlackCell: boolean = !adjacentBlackCell(rows, x, y)

    // - Test making black

    // We only need to test a black cell in this position if there
    // are none adjacent to it
    if (noAdjacentBlackCell) {
        rows[y].cells[x].confirmedBlack = true
        const cellBlackResult = _solveRecursive(
            rows,
            confirmed,
            size,
            nextX,
            nextY,
            noConflicts,
        )

        if (cellBlackResult) {
            return cellBlackResult
        }
    }

    // - Test not making black
    rows[y].cells[x].confirmedBlack = false

    const cellNotBlackResult = _solveRecursive(
        rows,
        confirmed,
        size,
        nextX,
        nextY,
        noConflicts,
    )

    if (cellNotBlackResult) {
        return cellNotBlackResult
    }

    // No choices remain
    return undefined
}

function adjacentBlackCell(rows: IHitoriRow[], x: number, y: number): boolean {
    // Tuples of indices for adjacent cells, [x, y]
    return (
        [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]
            .map(coordinate => ({ xIndex: coordinate[0], yIndex: coordinate[1] }))

            // Filter out indices outside the board
            .filter(
                ({ xIndex, yIndex }) =>
                    Math.min(xIndex, yIndex) >= 0 &&
                    Math.max(xIndex, yIndex) < rows.length,
            )

            // Check if cells at the indices are black
            .map(({ xIndex, yIndex }) => !!rows[yIndex].cells[xIndex].confirmedBlack)
            .reduce((result, adjacentBlack) => result || adjacentBlack, Boolean(false))
    )
}
