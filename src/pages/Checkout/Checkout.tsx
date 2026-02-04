import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonItem,
  IonInput,
  IonButton,
  IonList,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { cardOutline, cashOutline } from "ionicons/icons";
import AppLayout from "../../components/AppLayout/AppLayout";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Checkout: React.FC = () => {
  const history = useHistory();

  // Simulación de total
  const total = 185000;

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePay = () => {
    // acá luego puedes validar si quieres
    history.push("/checkout-success");
  };

  return (
    <AppLayout title="Checkout">
      <IonGrid className="ion-padding">

        {/* Resumen */}
        <IonRow>
          <IonCol size="12">
            <IonText>
              <h2>Resumen de la compra</h2>
            </IonText>

            <IonList>
              <IonItem>
                <IonLabel>Raqueta Butterfly</IonLabel>
                <IonText>$120.000</IonText>
              </IonItem>

              <IonItem>
                <IonLabel>Gomas DHS</IonLabel>
                <IonText>$65.000</IonText>
              </IonItem>

              <IonItem lines="full">
                <IonLabel>
                  <strong>Total</strong>
                </IonLabel>
                <IonText>
                  <strong>${total.toLocaleString("es-CO")}</strong>
                </IonText>
              </IonItem>
            </IonList>
          </IonCol>
        </IonRow>

        {/* Formulario */}
        <IonRow className="ion-margin-top">
          <IonCol size="12">
            <IonText>
              <h2>Datos de pago</h2>
            </IonText>

            <IonItem>
              <IonIcon icon={cardOutline} slot="start" />
              <IonInput
                label="Número de tarjeta"
                labelPlacement="floating"
                value={cardNumber}
                onIonChange={(e) => setCardNumber(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonInput
                label="Nombre en la tarjeta"
                labelPlacement="floating"
                value={cardName}
                onIonChange={(e) => setCardName(e.detail.value!)}
              />
            </IonItem>

            <IonRow>
              <IonCol size="6">
                <IonItem>
                  <IonInput
                    label="MM/AA"
                    labelPlacement="floating"
                    value={expiry}
                    onIonChange={(e) => setExpiry(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem>
                  <IonInput
                    label="CVV"
                    labelPlacement="floating"
                    type="password"
                    value={cvv}
                    onIonChange={(e) => setCvv(e.detail.value!)}
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonButton
              expand="block"
              className="ion-margin-top"
              onClick={handlePay}
            >
              <IonIcon icon={cashOutline} slot="start" />
              Pagar
            </IonButton>
          </IonCol>
        </IonRow>

      </IonGrid>
    </AppLayout>
  );
};

export default Checkout;
