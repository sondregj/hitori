import HitoriBoard from './board'
import { IHitoriRow } from './types'

class BoardTransforms {
    public static markAdjacentCellsWhite(
        board: HitoriBoard,
        x: number,
        y: number,
    ): HitoriBoard {
        const { size } = board

        if (Math.max(x, y) + 1 > size) {
            throw new Error('Index out of bounds.')
        }

        const targets: Array<[number, number]> = [
            [x - 1, y - 1],
            [x - 1, y + 1],
            [x + 1, y - 1],
            [x + 1, y + 1],
        ]

        const rows: IHitoriRow[] = board.asRows.map((row, yIndex) => ({
            cells: row.cells.map((cell, xIndex) =>
                targets.filter(target => target[0] === xIndex && target[1] === yIndex)
                    .length >= 1
                    ? { ...cell, marked: true }
                    : cell,
            ),
        }))

        return new HitoriBoard({ size, rows })
    }

    public static markCellBlack(board: HitoriBoard, x: number, y: number): HitoriBoard {
        const { size } = board

        if (Math.max(x, y) + 1 > size) {
            throw new Error('Index out of bounds.')
        }

        const rows: IHitoriRow[] = board.asRows.map((row, yIndex) => ({
            cells: row.cells.map((
                cell,
                xIndex, // TODO Settle on fields for Cell type
            ) => (xIndex === x && yIndex === y ? { ...cell, marked: true } : cell)),
        }))

        return new HitoriBoard({ size, rows: board.asRows })
    }
}

export default BoardTransforms
