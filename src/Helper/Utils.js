import * as Constants from './Constants'

export const isLoggedIn = () => {
    const token = localStorage.getItem(Constants.TOKEN);
    if(token == null || token == ''){
        return false;
    }
    return true;
}