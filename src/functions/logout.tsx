function logout(){
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('refreshToken');
    window.sessionStorage.removeItem('userDept');
    window.sessionStorage.removeItem('email');
    window.sessionStorage.removeItem('deptId');

}

export default logout;