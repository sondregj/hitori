import { LineChecker } from '../types'

export const onlyDistinctOnLine: LineChecker = line => {
    const values = line.cells
        .filter(cell => !cell.confirmedBlack)
        .map(cell => cell.value)

    return values.length === [...new Set(values)].length
}

export const noAdjacentBlackOnLine: LineChecker = line => {
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
