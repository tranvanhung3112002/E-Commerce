import { useState } from "react";

export function useAuth(){
    const [isLogin , setIsLogin] = useState<boolean>(false) ; 
    const login = ()=>{
        //Thuc hiện callAPI,kiểm tra thông tin đăng nhập
        setIsLogin(true) ;  
    }

    const logout = ()=>{
        // Xoa token , xóa thông tin đăng nhập 
        setIsLogin(false) ; 
    }

    return {isLogin , login , logout} ; 
}