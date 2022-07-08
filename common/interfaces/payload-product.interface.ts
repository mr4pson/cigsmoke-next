import { Color } from "swagger/services";

export interface PayloadProduct {
    name: string,
    price: number,
    available: boolean,
    colors: string[] | [],
    category: string,
    brand: string,
    url: string,
    desc?: string,
    images?: string,
    id?: string | string[] | undefined,
}