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
  IonSpinner,
  useIonToast,
} from "@ionic/react";
import { cardOutline, cashOutline } from "ionicons/icons";
import AppLayout from "../../components/AppLayout/AppLayout";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

// ---- Funciones Helper a validaciones de tarjeta de credito ---

const isValidCardNumber = (value: string) => {
  const cleaned = value.replace(/\s+/g, "");
  if (!/^\d{13,19}$/.test(cleaned)) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

const isValidExpiry = (value: string) => {
  if (!/^\d{2}\/\d{2}$/.test(value)) return false;

  const [mm, yy] = value.split("/").map(Number);
  if (mm < 1 || mm > 12) return false;

  const now = new Date();
  const expiryDate = new Date(2000 + yy, mm);

  return expiryDate > now;
};

const isValidCvv = (value: string) => /^\d{3,4}$/.test(value);

const isValidName = (value: string) =>
  /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,}$/.test(value.trim());

// --- Funciones para el formateo de los inputs ---

const formatCardNumber = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
  return digitsOnly.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const formatCvv = (value: string) => value.replace(/\D/g, "").slice(0, 3);

const Checkout: React.FC = () => {
  const history = useHistory();
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth(); // Mantener el usuario que realizo el pedido

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const [presentToast] = useIonToast();

  const showToast = (
    message: string,
    color: "success" | "danger" = "danger",
  ) => {
    presentToast({
      message,
      duration: 2000,
      color,
      position: "top",
    });
  };

  // Se realiza el pago y se crea el pedido en el backend.
  // Para esto se envia un POST a /api/store/orders con el JWT del usuario autenticado y los items del carrito
  const handlePay = async () => {
    if (!isValidCardNumber(cardNumber)) {
      showToast("Número de tarjeta inválido");
      return;
    }

    if (!isValidName(cardName)) {
      showToast("Nombre en la tarjeta inválido");
      return;
    }

    if (!isValidExpiry(expiry)) {
      showToast("Fecha de vencimiento inválida");
      return;
    }

    if (!isValidCvv(cvv)) {
      showToast("CVV inválido");
      return;
    }

    if (!user?.token) {
      showToast("Debes iniciar sesión para pagar");
      return;
    }

    setLoading(true);

    try {
      // Preparamos payload
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      const res = await fetch("http://localhost:5297/api/store/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Error al crear el pedido");
      }

      const order = await res.json();
      console.log("Pedido creado:", order);

      showToast("Pago realizado y pedido creado 🎉", "success");
      clearCart();

      setTimeout(() => {
        history.push("/checkout-success");
      }, 900);
    } catch (err: unknown) {
      console.error(err);
      showToast(err instanceof Error ? err.message : "Error en el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol size="12">
            {/* Título */}
            <IonText className="checkout-section-title">
              <h2>Resumen de la compra</h2>
            </IonText>

            {/* Encabezados */}
            <IonItem lines="none" className="summary-header">
              <IonLabel color="secondary" className="col-product ">
                Producto
              </IonLabel>
              <IonLabel color="secondary" className="col-qty ion-text-center">
                Cant.
              </IonLabel>
              <IonLabel color="secondary" className="col-price ion-text-end">
                Precio
              </IonLabel>
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
                inputmode="numeric"
                maxlength={19}
                value={cardNumber}
                onIonInput={(e) =>
                  setCardNumber(formatCardNumber(e.detail.value ?? ""))
                }
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
                    inputmode="numeric"
                    maxlength={5}
                    value={expiry}
                    onIonInput={(e) =>
                      setExpiry(formatExpiry(e.detail.value ?? ""))
                    }
                  />
                </IonItem>
              </IonCol>

              <IonCol size="6">
                <IonItem>
                  <IonInput
                    label="CVV"
                    labelPlacement="floating"
                    type="password"
                    inputmode="numeric"
                    maxlength={3}
                    value={cvv}
                    onIonInput={(e) => setCvv(formatCvv(e.detail.value ?? ""))}
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonButton
              expand="block"
              className="ion-margin-top"
              onClick={handlePay}
              disabled={loading}
            >
              {loading ? (
                <IonSpinner name="crescent" />
              ) : (
                <>
                  <IonIcon icon={cashOutline} slot="start" />
                  Pagar
                </>
              )}
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </AppLayout>
  );
};

export default Checkout;
