import { BoardChecker } from '../types'

import {
    allCellsOrthogonallyConnected,
    noAdjacentBlackOnBoard,
    onlyDistinctOnLinesOnBoard,
} from '../checks/board'

export const isSolved: BoardChecker = board => {
    // From Wikipedia

    //   1. No row or column can have more than one occurrence of any given number
    //   2. Black cells cannot be adjacent, although they can be diagonal to one another.
    //   3. The remaining numbered cells must be all connected to each other, horizontally or vertically.

    const rule1: boolean = onlyDistinctOnLinesOnBoard(board)
    const rule2: boolean = noAdjacentBlackOnBoard(board)
    const rule3: boolean = allCellsOrthogonallyConnected(board)

    return rule1 && rule2 && rule3
}
