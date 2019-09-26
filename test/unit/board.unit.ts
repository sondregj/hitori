import HitoriBoard from '../../src/board'

/* Constructors */

test('From valid 2D array', () => {
    const board = HitoriBoard.from2DArray([[1, 2, 3], [1, 2, 3], [1, 2, 3]])

    expect(board).toBeInstanceOf(HitoriBoard)

    expect(board).toHaveProperty('size')
    expect(board).toHaveProperty('rows')
})

test('Invalid 2D array throws', () => {
    expect(() => HitoriBoard.from2DArray([[1, 2], [1], [1, 2, 3]])).toThrow()
})

test('Get coordinates', () => {
    const board = HitoriBoard.from2DArray([[1, 2, 3], [2, 3, 4], [3, 4, 5]])

    const cell = board.getCoordinate(1, 1)

    expect(cell.value).toBe(3)
})

/* Checks */

test.todo('Check all rows and columns')
test.todo('Check board')
test.todo('Board is solved')

/* Transforms */

test.todo('Transform all rows and columns')
test.todo('Transform board')
test.todo('Board to 2D array')

/* Representations */

test.todo('Board as rows')
test.todo('Board as columns')
test.todo('Board to 2D array')
test.todo('Board to string')

/* Operations */

test.todo('Copy board')
test.todo('Copy data on board')
