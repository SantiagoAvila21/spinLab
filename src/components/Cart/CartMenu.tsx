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
  IonMenuToggle,
} from "@ionic/react";
import {
  cartOutline,
  addOutline,
  removeOutline,
  trashOutline,
} from "ionicons/icons";
import "./CartMenu.css";
import { useCart } from "../../context/CartContext";

const CartMenu: React.FC = () => {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    total,
  } = useCart();

  return (
    <IonMenu menuId="cart-menu" contentId="main" side="end" type="overlay">
      <IonContent className="cart-content">

        {/* Header */}
        <div className="cart-header">
          <IonIcon icon={cartOutline} />
          <IonText>
            <h2>Tu carrito</h2>
          </IonText>
        </div>

        {/* Estado vacío */}
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <IonIcon icon={cartOutline} />
            <IonText color="medium">
              <p>Tu carrito está vacío</p>
            </IonText>
          </div>
        ) : (
          <IonList>
            {cartItems.map((item) => (
              <IonItem key={item.id} lines="none" className="cart-item">

                <IonLabel>
                  <h3>{item.name}</h3>
                  <p>${item.price.toLocaleString("es-CO")}</p>
                </IonLabel>

                {/* Controles */}
                <div className="cart-actions">

                  {/* Cantidad */}
                  <div className="cart-quantity">
                    <IonButton
                      fill="clear"
                      size="small"
                      onClick={() => decreaseQty(item.id)}
                    >
                      <IonIcon icon={removeOutline} />
                    </IonButton>

                    <IonBadge>{item.quantity}</IonBadge>

                    <IonButton
                      fill="clear"
                      size="small"
                      onClick={() => increaseQty(item.id)}
                    >
                      <IonIcon icon={addOutline} />
                    </IonButton>
                  </div>

                  {/* Eliminar producto */}
                  <IonButton
                    fill="clear"
                    color="danger"
                    size="small"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <IonIcon icon={trashOutline} />
                  </IonButton>

                </div>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>

      {/* Footer */}
      <IonFooter className="cart-footer">
        <div className="cart-total">
          <IonText>Total</IonText>
          <IonText>
            <strong>${total.toLocaleString("es-CO")}</strong>
          </IonText>
        </div>

        <IonMenuToggle>
          <IonButton
            expand="block"
            className="checkout-button"
            disabled={cartItems.length === 0}
            routerLink="/checkout"
          >
            Comprar
          </IonButton>
        </IonMenuToggle>
      </IonFooter>
    </IonMenu>
  );
};

export default CartMenu;
