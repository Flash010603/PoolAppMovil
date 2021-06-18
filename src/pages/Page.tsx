import { IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { thermometer, water, trash } from 'ionicons/icons';
import { useParams } from 'react-router';
import Menu from '../components/Menu';
import { useForm } from '../hooks/useForm';
// import ExploreContainer from '../components/ExploreContainer';
// import '../components/ExploreContainer.css';
import './Page.css';

const Page: React.FC = () => {

  // const { onChange, form:{ location, pool} } = useForm({
  //   location:'',
  //   pool:''
  // });

  return (
    <>
      <Menu />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            {/* <IonTitle>Pagina</IonTitle> */}
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className="content_page">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Pool</IonTitle>
            </IonToolbar>
          </IonHeader>
          <div className="circle"></div>
          <div className="container_home">
            <input 
              className="loc" 
              placeholder="Pool 1"
              type="text" 
              
            />
            <input 
              className="nam" 
              placeholder="Location in:"
              type="text" 
              
            />

            <div className="contenedor_btns">
              <button className="btn btn_rename">Save info</button>
            </div>

            <div className="contenedor_cards">

              <div className="card">
                <div className="icono">
                <IonIcon slot="start" ios={thermometer} md={thermometer} className="icon_home"/>
                </div>
                <span className="title_card">Temperature</span>
                <div className="data">
                <span className="numero">25</span>
                <span className="tipo_dato">°C</span>
                </div>
              </div>

              <div className="card">
                <div className="icono">
                <IonIcon slot="start" ios={water} md={water} className="icon_home"/>
                </div>
                <span className="title_card">pH</span>
                <div className="data no_grid">
                <span className="numero">7,5</span>
                </div>
              </div>

            </div>

            <button className="btn_delete">
              <span>Delete this Pool</span>
              <IonIcon slot="start" ios={trash} md={trash} className="icon_trash"/>
            </button>

          </div>

        </IonContent>
      </IonPage>
    </>
  );
};

export default Page;
