// A module with no JSX at all. The codemod must leave it byte-for-byte alone,
// including this deliberately un-Prettier formatting:
export function   sum(values: number[]) { return values.reduce((a,b)=>a+b, 0) }

export const className = "not a JSX attribute"
