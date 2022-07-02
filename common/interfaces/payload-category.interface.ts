export interface PayloadCategory {
    name: string,
    url: string,
    parent?: string,
    id?: string | string[] | undefined,
    children?: string
}