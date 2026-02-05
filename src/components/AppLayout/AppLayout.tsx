import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonBadge,
} from "@ionic/react";
import { cartOutline, logInOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./AppLayout.css";
import { useCart } from "../../context/CartContext";

interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const history = useHistory();
  const { numOfItems } = useCart();

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
            <div className="icon-badge-container">
              <IonButton
                onClick={() => document.querySelector("ion-menu")?.open()}
                className="cart-button"
              >
                <IonIcon slot="icon-only" icon={cartOutline} />
                {numOfItems > 0 && (
                  <IonBadge color="danger" className="cart-badge">
                    {numOfItems}
                  </IonBadge>
                )}
              </IonButton>
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  );
};

export default AppLayout;
