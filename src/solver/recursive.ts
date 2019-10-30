import HitoriBoard from '../board'
import { isSolved } from './validator'

import { IHitoriRow } from '../types'

export function solveRecursive(board: HitoriBoard): HitoriBoard | undefined {
    // Make a copy of the board so that we're certain we don't change it
    const testRows: IHitoriRow[] = board.copy().asRows

    // Check all valid configurations of the board recursively
    const solvedRows = _solveRecursive(testRows, board.asRows, board.size)

    return solvedRows && new HitoriBoard({ size: board.size, rows: solvedRows })
}

function _solveRecursive(
    rows: IHitoriRow[],
    confirmed: IHitoriRow[],
    size: number,
    /*noConflicts: boolean[][],*/
    x: number = 0,
    y: number = 0,
): IHitoriRow[] | undefined {
    // - Further optimalizations
    //
    //   The check for solved currently takes around 7/8 of the time.
    //   For the main test set that currently means going from 800 secs for main test,
    //   to 100 secs, which is way too much anyway. Best efforts may be placed in pattern techniques,
    //   and similar things, as each cell confirmed before recursing cuts the time in half.

    // Base case, all rules satisfied
    if (isSolved(new HitoriBoard({ rows, size }))) {
        return rows
    }

    // Out of bounds, this means we have exhausted all options without
    // finding a solution
    if (y >= size) {
        return undefined
    }

    // Compute the indices to check in next recursive call
    const nextX = x >= size - 1 ? 0 : x + 1
    const nextY = x >= size - 1 ? y + 1 : y

    // Here, we branch of into all the valid solution trees
    // We respect the choices made in previous pattern checkers
    // Another goal here is also to eliminate decision trees that we know
    // are going to fail, by the rules of Hitori

    // For each valid choice
    // -> Make that choice and recur

    /**
     * - We have already concluded on this cell before recursing
     *
     *   In this case we assume it is correct and move on.
     */
    if (confirmed[y].cells[x].confirmedWhite || confirmed[y].cells[x].confirmedBlack) {
        return _solveRecursive(rows, confirmed, size, nextX, nextY)
    }

    /**
     * - Test making black
     *
     *   We only need to test a black cell in this position if there
     *   are none adjacent to it
     */
    if (!adjacentBlackCell(rows, x, y)) {
        rows[y].cells[x].confirmedBlack = true
        const cellBlackResult = _solveRecursive(rows, confirmed, size, nextX, nextY)

        if (cellBlackResult) {
            return cellBlackResult
        }
    }

    /**
     * - Test not making black
     *
     *   Any number of cells in a row can be white, so we need to
     *   check all of them.
     */
    rows[y].cells[x].confirmedBlack = false

    // No choices remain
    // After exhausting all the valid decisions, there is nowhere else to go
    return _solveRecursive(rows, confirmed, size, nextX, nextY)
}

function adjacentBlackCell(rows: IHitoriRow[], x: number, y: number): boolean {
    // Tuples of indices for adjacent cells, [x, y]
    return (
        [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]
            .map(coordinate => ({ xIndex: coordinate[0], yIndex: coordinate[1] }))

            // Filter out the indices outside the board
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
