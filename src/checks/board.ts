import { HitoriBoard } from '../board'

import { noAdjacentBlackOnLine, onlyDistinctOnLine } from './line'

import { BoardChecker, IHitoriRow } from '../types'

export const allCellsOrthogonallyConnected: BoardChecker = board => {
    const { size } = board
    const rows = board.asRows

    const visited: boolean[][] = rows.map(row => [])

    let connectedSurfaces = 0

    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (!visited[y][x] && !rows[y].cells[x].confirmedBlack) {
                dfs(x, y, rows, visited)

                connectedSurfaces++
            } else {
                visited[y][x] = true
            }
        }
    }

    return connectedSurfaces === 1
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

export const onlyDistinctOnLinesOnBoard: BoardChecker = board => {
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

export const conflictsHorizontallyOrVertically: BoardChecker = (
    board: HitoriBoard,
    x: number,
    y: number,
) => {
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

export const noAdjacentBlackOnBoard: BoardChecker = board => {
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
