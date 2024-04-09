export interface User {
    id: string
    email: string
    password: string
    firstName: string | null
    lastName: string | null
    address: string | null
    createdAt: string
    updatedAt: string
}

export interface CardItem {
    id: string
    flashSales: string
    title: string
    logo: string
    prices: string[]
    star: number
}
