import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
} from "@ionic/react";
import { cartOutline, logInOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./AppLayout.css";

interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* Left – Login */}
          <IonButtons slot="start">
            <IonButton routerLink="/login">
              <IonIcon slot="icon-only" icon={logInOutline} />
            </IonButton>
          </IonButtons>

          {/* Center – Title */}
          <IonTitle className="app-title" onClick={() => history.push("/")}>
            SpinLab
          </IonTitle>

          {/* Right – Cart */}
          <IonButtons slot="end">
            <IonButton
              onClick={() => document.querySelector("ion-menu")?.open()}
            >
              <IonIcon slot="icon-only" icon={cartOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  );
};

export default AppLayout;
