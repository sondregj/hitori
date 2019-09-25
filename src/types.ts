export interface IHitoriCell {
    value: number
    seen?: boolean

    confirmedBlack?: boolean
    confirmedWhite?: boolean
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
