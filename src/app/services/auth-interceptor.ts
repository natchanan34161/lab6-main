import { HttpInterceptorFn } from "@angular/common/http"

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // ดึง TOKEN
    const token = localStorage.getItem('auth_token')

    // CHECK TOKEN
    if (token) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + token
            }
        })
        return next(authReq)
    }

    // ไม่มี TOKEN
    return next(req)
}