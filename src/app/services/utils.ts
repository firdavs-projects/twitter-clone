export const getDate = (dateString: string): string => {
    const postDate = new Date(dateString);
    const dateNow = Date.now();
    return dateNow - postDate.getTime() < 8.64e7
        ? `${('0' + (postDate.getHours() + 1)).slice(-2)}:${('0' + (postDate.getMinutes() + 1)).slice(-2)}`
        : `${postDate.getDate()}.${('0' + (postDate.getMonth() + 1)).slice(-2)}.${postDate.getFullYear()}`;
}
