

export const API_CALL_ENDPOINT = {
    serverurl: `https://web-godl.onrender.com`,
    adminserver : `${window.location.origin.replace('3000','3003') }`,
    base_api_verson : 'api/v1',
    methed_post: 'post',
    methed_get: 'get',
    login: '/account',
    Protected: 'account/verify',
    Verification_otp: '/login/verification_otp',
    usersget : '/userget'


}

export const WSS_CALL_ENDPOINT = {
    LocalWebsoket : 'https://web-godl.onrender.com',
    UserWallet : 'wss://web-godl.onrender.com',

}
