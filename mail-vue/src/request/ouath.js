// mail-vue/src/request/ouath.js

// 假设您使用 '@/axios/index.js' 导入了配置好的 axios 实例
import http from '@/axios/index.js';

/**
 * LinuxDo 登录
 * @param {string} code - LinuxDo 授权码
 */
export function oauthLinuxDoLogin(code) {
    return http.post('/oauth/linuxDo/login', { code })
}

/**
 * 绑定用户（用于 OAuth 账号未提供邮箱时）
 * @param {object} form - 包含 email, oauthUserId, code 等字段
 */
export function oauthBindUser(form) {
    return http.put('/oauth/bindUser', form)
}

/**
 * GitHub OAuth 登录 - 步骤 1: 启动授权流程
 * 调用后端 API 获取 GitHub 授权重定向 URL。
 * GET /oauth/github
 */
export function oauthGithubStart() {
    return http.get('/oauth/github');
}

/**
 * GitHub OAuth 登录 - 步骤 2: 回调处理
 * 将 code 和 state 发送给后端，由后端完成 Access Token 交换、用户注册/登录。
 * GET /oauth/github/callback?code=...&state=...
 * @param {string} code - GitHub 返回的授权码
 * @param {string} state - GitHub 返回的状态码
 */
export function oauthGithubCallback(code, state) {
    return http.get('/oauth/github/callback', {
        params: {
            code: code,
            state: state
        }
    });
}
