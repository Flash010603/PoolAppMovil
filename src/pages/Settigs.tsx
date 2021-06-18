import { IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { save } from 'ionicons/icons'
import React, { useState } from 'react'
import Menu from '../components/Menu'
import './Settings.css'

export const Settigs = () => {

  const [showModal, setShowModal] = useState(false)

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

          <div className="container_sett">

            <h1 className="title_settings">Settings Pool</h1>

            <span className="subtitle_settings">Measurement temperature</span>
            <select>
              <option value="">--- Selecciona una opcion ---</option>
              <option value="c">°C</option>
              <option value="f">°F</option>
              <option value="k">°K</option>
            </select>

            <span className="subtitle_settings">Temperature configuration</span>

            <span className="label_sett">Minimum:</span>
            <input type="number" />

            <span className="label_sett">Maximum:</span>
            <input type="number" />


            <span className="subtitle_settings">pH configuration</span>

            <span className="label_sett">Minimum:</span>
            <input type="number" />

            <span className="label_sett">Maximum:</span>
            <input type="number" />

            <button className="btn_settings" onClick={() => setShowModal(true)}>
              Save Changes
              <IonIcon slot="start" icon={save} className="icon_menu_Set" />
            </button>
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
