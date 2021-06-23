import { IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonMenuButton, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { save } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import Menu from '../components/Menu'
import { DataContext } from '../context/DataContext'
import { url } from '../helper/url'
import { useForm } from '../hooks/useForm'
import { IPool } from '../interfaces/Interface'
import './Settings.css'

interface IFormData {
  tmax: number,
  tmin: number,
  phmax: number,
  phmin: number,
  typeTemp: 'c' | 'f' | 'k',
}

export const Settigs = () => {

  const { user, setUser }: any = useContext(DataContext);
  const [data, setData] = useState<IPool[]>();
  const [showModal, setShowModal] = useState(false);
  const [isDataExists, setIsDataExists] = useState(false);
  const { onChange, form: { phmin, tmax, tmin, phmax, typeTemp }, setForm } = useForm<IFormData>({
    tmax: 0,
    tmin: 0,
    phmax: 0,
    phmin: 0,
    typeTemp: "c",
  });


  const handleInitData = async () => {
    const urlPool = `${url}/pool/user/${user.id}`;
    const res = await fetch(urlPool);
    const data_pool: IPool[] = await res.json();
    if (data_pool.length > 0) {
      setData(data_pool)
      setForm({
        tmax: data_pool[0].temp_max,
        tmin: data_pool[0].temp_min,
        phmax: data_pool[0].ph_max,
        phmin: data_pool[0].ph_min,
        typeTemp: data_pool[0].grados,
      })
      setIsDataExists(true)
    } else {
      setIsDataExists(false)
    }

  }


  useEffect(() => {

    handleInitData()

  }, [])

  const handleSaveChanges = async () => {
    const urlPool = `${url}/pool`;

    const data_pool = {
      id: data?.[0]?.id,
      name_Pool: data?.[0].name_Pool,
      location: data?.[0].location,
      temp_min: tmin,
      temp_max: tmax,
      temp_current: data?.[0].temp_current,
      ph_min: phmin,
      ph_max: phmax,
      ph_current: data?.[0].ph_current,
      grados: typeTemp,
      idUser: data?.[0].idUser,
    }


    const res = await fetch(urlPool, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data_pool)
    });
    if (res.ok) setShowModal(true);
  }

  return (
    <>
      <Menu />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={true} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className="content_page" scrollY={true} >
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Pool</IonTitle>
            </IonToolbar>
          </IonHeader>

          <div className="container_sett">

            {
              (isDataExists)
                ?
                <>
                  <h1 className="title_settings">Settings Pool</h1>

                  <span className="subtitle_settings">Measurement temperature</span>
                  <select
                    value={typeTemp}
                    name="typeTemp"
                    onChange={onChange}
                  >
                    <option value="">--- Selecciona una opcion ---</option>
                    <option value="c">°C</option>
                    <option value="f">°F</option>
                    <option value="k">°K</option>
                  </select>

                  <span className="subtitle_settings">Temperature configuration</span>

                  <span className="label_sett">Minimum:</span>
                  <input
                    type="number"
                    value={tmin}
                    name="tmin"
                    onChange={onChange}
                  />
                  <span className="label_sett">Maximum:</span>
                  <input
                    type="number"
                    value={tmax}
                    name="tmax"
                    onChange={onChange}
                  />


                  <span className="subtitle_settings">pH configuration</span>

                  <span className="label_sett">Minimum:</span>
                  <input
                    type="number"
                    value={phmax}
                    name="phmax"
                    onChange={(e) => onChange(e)}
                  />

                  <span className="label_sett">Maximum:</span>
                  <input
                    type="number"
                    value={phmin}
                    name="phmin"
                    onChange={onChange}
                  />

                  <button className="btn_settings" onClick={handleSaveChanges}>
                    Save Changes
                    <IonIcon slot="start" icon={save} className="icon_menu_Set" />
                  </button>
                </>
                : <p>No hay piscina configurada</p>
            }

          </div>

          <IonModal
            isOpen={showModal}
            cssClass='my-custom-class'
            onDidDismiss={() => setShowModal(false)}
          >
            <div className="container_modal">
              <span className="title_modal">Lorem ipsum dolor sit.</span>
              <span className="msg_modal">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
              <button onClick={() => setShowModal(false)} className="btn_close_modal" >Close Modal</button>
            </div>
          </IonModal>
        </IonContent>
      </IonPage>
    </>
  )
}
