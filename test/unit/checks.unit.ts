import HitoriBoard from '../../src/board'
import { IHitoriRow } from '../../src/types'

import {
    allCellsOrthogonallyConnected,
    noAdjacentBlackOnBoard,
    onlyDistinctOnLinesOnBoard,
} from '../../src/checks/board'

test('Only distinct on board', () => {
    const validRows: IHitoriRow[] = [
        {
            cells: [
                { value: 1, confirmedBlack: true },
                { value: 2, confirmedBlack: false },
                { value: 3, confirmedBlack: true },
            ],
        },
        {
            cells: [
                { value: 2, confirmedBlack: false },
                { value: 3, confirmedBlack: false },
                { value: 4, confirmedBlack: false },
            ],
        },
        {
            cells: [
                { value: 3, confirmedBlack: false },
                { value: 4, confirmedBlack: true },
                { value: 5, confirmedBlack: false },
            ],
        },
    ]

    const invalidRows: IHitoriRow[] = [
        {
            cells: [
                { value: 1, confirmedBlack: false },
                { value: 2, confirmedBlack: true },
                { value: 1, confirmedBlack: false },
            ],
        },
        {
            cells: [
                { value: 2, confirmedBlack: false },
                { value: 2, confirmedBlack: true },
                { value: 4, confirmedBlack: false },
            ],
        },
        {
            cells: [
                { value: 3, confirmedBlack: true },
                { value: 4, confirmedBlack: false },
                { value: 4, confirmedBlack: true },
            ],
        },
    ]

    const validBoard = new HitoriBoard({ rows: validRows, size: 3 })
    const invalidBoard = new HitoriBoard({ rows: invalidRows, size: 3 })

    expect(onlyDistinctOnLinesOnBoard(validBoard)).toBe(true)
    expect(onlyDistinctOnLinesOnBoard(invalidBoard)).toBe(false)
})

test('All orthogonally connected on board', () => {
    const validRows: IHitoriRow[] = [
        {
            cells: [
                { value: 1, confirmedBlack: true },
                { value: 2, confirmedBlack: false },
                { value: 3, confirmedBlack: true },
            ],
        },
        {
            cells: [
                { value: 2, confirmedBlack: false },
                { value: 3, confirmedBlack: false },
                { value: 4, confirmedBlack: false },
            ],
        },
        {
            cells: [
                { value: 3, confirmedBlack: false },
                { value: 4, confirmedBlack: true },
                { value: 5, confirmedBlack: false },
            ],
        },
    ]

    const invalidRows: IHitoriRow[] = [
        {
            cells: [
                { value: 1, confirmedBlack: true },
                { value: 2, confirmedBlack: true },
                { value: 3, confirmedBlack: false },
            ],
        },
        {
            cells: [
                { value: 2, confirmedBlack: false },
                { value: 3, confirmedBlack: true },
                { value: 4, confirmedBlack: false },
            ],
        },
        {
            cells: [
                { value: 3, confirmedBlack: true },
                { value: 4, confirmedBlack: false },
                { value: 5, confirmedBlack: true },
            ],
        },
    ]

    const invalidFourByFour: IHitoriRow[] = [
        {
            cells: [
                {
                    value: 1,
                    confirmedBlack: true,
                },
                {
                    value: 1,
                    confirmedBlack: false,
                },
                {
                    value: 1,
                    confirmedBlack: true,
                },
                {
                    value: 2,
                    confirmedBlack: false,
                },
            ],
        },
        {
            cells: [
                {
                    value: 3,
                    confirmedBlack: false,
                },
                {
                    value: 4,
                    confirmedBlack: true,
                },
                {
                    value: 5,
                    confirmedBlack: false,
                },
                {
                    value: 6,
                    confirmedBlack: true,
                },
            ],
        },
        {
            cells: [
                {
                    value: 7,
                    confirmedBlack: false,
                },
                {
                    value: 8,
                    confirmedBlack: false,
                },
                {
                    value: 9,
                    confirmedBlack: false,
                },
                {
                    value: 10,
                    confirmedBlack: false,
                },
            ],
        },
        {
            cells: [
                {
                    value: 3,
                    confirmedBlack: true,
                },
                {
                    value: 11,
                    confirmedBlack: false,
                },
                {
                    value: 5,
                    confirmedBlack: true,
                },
                {
                    value: 12,
                    confirmedBlack: false,
                },
            ],
        },
    ]

    const validBoard = new HitoriBoard({ rows: validRows, size: 3 })
    const invalidBoard = new HitoriBoard({ rows: invalidRows, size: 3 })
    const invalidFourByFourBoard = new HitoriBoard({ rows: invalidFourByFour, size: 4 })

    expect(allCellsOrthogonallyConnected(validBoard)).toBe(true)

    expect(allCellsOrthogonallyConnected(invalidBoard)).toBe(false)
    expect(allCellsOrthogonallyConnected(invalidFourByFourBoard)).toBe(false)
})

test('No adjacent confirmedBlack on board', () => {
    const validRows: IHitoriRow[] = [
        {
            cells: [
                { value: 1, confirmedBlack: true },
                { value: 2, confirmedBlack: false },
                { value: 3, confirmedBlack: false },
            ],
        },
        {
            cells: [
                { value: 2, confirmedBlack: false },
                { value: 3, confirmedBlack: false },
                { value: 4, confirmedBlack: true },
            ],
        },
        {
            cells: [
                { value: 3, confirmedBlack: false },
                { value: 4, confirmedBlack: true },
                { value: 5, confirmedBlack: false },
            ],
        },
    ]

    const invalidRows: IHitoriRow[] = [
        {
            cells: [
                { value: 1, confirmedBlack: true },
                { value: 2, confirmedBlack: true },
                { value: 3, confirmedBlack: false },
            ],
        },
        {
            cells: [
                { value: 2, confirmedBlack: true },
                { value: 3, confirmedBlack: false },
                { value: 4, confirmedBlack: false },
            ],
        },
        {
            cells: [
                { value: 3, confirmedBlack: false },
                { value: 4, confirmedBlack: true },
                { value: 5, confirmedBlack: true },
            ],
        },
    ]

    const invalidFourByFour: IHitoriRow[] = [
        {
            cells: [
                {
                    value: 1,
                    confirmedBlack: true,
                },
                {
                    value: 1,
                    confirmedBlack: true,
                },
                {
                    value: 1,
                    confirmedBlack: true,
                },
                {
                    value: 2,
                    confirmedBlack: false,
                },
            ],
        },
        {
            cells: [
                {
                    value: 3,
                    confirmedBlack: true,
                },
                {
                    value: 4,
                    confirmedBlack: true,
                },
                {
                    value: 5,
                    confirmedBlack: true,
                },
                {
                    value: 6,
                    confirmedBlack: false,
                },
            ],
        },
        {
            cells: [
                {
                    value: 7,
                    confirmedBlack: false,
                },
                {
                    value: 8,
                    confirmedBlack: false,
                },
                {
                    value: 9,
                    confirmedBlack: false,
                },
                {
                    value: 10,
                    confirmedBlack: false,
                },
            ],
        },
        {
            cells: [
                {
                    value: 3,
                    confirmedBlack: false,
                },
                {
                    value: 11,
                    confirmedBlack: false,
                },
                {
                    value: 5,
                    confirmedBlack: false,
                },
                {
                    value: 12,
                    confirmedBlack: false,
                },
            ],
        },
    ]

    const validBoard = new HitoriBoard({ rows: validRows, size: 3 })
    const invalidBoard = new HitoriBoard({ rows: invalidRows, size: 3 })
    const invalidFourByFourBoard = new HitoriBoard({ rows: invalidFourByFour, size: 4 })

    expect(noAdjacentBlackOnBoard(validBoard)).toBe(true)
    expect(noAdjacentBlackOnBoard(invalidBoard)).toBe(false)
    expect(noAdjacentBlackOnBoard(invalidFourByFourBoard)).toBe(false)
})
