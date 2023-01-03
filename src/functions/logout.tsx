function logout(){
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('refreshToken');
    window.sessionStorage.removeItem('userDept');
    window.sessionStorage.removeItem('email');

}

export default logout;