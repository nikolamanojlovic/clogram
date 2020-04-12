export const CHANGE_PAGE = 'CHANGE_PAGE'

export const changePageAction = (page) => {
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}