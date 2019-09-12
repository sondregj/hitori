import HitoriBoard from './board'
import { IHitoriBoard, IHitoriRow } from './types'

interface SolverParameters {
    readonly board: HitoriBoard
}

export function solve({ board }: SolverParameters): HitoriBoard {
    return HitoriBoard.from2DArray([[1, 1], [0]])
}
