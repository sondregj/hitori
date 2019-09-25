import HitoriBoard from '../board'

import { noAdjacentBlackOnLine, onlyDistinctOnLine } from './line'
import { IHitoriRow } from '../types'

function numberOfIslands(board: HitoriBoard): number {
    const { size } = board
    const rows = board.asRows

    const visited: boolean[][] = rows.map(row => [])

    let islands = 0

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (!visited[y][x] && !rows[y].cells[x].confirmedBlack) {
                dfs(x, y, rows, visited)

                islands++
            } else {
                visited[y][x] = true
            }
        }
    }

    return islands
}

function dfs(x: number, y: number, rows: IHitoriRow[], visited: boolean[][]) {
    visited[y][x] = true

    const targets: Array<[number, number]> = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
    ]

    for (const target of targets) {
        const [rowIndex, columnIndex] = target

        if (isCellOpen(rowIndex, columnIndex, rows, visited)) {
            dfs(rowIndex, columnIndex, rows, visited)
        }
    }
}

function isCellOpen(
    columnIndex: number,
    rowIndex: number,
    rows: IHitoriRow[],
    visited: boolean[][],
): boolean {
    return (
        columnIndex >= 0 &&
        rowIndex >= 0 &&
        rowIndex < rows.length &&
        columnIndex < rows[0].cells.length &&
        !visited[rowIndex][columnIndex] &&
        !rows[rowIndex].cells[columnIndex].confirmedBlack
    )
}

export function allCellsOrthogonallyConnected(board: HitoriBoard): boolean {
    const { size } = board
    const rows = board.asRows.map(row => row.cells)

    return numberOfIslands(board) === 1

    const targets = (x: number, y: number): Array<[number, number]> => [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
    ]

    // TODO Figure out how to check if all on a single surface

    return (
        rows
            .map((row, yIndex): boolean[] =>
                row.map((cell, xIndex): boolean => {
                    const toCheck = targets(xIndex, yIndex)

                    return toCheck.reduce((prev, target) => {
                        const [x, y] = target

                        // If checking outside board, treat as blocked
                        if (Math.min(x, y) < 0 || Math.max(x, y) >= size) {
                            return false || prev
                        }

                        return !cell.confirmedBlack
                            ? !rows[y][x].confirmedBlack || prev
                            : true
                    }, Boolean(false))
                }),
            )

            // TODO We're currently only checking that every white cell has a neighbor
            // Summarize to check if all cells are valid

            .flat()
            .reduce((prev, curr) => prev && curr, Boolean(true))
    )
}

export function onlyDistinctOnLinesOnBoard(board: HitoriBoard): boolean {
    const rows = board.asRows
    const columns = board.asColumns

    const onlyDistinctOnRows: boolean = rows.reduce(
        (result, row) => result && onlyDistinctOnLine(row),
        Boolean(true),
    )

    const onlyDistinctOnColumns: boolean = columns.reduce(
        (result, column) => result && onlyDistinctOnLine(column),
        Boolean(true),
    )

    return onlyDistinctOnRows && onlyDistinctOnColumns
}

export function conflictsHorizontallyOrVertically(
    board: HitoriBoard,
    x: number,
    y: number,
): boolean {
    const { size } = board

    if (Math.min(x, y) < 0 || Math.max(x, y) + 1 > size) {
        throw new Error('Index out of bounds')
    }

    const value = board.rows[y].cells[x].value

    const conflictsOnRow =
        board.rows[y].cells
            .map(cell => cell.value)
            .filter((_, i) => i !== x)
            .indexOf(value) > -1

    const conflictsOnColumn =
        board.asColumns[x].cells
            .map(cell => cell.value)
            .filter((_, i) => i !== y)
            .indexOf(value) > -1

    return conflictsOnRow || conflictsOnColumn
}

export function noAdjacentBlackOnBoard(board: HitoriBoard): boolean {
    const rows = board.asRows
    const columns = board.asColumns

    const noAdjacentBlackOnRows: boolean = rows.reduce(
        (result, row) => result && noAdjacentBlackOnLine(row),
        Boolean(true),
    )

    const noAdjacentBlackOnColumns: boolean = columns.reduce(
        (result, column) => result && noAdjacentBlackOnLine(column),
        Boolean(true),
    )

    return noAdjacentBlackOnRows && noAdjacentBlackOnColumns
}
