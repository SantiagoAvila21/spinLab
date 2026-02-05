import {
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonText,
  IonButton,
} from "@ionic/react";
import { checkmarkCircleOutline, homeOutline } from "ionicons/icons";
import AppLayout from "../../components/AppLayout/AppLayout";

const CheckoutSuccess: React.FC = () => {
  return (
    <AppLayout>
      <IonGrid className="ion-padding ion-text-center">

        <IonRow className="ion-justify-content-center ion-margin-top">
          <IonCol size="12">
            <IonIcon
              icon={checkmarkCircleOutline}
              color="success"
              style={{ fontSize: "80px" }}
            />
          </IonCol>
        </IonRow>

        <IonRow className="ion-margin-top">
          <IonCol size="12">
            <IonText>
              <h2>¡Gracias por tu compra!</h2>
            </IonText>

            <IonText color="medium">
              <p>
                Tu pedido ha sido procesado correctamente.
              </p>
            </IonText>
          </IonCol>
        </IonRow>

        <IonRow className="ion-margin-top">
          <IonCol size="12">
            <IonText>
              <p>
                Recibirás un correo con el resumen de tu pedido
              </p>
            </IonText>
          </IonCol>
        </IonRow>

        <IonRow className="ion-margin-top">
          <IonCol size="12">
            <IonButton expand="block" routerLink="/">
              <IonIcon icon={homeOutline} slot="start" />
              Volver al catálogo
            </IonButton>
          </IonCol>
        </IonRow>

      </IonGrid>
    </AppLayout>
  );
};

export default CheckoutSuccess;
