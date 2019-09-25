import { IHitoriColumn, IHitoriRow } from './types'

export function transposeBoard(
    board: IHitoriRow[] | IHitoriColumn[],
): IHitoriRow[] | IHitoriColumn[] {
    return board[0].cells.map((col, i) => ({
        cells: board.map(row => row.cells[i]),
    }))
}
