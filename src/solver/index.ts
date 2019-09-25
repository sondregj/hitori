import HitoriBoard from '../board'

import { solveRecursive } from './recursive'
import { advancedTechniques, cornerTechniques, startingTechniques } from './techniques'

interface SolverParameters {
    readonly board: HitoriBoard
    skipPatterns?: boolean
}

/**
 * Entrypoint for Hitori solver
 */
export function solve({
    board,
    skipPatterns = false,
}: SolverParameters): [HitoriBoard | undefined, HitoriBoard[]] {
    const boardToSolve = board.copy()

    const iterations: HitoriBoard[] = [boardToSolve]

    const lastProposal = () => iterations[iterations.length - 1]

    // Apply patterns and logic to simplify the board,
    // and ideally arrive at a solution
    if (!skipPatterns) {
        let proposal: HitoriBoard

        // TODO 1. Starting techniques
        proposal = startingTechniques(lastProposal())
        iterations.push(proposal)

        // TODO 2. Corner techniques
        proposal = cornerTechniques(lastProposal())
        iterations.push(proposal)

        // TODO 3. Advanced techniques
        proposal = advancedTechniques(lastProposal())
        iterations.push(proposal)
    }

    // Solve parts of the board that are not already marked
    // iteratively or recursively
    const solution: HitoriBoard | undefined = solveRecursive(lastProposal())

    // If we have not found a solution yet, we'll rule it unsolvable
    if (!solution) {
        return [undefined, iterations]
    }

    iterations.push(solution)

    return [solution, iterations]
}
