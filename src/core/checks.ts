import { IHitoriColumn, IHitoriRow } from './types'

class BoardChecks {
    public static onlyDistinct(line: IHitoriRow | IHitoriColumn): boolean {
        const values = line.cells.map(cell => cell.value)

        return values.length === [...new Set(values)].length
    }
}

export default BoardChecks
