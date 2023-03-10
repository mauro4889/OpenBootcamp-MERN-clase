

export type BasicResponse = {
    message: string
}

export type ErrorResponse = {
    error: string,
    message: string
}

export type GreetingResponse = {
    message: string,
    data: Date
}

export type AuthResponse  = {
    message: string,
    token: string
}