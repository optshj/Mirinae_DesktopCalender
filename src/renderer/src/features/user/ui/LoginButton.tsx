import { useLogin } from '../api/useLogin'

export function LoginButton() {
    const { login, logout, tokens } = useLogin()
    return (
        <>
            {tokens.access_token ? (
                <div onClick={logout} className="rounded px-2 py-1">
                    로그아웃
                </div>
            ) : (
                <div onClick={login} className="rounded px-2 py-1">
                    구글 로그인
                </div>
            )}
        </>
    )
}
