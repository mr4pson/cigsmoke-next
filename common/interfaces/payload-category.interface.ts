export interface PayloadCategory {
    name: string,
    url: string,
    image: string,
    parent?: string,
    id?: string | string[] | undefined,
    children?: string
}