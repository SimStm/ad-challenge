export class ApiResponse<T> {
    status: number
    message: string
    data?: T
    error?: string

    constructor(status: number = 200, message: string = 'Request success', data?: T, error?: string) {
        this.status = status
        this.message = message
        this.data = data
        this.error = error
    }
}