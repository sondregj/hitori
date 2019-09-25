import HitoriBoard from '../board'
import { IHitoriColumn, IHitoriRow } from '../types'
import { conflictsHorizontallyOrVertically } from '../checks/board'

import { isSolved } from './validator'

export function solveRecursive(board: HitoriBoard): HitoriBoard | undefined {
    const { size } = board

    // Make a copy of the board
    const testRows: IHitoriRow[] = [...board.asRows].map(row => ({
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
    // -> Make that choice and recur

    // - There are no conflicts
    if (noConflicts[y][x]) {
        return _solveRecursive(rows, confirmed, size, nextX, nextY, noConflicts)
    }

    // - We have already concluded on this cell before recursing
    if (confirmed[y].cells[x].confirmedBlack || confirmed[y].cells[x].confirmedBlack) {
        return _solveRecursive(rows, confirmed, size, nextX, nextY, noConflicts)
    }

    // - Test making black
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
