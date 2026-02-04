import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonButton,
  IonFooter,
  IonText,
  IonBadge,
} from "@ionic/react";
import { cartOutline, addOutline, removeOutline } from "ionicons/icons";
import "./CartMenu.css";
import { CartItem } from "../types/CartItem";

const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Raqueta Butterfly Timo Boll ALC",
    price: 850000,
    quantity: 1,
  },
  {
    id: 2,
    name: "Pelotas Butterfly 40+",
    price: 78000,
    quantity: 2,
  },
];

const CartMenu: React.FC = () => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <IonMenu contentId="main" side="end" type="overlay">
      <IonContent className="cart-content">

        {/* Header del carrito */}
        <div className="cart-header">
          <IonIcon icon={cartOutline} />
          <IonText>
            <h2>Tu carrito</h2>
          </IonText>
        </div>

        {/* Lista de productos */}
        <IonList>
          {cartItems.map((item) => (
            <IonItem key={item.id} lines="none" className="cart-item">
              <IonLabel>
                <h3>{item.name}</h3>
                <p>${item.price.toLocaleString()}</p>
              </IonLabel>

              {/* Contador */}
              <div className="cart-quantity">
                <IonButton fill="clear" size="small" slot="end">
                  <IonIcon icon={removeOutline} />
                </IonButton>

                <IonBadge>{item.quantity}</IonBadge>

                <IonButton fill="clear" size="small">
                  <IonIcon icon={addOutline} />
                </IonButton>
              </div>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      {/* Footer con total y botón */}
      <IonFooter className="cart-footer">
        <div className="cart-total">
          <IonText>Total</IonText>
          <IonText>
            <strong>${total.toLocaleString()}</strong>
          </IonText>
        </div>

        <IonButton expand="block" className="checkout-button">
          Comprar
        </IonButton>
      </IonFooter>
    </IonMenu>
  );
};

export default CartMenu;
