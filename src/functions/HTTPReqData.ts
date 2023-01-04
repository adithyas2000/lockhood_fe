export const BackendAddress = process.env.REACT_APP_BACKEND_DOMAIN;
export const RequestOptions = {
    headers: {
        Authorization: `bearer ${window.sessionStorage.getItem('token')}`
    }
};