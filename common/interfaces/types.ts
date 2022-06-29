export type Category = {
    id?: string,
    name?: string,
    createdAt?: string,
    updatedAt?: string,
    url?: string,
    parent?: Category | null,
    children?: Category[]
}

export type categoryState = {
    categoriesList: Category[],
    loading: boolean,
    error: string | null
}