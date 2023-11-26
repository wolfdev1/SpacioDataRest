export const messages = {
    general: {
        notAllowed: "Not Allowed. Please check the request method and try again.",
    },
    jwt: {
        invalid: "Invalid credentials provided. Please try again.",
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
        internalServerError: 'Internal Server Error. Please try again later.',
        notFound: 'Could not find user. Please check the id.'
    },
    channel: {
        badRequest: "Bad Request. This endpoint works with PUT & GET requests and use /rank/leaderboard, /rank/user/resetxp or ../setxp endpoints.", 
        badRequest2: 'Channel requires a name & id, please try again.' ,
        badRequest3: 'Channel requires an id, please try again.' ,
        internalServerError: 'Internal Server Error. Please try again later.',
        channelExists: 'Channel already exists',
        failAddBotChannel: 'Failed to add channel to bot channels.',
        failGetBotChannels: 'Failed to get bot channels',
        failGetXpChannels: 'Failed to get XP channels',
    },
    warnings: {
        notFound: 'Could not find user. Please check the user id and add to request params.',
        notFound2: 'Could not find warn. Please check the warn id and add to request params.',
        noWarns: 'The user has no warnings.',
        badRequest: "Bad Request. This endpoint works with GET and DELETE requests and use /mod/warnings/user & /mod/warnings/warn endpoint."
    },
}