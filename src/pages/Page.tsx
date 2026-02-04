import {
  IonButtons,
  IonContent,
  IonHeader,
  IonButton,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cartOutline, logInOutline } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./Page.css";

const Page: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>

          {/* LEFT – Login */}
          <IonButtons slot="start">
            <IonButton routerLink="/login">
              <IonIcon slot="icon-only" icon={logInOutline} />
            </IonButton>
          </IonButtons>

          {/* CENTER – App name */}
          <IonTitle>SpinLab</IonTitle>

          {/* RIGHT – Cart */}
          <IonButtons slot="end">
            <IonButton
              onClick={() => document.querySelector("ion-menu")?.open()}
            >
              <IonIcon slot="icon-only" icon={cartOutline} />
            </IonButton>
          </IonButtons>

        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <ExploreContainer name="SpinLab" />
      </IonContent>
    </IonPage>
  );
};

export default Page;