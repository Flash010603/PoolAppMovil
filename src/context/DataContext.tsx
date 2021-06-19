import { createContext, useState } from "react";

export const DataContext = createContext({});

interface IUser{
    user: string;
    id:string;
    isLogin:boolean;
}

export const DataProvider:React.FC = ({ children }) => {
    
    const userStorage:any = localStorage.getItem("user");
    const us = JSON.parse(userStorage);  
    console.log(us)

    const [user, setUser] = useState<IUser>({
        user: (us) ? us.user : '',
        id:(us) ? us.id : '',
        isLogin:(us) ? us.isLogin : ''
    })

    return (
            <DataContext.Provider value={{user, setUser}} >
                {children}
            </DataContext.Provider>
        )

}