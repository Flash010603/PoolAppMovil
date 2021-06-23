import { IonContent, IonHeader, IonIcon, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { logIn } from 'ionicons/icons';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { DataContext } from '../context/DataContext';
import { url } from '../helper/url';
import { useForm } from '../hooks/useForm';
import { IUser } from '../interfaces/Interface';
import './Login.css';

interface IFormData {
    username: string,
    pass: string
}

export const Login = () => {

    const { user, setUser }: any = useContext(DataContext);

    const { onChange, form } = useForm<IFormData>({
        username: '',
        pass: ''
    });
    const [error, setError] = useState(false);

    const { username, pass } = form;

    const handleLogin = async () => {
        if (username.trim().length === 0 || pass.trim().length === 0) {
            setError(true);
            return;
        }

        const urlLogin = `${url}/user/${username}&${pass}`;
        
        const res = await fetch(urlLogin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });

        const response: IUser  = await res.json();
        
        const data = {
            user: response.name,
            id: response.id,
            isLogin: true
        }

        localStorage.setItem("user", JSON.stringify(data));
        setUser(data)

    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Login</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen scrollY={false} className="content_io">
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Login</IonTitle>
                        </IonToolbar>
                    </IonHeader>

                    <div className="background_login"></div>



                    <div className="logo_login"></div>

                    <div className="container_login">
                        <h1 className="title_login">Login</h1>
                        <div className="container_input">
                            <input
                                type="text"
                                className="user"
                                placeholder="username"
                                name="username"
                                value={username}
                                onChange={onChange}
                            />

                            <input
                                type="password"
                                className="pass"
                                placeholder="password"
                                name="pass"
                                value={pass}
                                onChange={onChange}
                            />

                        </div>
                        <button className="btn_login" onClick={handleLogin}>Iniciar sesión
                            <IonIcon slot="start" icon={logIn} className="icon_menu" />
                        </button>

                        <p className="link">
                            ¿Aun no tienes cuenta?
                            <Link to="/signup" style={{ marginLeft: 10 }}>Crea tu cuenta aquí</Link>
                        </p>
                    </div>


                    <IonModal
                        isOpen={error}
                        cssClass='my-custom-class'
                        onDidDismiss={() => setError(false)}
                    >
                        <div className="container_modal">
                            <span className="title_modal">Error al iniciar sesion</span>
                            <span className="msg_modal">Todos los datos son obligatorios</span>
                            <button onClick={() => setError(false)} className="btn_close_modal" >Close Modal</button>
                        </div>
                    </IonModal>
                </IonContent>

            </IonContent>
        </IonPage>
    )
}
