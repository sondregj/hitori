import { HitoriBoard } from '.'

// Data types
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

// Transform functions
export type LineTransformer = (
    line: IHitoriRow | IHitoriColumn,
    ...params: any[]
) => IHitoriRow | IHitoriColumn

export type BoardTransformer = (board: HitoriBoard, ...params: any[]) => HitoriBoard

// Checker functions
export type LineChecker = (line: IHitoriRow | IHitoriColumn) => boolean

export type BoardChecker = (board: HitoriBoard, ...params: any[]) => boolean
