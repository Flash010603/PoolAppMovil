export interface IUser{
    id:  string,
    email: string,
    name: string,
    username:string
}


export interface IPool {
    id:           string;
    name_Pool:    string;
    location:     string;
    temp_min:     number;
    temp_max:     number;
    temp_current: number;
    ph_min:       number;
    ph_max:       number;
    ph_current:   number;
    grados:       'c' | 'f' | 'k';
    idUser:       string;
}
