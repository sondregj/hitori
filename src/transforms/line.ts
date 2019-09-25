import { IHitoriColumn, IHitoriRow, LineTransformer } from '../types'

export const markUniqueWhite: LineTransformer = line => {
    interface ValueCount {
        value: number
        count: number
    }

    const oneOccurence: number[] = line.cells
        .map(cell => cell.value)
        .reduce<ValueCount[]>((valueCount, currentValue) => {
            valueCount[currentValue] = {
                count: valueCount[currentValue]
                    ? valueCount[currentValue].value + 1
                    : 1,
                value: currentValue,
            }

            return valueCount
        }, [])
        .filter(valueCount => valueCount.count === 1)
        .map(valueCount => valueCount.value)

    return {
        cells: line.cells.map(cell => {
            return { ...cell, confirmedWhite: oneOccurence.indexOf(cell.value) >= 0 }
        }),
    }
}

export const markValuesBlackOnLineIfNotWhite: LineTransformer = (
    line,
    value: number,
) => {
    return {
        cells: line.cells.map(cell =>
            !cell.confirmedWhite && cell.value === value
                ? { ...cell, black: true }
                : cell,
        ),
    }
}

/**
 * If a triple has been identified, this function will mark the middle cell white,
 * and the surrounding cells black.
 *
 * @param line
 * @param middleIndex
 */
export const markMiddleOfTripleWhite: LineTransformer = (line, middleIndex: number) => {
    line.cells[middleIndex].confirmedWhite = true

    line.cells[middleIndex - 1].confirmedBlack = true
    line.cells[middleIndex + 1].confirmedBlack = true

    return line
}

export const markMiddleOfCellBetweenPairWhite: LineTransformer = (
    line,
    middleIndex: number,
) => {
    line.cells[middleIndex].confirmedWhite = true

    return line
}
