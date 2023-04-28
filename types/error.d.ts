interface UserMessage {
    message: string,
    statusCode: number
}

export default interface Error extends Error {
    userMessage: UserMessage
}
