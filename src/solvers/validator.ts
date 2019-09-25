import HitoriBoard from '../board'

import {
    allCellsOrthogonallyConnected,
    noAdjacentBlackOnBoard,
    onlyDistinctOnLinesOnBoard,
} from '../checks/board'

export function isSolved(board: HitoriBoard): boolean {
    // From Wikipedia

    // - No row or column can have more than one occurrence of any given number
    // - Black cells cannot be adjacent, although they can be diagonal to one another.
    // - The remaining numbered cells must be all connected to each other, horizontally or vertically.

    const rule1 = onlyDistinctOnLinesOnBoard(board)
    const rule2 = noAdjacentBlackOnBoard(board)
    const rule3 = allCellsOrthogonallyConnected(board)

    return rule1 && rule2 && rule3
}
