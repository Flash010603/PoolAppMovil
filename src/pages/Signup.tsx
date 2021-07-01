import { IonAlert, IonContent, IonHeader, IonIcon, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { logIn } from 'ionicons/icons';
import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { DataContext } from '../context/DataContext';
import { url } from '../helper/url';
import { useForm } from '../hooks/useForm';
import { IUser } from '../interfaces/Interface';
import './Signup.css';
interface IFormData {
    username: string,
    pass: string,
    email: string,
    name:string
}
export const Signup = () => {

    const { user, setUser }: any = useContext(DataContext);

    const { onChange, form } = useForm<IFormData>({
        username: '',
        pass: '',
        email: '',
        name:''
    });
    const history = useHistory();
    const [error, setError] = useState(false);

    const { username, pass, email, name } = form;

    const handleLogin = async() => {
        if (username.trim().length === 0 || pass.trim().length === 0 || email.trim().length === 0 || name.trim().length === 0) {
            setError(true);
            return;
        }
        
        const urlLogin = `${url}/user`;

        const dataPost = {
            name,
            email,
            username,
            password:pass
        }

        const res = await fetch(urlLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPost)
        });

        const response: IUser  = await res.json();
        
        const data = {
            user: response.name,
            id: response.id,
            isLogin: true
        }
        
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data)
        
        history.push("/");
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Login</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen scrollY={true} className="content_io">
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Login</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <div className="background"></div>

                    <div className="logo_login_s"></div>

                    <div className="container_login">
                        <h1 className="title_sign">Crear cuenta</h1>
                        <div className="container_input">
                            <input
                                type="text"
                                className="user"
                                placeholder="Nombre Completo"
                                name="name"
                                value={name}
                                onChange={onChange}
                            />

                            <input
                                type="text"
                                className="user"
                                placeholder="Nombre de usuario"
                                name="username"
                                value={username}
                                onChange={onChange}
                            />

                            <input
                                type="password"
                                className="pass"
                                placeholder="Contraseña"
                                name="pass"
                                value={pass}
                                onChange={onChange}
                            />

                            <input
                                type="email"
                                className="user"
                                placeholder="Correo electronico"
                                name="email"
                                value={email}
                                onChange={onChange}
                            />

                            <input
                                type="text"
                                className="user"
                                placeholder="Red del sensor"
                                
                            />

                        </div>
                        <button className="btn_sign" onClick={handleLogin}>Crear cuenta
                            <IonIcon slot="start" icon={logIn} className="icon_menu" />
                        </button>

                        <p className="link" style={{marginBottom:20}}>
                            ¿Ya tienes cuenta?
                            <Link to="/" style={{ marginLeft: 10 }}>Inicia sesión</Link>
                        </p>
                    </div>

                </IonContent>
                <IonModal
                    isOpen={error}
                    cssClass='my-custom-class'
                    onDidDismiss={() => setError(false)}
                >
                    <div className="container_modal_">
                        <span className="title_modal_l">Error al crear la cuenta</span>
                        <span className="msg_modal">Todos los datos son obligatorios</span>
                        <button onClick={() => setError(false)} className="btn_close_modal" >Close Modal</button>
                    </div>
                </IonModal>
            </IonContent>
        </IonPage>
    )
}
