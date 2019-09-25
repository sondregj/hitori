import { IHitoriColumn, IHitoriRow } from '../types'

import { onlyDistinctOnLine } from '../checks/line'
import { markCellBlack } from '../transforms/board'
import {
    markMiddleOfCellBetweenPairWhite,
    markMiddleOfTripleWhite,
} from '../transforms/line'

/**
 * For adjacent triples of the same value, the middle one must be marked white,
 * and the ones beside it black. Otherwise, the no adjacent blacks rule would
 * be violated.
 *
 * @param line
 */
export const adjacentTriples = (line: IHitoriRow | IHitoriColumn) => {
    if (!onlyDistinctOnLine(line)) {
        const entries: { [key: string]: number[] } = {}

        line.cells.map((cell, index) => {
            if (entries[cell.value.toString()]) {
                entries[cell.value.toString()].push(index)
            } else {
                entries[cell.value.toString()] = [index]
            }
        })

        const triples = Object.keys(entries)
            .filter(key => entries[key].length >= 3)
            .map(key =>
                entries[key].sort().reduce(
                    (tally, index) => ({
                        consecutive:
                            tally.previousIndex >= 0 &&
                            tally.previousIndex + 1 === index
                                ? tally.consecutive + 1
                                : 1,
                        middleIndex:
                            tally.consecutive === 1 && tally.previousIndex >= 0
                                ? index
                                : tally.middleIndex,
                        previousIndex: index,
                    }),
                    {
                        consecutive: 0,
                        middleIndex: -1,
                        previousIndex: -1,
                    },
                ),
            )
            .filter(entry => entry.consecutive === 3)
            .filter(entry => entry.middleIndex >= 0)

        return triples.reduce(
            (alteredLine, triple) =>
                markMiddleOfTripleWhite(alteredLine, triple.middleIndex),
            line,
        )
    }

    return line
}

/**
 * If there is a cell between two equal cells, that cell must be marked white.
 * Otherwise the no adjacent blacks rule would be violated.
 *
 * @param line
 */
export const cellBetweenTwoEqual = (
    line: IHitoriRow | IHitoriColumn,
): IHitoriRow | IHitoriColumn => {
    if (!onlyDistinctOnLine(line)) {
        const lineString = line.cells.map(cell => cell.value).join('')
        const testRegex = /([0-9])([0-9])\1/

        const regexResults = lineString.match(testRegex)

        // const cellsBetweenPairs = regexResults ? regexResults[] .map()

        return line
        /*return cellsBetweenPairs.reduce(
            (alteredLine, cellBetweenPair) =>
                markMiddleOfCellBetweenPairWhite(
                    alteredLine,
                    cellBetweenPair.middleIndex,
                ),
            line,
        )*/
    }

    return line
}

/**
 * If there is a pair and a single of a value on a line, the single must be black,
 * because otherwise the pair would violate the no adjacent blacks rule.
 *
 * @param line to check
 */
export const pairInduction = (
    line: IHitoriRow | IHitoriColumn,
): IHitoriRow | IHitoriColumn => {
    return line
}

/**
 * If there are multiple instances of a value on a line, and one of them is marked white,
 * the others must be marked black
 *
 * @param line to check
 */
export function circleDetermination(
    line: IHitoriRow | IHitoriColumn,
): IHitoriRow | IHitoriColumn {
    // TODO
    return line
}
