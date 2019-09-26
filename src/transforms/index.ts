import HitoriBoard from '../board'
import { LineTransformer } from '../types'
import { transposeBoard } from '../utils'

export function transformAllRowsAndColumnsOfBoard(
    board: HitoriBoard,
    lineTransformer: LineTransformer,
): HitoriBoard {
    const { size } = board

    const rows = board.asRows
    const transformedRows = rows.map(row => lineTransformer(row))

    const intermediateBoard: HitoriBoard = new HitoriBoard({
        rows: transformedRows,
        size,
    })

    const columns = intermediateBoard.asColumns
    const transformedColumns = columns.map(column => lineTransformer(column))

    return new HitoriBoard({ rows: transposeBoard(transformedColumns), size })
}

export {
    markMiddleOfCellBetweenPairWhite,
    markMiddleOfTripleWhite,
    markUniqueWhite,
    markValuesBlackOnLineIfNotWhite,
} from './line'
export { markAdjacentCellsWhite, markCellBlack } from './board'
