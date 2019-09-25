import { IHitoriColumn, IHitoriRow } from '../types'

export function onlyDistinctOnLine(line: IHitoriRow | IHitoriColumn): boolean {
    const values = line.cells
        .filter(cell => !cell.confirmedBlack)
        .map(cell => cell.value)

    return values.length === [...new Set(values)].length
}

export function noAdjacentBlackOnLine(line: IHitoriRow | IHitoriColumn): boolean {
    return line.cells
        .map(cell => !!cell.confirmedBlack)
        .reduce(
            (result, currentBlack) => {
                return {
                    noAdjacent:
                        !(result.prevBlack && currentBlack) && result.noAdjacent,
                    prevBlack: currentBlack,
                }
            },
            {
                noAdjacent: true,
                prevBlack: false,
            },
        ).noAdjacent
}
