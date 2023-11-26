export const messages = {
    jwt: {
        invalid: "Invalid token",
        unauthorized: "Unauthorized. Spacio REST Service requires authorization header",
        invalidPayload: "Unauthorized. Token sign appears to be valid but payload is invalid"
    },
    user: {
        badRequest: "Bad Request. User endpoint requires a id to retrive user data.",
        notFound: 'Could not find user. Please check the id.'
    },
    rank: {
        badRequest: "Bad Request. Please try again with other request, this endpoint works with PUT & GET requests and use /rank/user/resetxp, /rank/leaderboard & ../setxp endpoints.",
        badRequest2: "Bad Request. Please check the id and xp.",
        notFound: 'Could not find user. Please check the id.'
    },
    channel: {
        badRequest: "Bad Request. This endpoint works with PUT & GET requests and use /rank/leaderboard, /rank/user/resetxp or ../setxp endpoints." 
    }
}