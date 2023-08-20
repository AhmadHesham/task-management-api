export const buildResponse = (payload: any, message = 'Action Successful') => {
    return {
        data: payload,
        message,
    };
};
