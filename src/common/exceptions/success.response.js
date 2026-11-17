export const successResponse = ({ res, data, status = 200, message = "Ok" }) => {
    res.status(status).json({ message, data })
}