import HitoriBoard from '../../src/board'

import { solve } from '../../src/solver'
import TestBoards, {
    fourByFour,
    invalid,
    staccBoard,
    unsolvable,
} from '../constants/test-boards'

test('Unsolvable board fails', () => {
    const board = HitoriBoard.from2DArray(unsolvable)

    const [solved] = solve({ board })

    expect(solved).toBe(undefined)
})

test('Valid four by four', () => {
    const board = HitoriBoard.from2DArray(fourByFour)

    const [solved] = solve({ board })

    const solvedString = solved ? solved.toString() : ''

    expect(solvedString).toBe('X1X2345678910X11X12')
})

test('Stacc competition board succeeds', () => {
    const board = HitoriBoard.from2DArray(staccBoard)

    const [solved] = solve({ board })

    const solvedString = solved ? solved.toString() : ''

    expect(solvedString).toBe('5X162X3142X6X2X4634563X22X3X4564X53X')
})

test('Various test boards succeed', () => {
    const testBoards = TestBoards.map(testBoard =>
        HitoriBoard.from2DArray(testBoard.board),
    )
        .map(board => solve({ board }))
        .map(solved => solved[0])
        .map(solvedBoard => {
            expect(solvedBoard).toBeDefined()
        })
})
