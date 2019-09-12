import { InvalidArrayError } from './errors'
import { IHitoriBoard, IHitoriRow, IHitoriColumn, IHitoriCell } from './types'

class HitoriBoard implements IHitoriBoard {
    public static from2DArray(array: number[][]): HitoriBoard {
        if (array.length < 1) {
            throw new InvalidArrayError('Array is empty.')
        }

        const size = array.length

        for (const row of array) {
            if (row.length !== size) {
                throw new InvalidArrayError('Board width does not equal board height.')
            }
        }

        const rows: IHitoriRow[] = array.map(row => {
            return { cells: row.map(value => ({ value })) }
        })

        return new HitoriBoard({ rows, size })
    }

    public static random(size: number = 5, maxNumber: number = 5): HitoriBoard {
        const rows: number[][] = []

        for (let i = 0; i < size; i++) {
            const row: number[] = []

            for (let j = 0; j < size; j++) {
                row[j] = Math.floor(Math.random() * maxNumber + 1)
            }

            rows[i] = row
        }

        return HitoriBoard.from2DArray(rows)
    }

    public static clear(size: number = 5, fill: number = 1): HitoriBoard {
        const array: number[][] = []

        for (let i = 0; i < size; i++) {
            const row: number[] = []

            for (let j = 0; j < size; j++) {
                row[j] = fill
            }

            array[i] = row
        }

        return HitoriBoard.from2DArray(array)
    }

    public readonly size: number
    public readonly rows: IHitoriRow[]

    constructor(board: IHitoriBoard) {
        this.size = board.size
        this.rows = board.rows
    }

    public get asRows(): IHitoriRow[] {
        return this.rows
    }

    public get asColumns(): IHitoriColumn[] {
        return this.rows[0].cells.map((col, i) => ({
            cells: this.rows.map(row => row.cells[i]),
        }))
    }

    public to2DArray(): number[][] {
        return this.rows.map(row => row.cells.map(cell => cell.value))
    }

    public getCoordinate(x: number, y: number): IHitoriCell {
        if (Math.max(x, y) + 1 > this.size) {
            throw new Error('Index out of bounds.')
        }

        return this.rows[y].cells[x]
    }
}

export default HitoriBoard
