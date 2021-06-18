import { IonAlert, IonContent, IonHeader, IonIcon, IonLoading, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { logIn } from 'ionicons/icons';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useForm } from '../hooks/useForm';
import './Login.css';

interface IFormData {
    user: string,
    pass: string
}

export const Login = () => {

    const { onChange, form } = useForm<IFormData>({
        user: '',
        pass: ''
    });
    const history = useHistory();
    const [error, setError] = useState(false);

    const { user, pass } = form;

    const handleLogin = () => {
        if (user.trim().length === 0 || pass.trim().length === 0) {
            setError(true);
            return;
        }

        //TODO: Hacer la petición Post

        history.replace("/page");
        // localStorage.setItem("user", JSON.stringify(form));
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

                    <div className="background"></div>



                    <div className="logo_login"></div>

                    <div className="container_login">
                        <h1 className="title_login">Login</h1>
                        <div className="container_input">
                            <input
                                type="text"
                                className="user"
                                placeholder="username"
                                name="user"
                                value={user}
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
