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
  IonPopover,
  IonText,
  IonList,
  IonItem,
} from "@ionic/react";
import {
  cartOutline,
  logInOutline,
  personCircleOutline,
  logOutOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import "./AppLayout.css";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const history = useHistory();
  const { numOfItems } = useCart();
  const { user, logout } = useAuth();

  const popover = useRef<HTMLIonPopoverElement>(null);
  const [showPopover, setShowPopover] = useState(false);

  const openUserPopover = (e: unknown) => {
    popover.current!.event = e;
    setShowPopover(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>

          {/* Left – Login / User */}
          <IonButtons slot="start">
            {!user ? (
              <IonButton routerLink="/login">
                <IonIcon slot="icon-only" icon={logInOutline} />
              </IonButton>
            ) : (
              <>
                <IonButton onClick={openUserPopover}>
                  <IonIcon
                    slot="icon-only"
                    icon={personCircleOutline}
                  />
                </IonButton>

                {/* Popover usuario */}
                <IonPopover
                  ref={popover}
                  isOpen={showPopover}
                  onDidDismiss={() => setShowPopover(false)}
                >
                  <IonContent className="ion-padding">
                    <IonText>
                      <h3>{user.name}</h3>
                      <p>{user.email}</p>
                    </IonText>

                    <IonList>
                      <IonItem
                        button
                        lines="none"
                        onClick={() => {
                          logout();
                          setShowPopover(false);
                          history.push("/");
                        }}
                      >
                        <IonIcon
                          icon={logOutOutline}
                          slot="start"
                        />
                        Cerrar sesión
                      </IonItem>
                    </IonList>
                  </IonContent>
                </IonPopover>
              </>
            )}
          </IonButtons>

          {/* Center – Title */}
          <IonTitle
            className="app-title"
            onClick={() => history.push("/")}
          >
            SpinLab
          </IonTitle>

          {/* Right – Cart */}
          <IonButtons slot="end">
            <div className="icon-badge-container">
              <IonButton
                onClick={() =>
                  document
                    .querySelector("ion-menu")
                    ?.open()
                }
              >
                <IonIcon slot="icon-only" icon={cartOutline} />
                {numOfItems > 0 && (
                  <IonBadge
                    color="danger"
                    className="cart-badge"
                  >
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
