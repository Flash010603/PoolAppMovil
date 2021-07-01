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
    const [error, setError] = useState({
        isShow: false,
        msg: ""
    });

    const { username, pass } = form;

    const handleLogin = async () => {
        if (username.trim().length === 0 || pass.trim().length === 0) {
            setError({
                isShow: true,
                msg: "Todos los datos son obligatorios"
            });
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

        try {
            const response: IUser = await res.json();

            const data = {
                user: response.name,
                id: response.id,
                isLogin: true
            }

            localStorage.setItem("user", JSON.stringify(data));
            setUser(data)


        } catch (error) {
            setError({
                isShow: true,
                msg: "Error en el usuario y/o contraseña"
            });
        }

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
                        <h1 className="title_login">Inicio de sesión</h1>
                        <div className="container_input">
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

                        </div>
                        <button className="btn_login" onClick={handleLogin}>Iniciar sesión
                            <IonIcon slot="start" icon={logIn} className="icon_menu" />
                        </button>

                        <p className="link">
                            ¿Aún no tienes cuenta?
                            <Link to="/signup" style={{ marginLeft: 10 }}>Crea tu cuenta aquí</Link>
                        </p>
                    </div>


                    <IonModal
                        isOpen={error.isShow}
                        cssClass='my-custom-class'
                        onDidDismiss={() => setError({
                            isShow: false,
                            msg: ""
                        })}
                    >
                        <div className="container_modal_">
                            <span className="title_modal_l">Error al iniciar sesión</span>
                            <span className="msg_modal">{error.msg}</span>
                            <button onClick={() => setError({
                                isShow: false,
                                msg: ""
                            })} className="btn_close_modal" >Cerrar alerta</button>
                        </div>
                    </IonModal>
                </IonContent>

            </IonContent>
        </IonPage>
    )
}
