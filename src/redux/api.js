export const fetchUserData = async (userId) => {
    // Simulating an asynchronous API request with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulating a successful response
    return { id: userId, name: 'John Doe' };
};