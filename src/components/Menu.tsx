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
  IonText
} from '@ionic/react';

import { useLocation, useHistory } from 'react-router-dom';
import { settings, personCircle,home } from 'ionicons/icons';
import './Menu.css';




const Menu: React.FC = () => {
  const location = useLocation();
  const histoty = useHistory();

  const handleClick = (route:string)=>{
    histoty.push(`${route}`);
  }

  return (
    <IonMenu contentId="main" type="overlay" side="end">
      <IonContent>
        
          <span className="tu_meun">Options</span>
          <div className="logo_login"></div>
          <IonMenuToggle autoHide={false}>

            {/* <IonItem className={location.pathname === "/page" ? 'selected' : 'notselected'} routerLink={'/page'} routerDirection="none" lines="none" detail={false}>
              <IonIcon slot="start" ios={settings} md={settings} className="icon_menu" />
              <IonLabel>Home Pool</IonLabel>
            </IonItem>

            <IonItem className={location.pathname === "/settings" ? '' : 'notselected'} routerLink={'/settings'} routerDirection="none" lines="none" detail={false}>
              <IonIcon slot="start" ios={settings} md={settings} className="icon_menu" />
              <IonLabel>Settings Pool</IonLabel>
            </IonItem> */}

            <IonButton className={location.pathname === "/page" ? 'btn_select' : 'notselected'} expand="block" onClick={ ()=> handleClick("/page") }>
              <IonIcon color="white" icon={home} className="icon_logout" />
              <IonLabel className="label_logout">Home Pool</IonLabel>
            </IonButton>
            
            <IonButton className={location.pathname === "/settings" ? 'btn_select' : 'notselected'}  expand="block" onClick={()=> handleClick("/settings") }>
              <IonIcon color="white" icon={settings} className="icon_logout" />
              <IonLabel className="label_logout">Settings Pool</IonLabel>
            </IonButton>

            <IonButton className="btn_logout" expand="block" onClick={()=> handleClick("/login") }>
              <IonIcon color="white" icon={personCircle} className="icon_logout" />
              <IonLabel className="label_logout">Log out</IonLabel>
            </IonButton>

          </IonMenuToggle>

      </IonContent>
    </IonMenu>
  );
};

export default Menu;
