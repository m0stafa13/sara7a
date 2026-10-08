export const ErrorResponse = ({
    message = "Error bad request",
    status = 400,
    extra = undefined

} = {}) => {
    throw new Error(message, { cause: { status, extra } })
}

// bad request exception 
export const BadRequestException = ({
    message = "Bad request Error",
    extra = undefined
} = {}) => {
    return ErrorResponse({ status: 400, message, extra })
}
// not found Exception 
export const NotFoundException = ({ message = "Not found error", extra = undefined } = {}) => {
    return ErrorResponse({ message, status: 404, extra })
}

// conflict Exception 
export const ConflictException = ({ message = "Conflict error", extra = undefined } = {}) => {
    return ErrorResponse({ message, status: 409, extra })
}

// un authorized exception
export const UnAuthorizeException = ({ message = "Un authorize error", extra = undefined } = {}) => {
    return ErrorResponse({ message, status: 401, extra })
}