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
import { useCart } from "../../context/CartContext";

const Checkout: React.FC = () => {
  const history = useHistory();
  const { cartItems, total } = useCart();

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePay = () => {
    history.push("/checkout-success");
  };

  return (
    <AppLayout title="Checkout">
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol size="12">
            {/* Título */}
            <IonText className="checkout-section-title">
              <h2>Resumen de la compra</h2>
            </IonText>

            {/* Encabezados */}
            <IonItem lines="none" className="summary-header">
              <IonLabel color="secondary" className="col-product ">Producto</IonLabel>
              <IonLabel color="secondary" className="col-qty ion-text-center">Cant.</IonLabel>
              <IonLabel color="secondary" className="col-price ion-text-end">Precio</IonLabel>
            </IonItem>

            {/* Lista de productos */}
            <IonList className="summary-list">
              {cartItems.map((item) => (
                <IonItem key={item.id} lines="none" className="summary-item">
                  <IonLabel className="col-product">{item.name}</IonLabel>

                  <IonLabel className="col-qty ion-text-center">
                    {item.quantity}
                  </IonLabel>

                  <IonText className="col-price ion-text-end">
                    ${item.price.toLocaleString("es-CO")}
                  </IonText>
                </IonItem>
              ))}

              {/* Total */}
              <IonItem lines="full" className="summary-total">
                <IonLabel>
                  <strong>Total</strong>
                </IonLabel>
                <IonText slot="end">
                  <strong>${total.toLocaleString("es-CO")}</strong>
                </IonText>
              </IonItem>
            </IonList>
          </IonCol>
        </IonRow>

        {/* Formulario Tarjeta Credito */}
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
