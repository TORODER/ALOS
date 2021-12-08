
export enum HttpPackageCode {
    // 所有正确的请求都返回 2000
    OK = 2000,
    // 常规错误
    GeneralError = 4000,
    // 注册手机号已经被使用
    SignUpErrorPhoneNumberIsExis = 4001,
    // 手机号不合规
    ErrorPhoneNumberUnlawful = 4002,
    // 登陆时密码错误
    LoginPasswdError = 4003,
    // 过于类似 404 故保留状态码 不使用
    _NOCODE = 4004,
    // 账号不存在
    UserNotExis = 4005,
    // 已经登录账号
    AlreadyLoginUser = 4006,
    // 邮箱验证码错误 Email TestCode Error
    EmailTestCodeError = 4007,
    // 邮箱验证码不存在
    EmailTestCodeIsNotExis = 4008,
    // 邮箱验证码过期
    EmailTestCodeTimeOut = 4009,
    // 邮箱已经被注册
    SignUpErrorEmailIsExis = 4010,
    // 账号没有登入
    NotSignIn = 4011,
    // 参数类型验证失败
    ParameterTypeTestError = 4012,
    // 参数检测错误
    ParameterTestError = 4013,
    // message target 不存在
    MessageTargetNoExis = 4014,
    // UUID (GROUP OR USER) 不存在
    UUIDIsNotExis = 4015,
    // 目标用户没有登录
    TargetUserNoTSignIn = 4016,
}


export const apiCodeDescribe = (code: HttpPackageCode): Multilingual<string> => {
    switch (code) {
        case HttpPackageCode.LoginPasswdError:
            return {
                "ZH_CN": "登陆时密码错误",
                "EN": "Password error"
            };
        case HttpPackageCode.UserNotExis:
            return {
                "ZH_CN": "账号不存在",
                "EN": "Account does not exist"
            }
        case HttpPackageCode.AlreadyLoginUser:
            return {
                "ZH_CN": "已经登录账号",
                "EN": "Logged in account"
            }
        case HttpPackageCode.NotSignIn:
            return {
                "ZH_CN": "账号没有登入",
                "EN": "Account not logged in"
            }
        case HttpPackageCode.UUIDIsNotExis:
            return {
                "ZH_CN": "UUID（组或用户）不存在",
                "EN": "UUID (GROUP OR USER) non-existent"
            }
        default:
            return {
                "ZH_CN": "未定义",
                "EN": "Not Define",
            };
    }

}


export const apiConfig = {
    host: "/api"
}