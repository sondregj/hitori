export interface IHitoriCell {
    value: number
    checked?: boolean
    marked?: boolean
}

export interface IHitoriRow {
    cells: IHitoriCell[]
}

export interface IHitoriColumn {
    cells: IHitoriCell[]
}

export interface IHitoriBoard {
    size: number

    rows: IHitoriRow[]
}

export default IHitoriBoard
