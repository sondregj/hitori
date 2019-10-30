import { checkAllRowsAndColumnsOfBoard } from './checks'
import { transformAllRowsAndColumnsOfBoard } from './transforms'

import { isSolved } from './solver/validator'
import { transposeBoard } from './utils'

import {
    BoardTransformer,
    IHitoriBoard,
    IHitoriCell,
    IHitoriColumn,
    IHitoriRow,
    LineChecker,
    LineTransformer,
} from './types'

import { InvalidArrayError } from './errors'

export class HitoriBoard implements IHitoriBoard {
    /* Constructors */

    public static from2DArray(array: number[][]): HitoriBoard {
        const size = array.length

        if (size < 1) {
            throw new InvalidArrayError('Array is empty.')
        }

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

    public getCoordinate(x: number, y: number): IHitoriCell {
        if (Math.min(x, y) < 0 || Math.max(x, y) + 1 > this.size) {
            throw new Error('Index out of bounds.')
        }

        return this.rows[y].cells[x]
    }

    /* Checks */

    public solved(): boolean {
        return isSolved(this)
    }

    /* Transforms */

    public transformAllRowsAndColumns(lineTransformer: LineTransformer): HitoriBoard {
        const { size } = this

        const rows = this.asRows
        const transformedRows = rows.map(row => lineTransformer(row))

        const intermediateBoard: HitoriBoard = new HitoriBoard({
            rows: transformedRows,
            size,
        })

        const columns = intermediateBoard.asColumns
        const transformedColumns = columns.map(column => lineTransformer(column))

        return new HitoriBoard({ rows: transposeBoard(transformedColumns), size })
    }

    public transformBoard(boardTransformer: BoardTransformer): HitoriBoard {
        const transformedBoard = boardTransformer(this)

        return new HitoriBoard(transformedBoard)
    }

    /* Representations */

    public get asRows(): IHitoriRow[] {
        return this.rows
    }

    public get asColumns(): IHitoriColumn[] {
        const rows = this.rows

        return transposeBoard(this.rows)
    }

    public to2DArray(): number[][] {
        return this.rows.map(row => row.cells.map(cell => cell.value))
    }

    /**
     * Printout intended for Stacc competition
     *
     * https://stacc.com/fagkveldkonkurranse
     */
    public toString = (): string =>
        this.rows
            // .flatMap(row => row.cells)
            .reduce<IHitoriCell[]>((all, row) => [...all, ...row.cells], [])
            .reduce((prev, curr) => prev + (curr.confirmedBlack ? 'X' : curr.value), '')

    /* Operations */

    public copy(): HitoriBoard {
        const rows = this.asRows.map(row => ({
            cells: row.cells.map(cell => ({ ...cell })),
        }))

        return new HitoriBoard({ size: this.size, rows })
    }

    public copyData(): IHitoriBoard {
        const rows = this.asRows.map(row => ({
            cells: row.cells.map(cell => ({ ...cell })),
        }))

        return { size: this.size, rows }
    }
}
