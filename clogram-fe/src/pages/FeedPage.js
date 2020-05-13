import React from 'react';
import { useSelector } from "react-redux";
import { PROFILE_PAGE, FRIEND_PROFILE_PAGE } from '../helpers/constants';
import ProfilePageContent from './ProfilePageContent';
import FeeedPageContent from './FeedPageContent';
import FriendPageContent from './FriendPageContent';

const _renderPage = (page) => {
    switch (page) {
        case PROFILE_PAGE:
            return <ProfilePageContent />;
        case FRIEND_PROFILE_PAGE:
            return <FriendPageContent />
        default:
            return <FeeedPageContent />;
    }
}

const FeedPage = () => {
    const currentPage = useSelector(state => state.pageReducer.currentPage);

    return (
        _renderPage(currentPage)
    );
}

export default FeedPage;