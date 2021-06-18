import { IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { save } from 'ionicons/icons'
import React from 'react'
import Menu from '../components/Menu'
import './Settings.css'

export const Settigs = () => {
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

            <button className="btn_settings">
              Save Changes
              <IonIcon slot="start" icon={save} className="icon_menu_Set" />
            </button>
          </div>
        </IonContent>
      </IonPage>
    </>
  )
}
