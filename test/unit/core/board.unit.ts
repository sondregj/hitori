import HitoriBoard from '../../../src/core/board'
import { InvalidArrayError } from '../../../src/core/errors'

test('From valid 2D array', () => {
    const board = HitoriBoard.from2DArray([[1, 2, 3], [1, 2, 3], [1, 2, 3]])

    expect(board).toBeInstanceOf(HitoriBoard)

    expect(board).toHaveProperty('size')
    expect(board).toHaveProperty('rows')
    expect(board).toHaveProperty('columns')
})

test('Invalid 2D array throws', () => {
    expect(() => HitoriBoard.from2DArray([[1, 2], [1], [1, 2, 3]])).toThrowError(
        InvalidArrayError,
    )
})

test.todo('Get coordinates')
