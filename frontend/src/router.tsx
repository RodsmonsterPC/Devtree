import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";

export default function Router(){
    return(
        <BrowserRouter>
        <Routes>
        <Route element={<AuthLayout></AuthLayout>}>
            <Route path='/auth/login' element={<LoginView/>}/>
            <Route path='/auth/register' element={<RegisterView/>}/>
        </Route>
        </Routes>
        </BrowserRouter>
    )
}