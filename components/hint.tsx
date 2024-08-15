

export interface HintProps{
    label:string
    children:React.ReactNode
    side?: "top"|"bottom"|"left"|"right"
    align?:"start"| "center"| "end"
    sideOffset?:number
    alignOffset?: number
}

export const Hint = ({
    label,
    children,
    side,
    sideOffset,
    align,
    alignOffset
    }:HintProps) => { 
    return(

    )
}
