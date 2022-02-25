import { useRoutes } from "react-router-dom";
//import Home from "../Components/Home/home";
import Login from "../Components/Login/login";
import Main from "../Components/Main/main";
import Dones from "../Components/Dones/dones";
import Notfound from "../Components/404/Notfound";


const Links = () => {

    let routes = useRoutes([
        { path:"/", element: <Login/>},
        { path:"/Login/", element: <Login/>},
        { path:"/Tareas", element: <Main/>},
        { path:"/Historico", element: <Dones/>},
        { path:"*", element: <Notfound/>}
    ]);

    return routes;
};

export default Links;