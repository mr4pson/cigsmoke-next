export type TCategory = {
    id?: string,
    name?: string,
    createdAt?: string,
    updatedAt?: string,
    url?: string,
    parent?: TCategory | null,
    children?: TCategory[],
}

export type TCategoryState = {
    categories: TCategory[],
    category: TCategory | null,
    loading: boolean,
    saveLoading: boolean,
}
