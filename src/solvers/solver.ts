import HitoriBoard from '../board'

import { solveRecursive } from './recursive'

// import {} from './techniques'

import { isSolved } from './validator'

interface SolverParameters {
    readonly board: HitoriBoard
    skipInitialChecks?: boolean
}

/**
 * Entrypoint for Hitori solver
 */
export function solve({
    board,
    skipInitialChecks = false,
}: SolverParameters): [HitoriBoard | undefined, HitoriBoard[]] {
    const { size } = board

    const iterations: HitoriBoard[] = [board]

    const lastProposal = () => iterations[iterations.length - 1]

    // TODO 1. Starting techniques

    // iterations.push(startingTechniques(lastProposal()))

    // TODO 2. Corner techniques

    // TODO 3. Advanced techniques

    // TODO 4. Solve rest of board iteratively or recursively
    let solution: HitoriBoard | undefined

        solution = solveRecursive(lastProposal())

    if (!solution) {
        return [undefined, iterations]
    }

    iterations.push(solution)

    // 5. Final checks
    if (!isSolved(lastProposal())) {
        return [undefined, iterations]
    }

    return [new HitoriBoard({ size, rows: lastProposal().asRows }), iterations]
}
