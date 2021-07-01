import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonButton,
  IonText,
  IonRouterOutlet
} from '@ionic/react';

import { useLocation, useHistory } from 'react-router-dom';
import { settings, personCircle, home } from 'ionicons/icons';
import './Menu.css';
import { DataContext } from '../context/DataContext';
import { useContext } from 'react';




const Menu: React.FC = () => {
  const { user, setUser }: any = useContext(DataContext);
  const location = useLocation();
  const histoty = useHistory();


  const handleClick = (route: string) => {

    if (route === "") {
      localStorage.removeItem("user");
      histoty.push(`/`);
      setUser({
        user: '',
        id: '',
        isLogin: false
      })
      const i =document.getElementById("main");
      i?.classList.remove("menu-content-open")
      
    } else {

      histoty.push(`${route}`);

    }
  }

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>

        <span className="tu_meun">
          {/* <div>options</div> */}
          <div>{user.user}</div>
        </span>
        <div className="logo_login_menu"></div>
        <IonMenuToggle autoHide={false}>

          <IonButton className={location.pathname === "/" ? 'btn_select' : 'notselected'} expand="block" onClick={() => handleClick("/")}>
            <IonIcon color="white" icon={home} className="icon_logout" />
            <IonLabel className="label_logout">Inicio</IonLabel>
          </IonButton>
        </IonMenuToggle>

        <IonMenuToggle autoHide={false}>
          <IonButton className={location.pathname === "/settings" ? 'btn_select' : 'notselected'} expand="block" onClick={() => handleClick("/settings")}>
            <IonIcon color="white" icon={settings} className="icon_logout" />
            <IonLabel className="label_logout">Configuración</IonLabel>
          </IonButton>
        </IonMenuToggle>

        <IonMenuToggle autoHide={false}>
          <IonButton className="btn_logout" expand="block" onClick={() => handleClick("")}>
            <IonIcon color="white" icon={personCircle} className="icon_logout" />
            <IonLabel className="label_logout">Salir</IonLabel>
          </IonButton>
        </IonMenuToggle>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
