

export const API_CALL_ENDPOINT = {
    serverurl: `http://${window.location.hostname}:5000`,
    adminserver : `http://${window.location.hostname}:3003`,
    base_api_verson : '/api/v1',
    methed_post: 'post',
    methed_get: 'get',
    login: '/account',
    Protected: '/account/verify',
    Verification_otp: '/login/verification_otp',
    usersget : '/userget'


}

export const WSS_CALL_ENDPOINT = {
    LocalWebsoket : 'ws://localhost:5001',
    UserWallet : 'ws://localhost:5004',

}