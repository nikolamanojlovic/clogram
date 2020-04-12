import { CHANGE_PAGE } from "../actions/pageActions";
import { FEED_PAGE } from "../helpers/constants";

const pageReducer = (state = { currentPage: FEED_PAGE }, action) => {
    switch (action.type) {
        case CHANGE_PAGE:
            return { ...state, currentPage: action.payload };
        default:
            return state
    }
}

export default pageReducer;