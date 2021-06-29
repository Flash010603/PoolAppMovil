import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonMenuButton, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { thermometer, water, trash, reloadCircle } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Menu from '../components/Menu';
import { DataContext } from '../context/DataContext';
import { url } from '../helper/url';
import { useForm } from '../hooks/useForm';
import { IPool } from '../interfaces/Interface';
// import ExploreContainer from '../components/ExploreContainer';
// import '../components/ExploreContainer.css';
import './Page.css';

const Page: React.FC = () => {
  const { user }: any = useContext(DataContext);

  const [showModal, setShowModal] = useState(false);

  const { onChange, form: { location, pool }, setForm } = useForm({
    location: '',
    pool: ''
  });

  const [data, setData] = useState<IPool[]>();
  const [isDataExists, setIsDataExists] = useState(false);
  const [modal, setModal] = useState({
    isShow: false,
    msg: "",
    title: ""
  })


  const handleInitData = async () => {
    const urlPool = `${url}/pool/user/${user.id}`;
    const res = await fetch(urlPool);
    const data_pool: IPool[] = await res.json();

    if (data_pool.length > 0) {
      setData(data_pool)
      setForm({
        location: data_pool[0].location,
        pool: data_pool[0].name_Pool
      })
      setIsDataExists(true)
    } else {
      setIsDataExists(false)
    }
  }

  useEffect(() => {

    handleInitData();

  }, [])

  useEffect(() => {
    if(data?.[0]){
      const ph = data?.[0].ph_current;
      const ph_max = data?.[0].ph_max;
      const ph_min = data?.[0].ph_min;
  
      const temp = data?.[0].temp_current;
      const temp_max = data?.[0].temp_max;
      const temp_min = data?.[0].temp_min;
      
  
  
      if( ph > ph_max || ph < ph_min ){
        setModal({
          isShow: true,
          msg: "Revisa tu piscina",
          title: "¡El PH esta fuera de los rangos configurados!"
        });
      }
      else if( temp > temp_max || temp < temp_min){
        setModal({
          isShow: true,
          msg: "Revisa tu piscina",
          title: "¡La Temperatura esta fuera de los rangos configurados!"
        });
      }
    }
  }, [data])

  const handleSaveInfoPool = async () => {

    const urlPool = `${url}/pool`;

    const data_pool = {
      id: data?.[0].id,
      name_Pool: pool,
      location,
      temp_min: data?.[0].temp_min,
      temp_max: data?.[0].temp_max,
      temp_current: data?.[0].temp_current,
      ph_min: data?.[0].ph_min,
      ph_max: data?.[0].ph_max,
      ph_current: data?.[0].ph_current,
      grados: data?.[0].grados,
      idUser: data?.[0].idUser,
    }

    const res = await fetch(urlPool, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data_pool)
    });

    const data_res = await res.json();
    console.log(data_res)
    const newData: IPool[] = [data_res];
    setData(newData)
    setModal({
      isShow: true,
      msg: "Los datos de la piscina se han actualizado correctamente",
      title: "Operacion correcta"
    });

  }


  const handleDeletePool = async () => {

    const urlDelete = `${url}/pool/${data?.[0].id}`;
    await fetch(urlDelete, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: data?.[0].id })
    });
    setShowModal(false);
  }

  const handleUpdate = async () => {
    let urlPool = `${url}/pool`;

    let res = await fetch(urlPool, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data?.[0])
    });

    const data_pool = await res.json();

    const newData: IPool[] = [data_pool];
    setData(newData);
  }
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
            {
              (isDataExists)
                ?
                <>
                  <input
                    className="loc"
                    placeholder="Pool 1"
                    type="text"
                    value={pool}
                    name="pool"
                    onChange={onChange}
                  />

                  <input
                    className="nam"
                    placeholder="Location in:"
                    type="text"
                    value={location}
                    name="location"
                    onChange={onChange}
                  />

                  <div className="contenedor_btns">
                    <button className="btn btn_rename" onClick={handleSaveInfoPool}>Save info</button>
                  </div>


                  <button className="btn_update_data" onClick={handleUpdate}>
                    <IonIcon slot="start" ios={reloadCircle} md={reloadCircle} />
                  </button>


                  <div className="contenedor_cards">

                    <div className="card">
                      <div className="icono">
                        <IonIcon slot="start" ios={thermometer} md={thermometer} className="icon_home" />
                      </div>
                      <span className="title_card">Temperature</span>
                      <div className="data">
                        <span className="numero">{(data?.[0]) && data?.[0].temp_current}</span>
                        <span className="tipo_dato">{
                          (data?.[0]) ? (data?.[0].grados === "c") ? '°C' : (data?.[0].grados === "f") ? '°F' : '°K' : ""
                        }</span>
                      </div>
                    </div>

                    <div className="card">
                      <div className="icono">
                        <IonIcon slot="start" ios={water} md={water} className="icon_home" />
                      </div>
                      <span className="title_card">pH</span>
                      <div className="data no_grid">
                        <span className="numero">{(data?.[0]) && data?.[0].ph_current}</span>
                      </div>
                    </div>

                  </div>

                  <button className="btn_delete" onClick={() => setShowModal(true)}>
                    <span>Delete this Pool</span>
                    <IonIcon slot="start" ios={trash} md={trash} className="icon_trash" />
                  </button>
                </>
                : <p>No hay piscina relacionada</p>
            }


          </div>

          <IonModal
            isOpen={showModal}
            cssClass='my-custom-class'
            onDidDismiss={() => setShowModal(false)}
          >
            <div className="container_modal">
              <span className="title_modal">Eliminar Piscina</span>
              <span className="msg_modal">Desea eliminar la piscina?.</span>
              <div className="buttons">
                <button onClick={() => setShowModal(false)} className="btn_close_modal_home" >Close Modal</button>
                <button onClick={handleDeletePool} className="btn_delete_modal" >Eliminar</button>
              </div>
            </div>
          </IonModal>

          <IonModal
            isOpen={modal.isShow}
            cssClass='my-custom-class'
            onDidDismiss={() => setShowModal(false)}
        >
            <div className="container_modal">
                <span className="title_modal">{modal.title}</span>
                <span className="msg_modal">{modal.msg}</span>
                <button onClick={() => setModal({
                   isShow: false,
                   msg: "",
                   title: ""
                })} className="btn_close_modal_home" >Close Modal</button>
            </div>
        </IonModal>

        </IonContent>


      </IonPage>
    </>
  );
};

export default Page;
