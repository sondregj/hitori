import HitoriBoard from '../board'
import { LineChecker } from '../types'
import { transposeBoard } from '../utils'

export function checkAllRowsAndColumnsOfBoard(
    board: HitoriBoard,
    lineChecker: LineChecker,
): boolean {
    const boardToCheck = board.copy()

    const checkedRows = boardToCheck.asRows.map(row => lineChecker(row))
    const checkedColumns = boardToCheck.asColumns.map(column => lineChecker(column))

    return [...checkedRows, ...checkedColumns].reduce<boolean>(
        (result, current) => result && current,
        true,
    )
}

export { noAdjacentBlackOnLine, onlyDistinctOnLine } from './line'
export {
    allCellsOrthogonallyConnected,
    conflictsHorizontallyOrVertically,
    noAdjacentBlackOnBoard,
    onlyDistinctOnLinesOnBoard,
} from './board'
