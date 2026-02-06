import {
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonButton,
  IonIcon,
  IonBadge,
  IonSpinner,
} from "@ionic/react";
import { cartOutline, star } from "ionicons/icons";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import AppLayout from "../../components/AppLayout/AppLayout";
import { Product } from "../../types/product";
import { useCart } from "../../context/CartContext";

const API_URL = "http://localhost:5297/api/products";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`${API_URL}/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then((data: Product) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <IonGrid>
          <IonRow>
            <IonCol size="12" className="ion-text-center ion-padding">
              <IonSpinner name="crescent" />
            </IonCol>
          </IonRow>
        </IonGrid>
      </AppLayout>
    );
  }

  if (error || !product) {
    return (
      <AppLayout>
        <IonText className="ion-padding">
          <p>{error ?? "Producto no encontrado"}</p>
        </IonText>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <IonGrid className="ion-padding">

        {/* Imagen */}
        <IonRow>
          <IonCol size="12">
            <IonImg src={product.image} alt={product.name} />
          </IonCol>
        </IonRow>

        {/* Info */}
        <IonRow className="ion-margin-top">
          <IonCol size="12">
            <IonText>
              <h2>{product.name}</h2>
            </IonText>

            <IonText color="primary">
              <h3>${product.price.toLocaleString("es-CO")}</h3>
            </IonText>

            {/* Rating + categoría */}
            <div className="ion-margin-top" style={{ display: "flex", gap: 12 }}>
              <IonBadge color="warning">
                <IonIcon icon={star} /> {product.rating}
              </IonBadge>

              <IonBadge color="medium">{product.category}</IonBadge>
            </div>
          </IonCol>
        </IonRow>

        {/* Descripción */}
        <IonRow className="ion-margin-top">
          <IonCol size="12">
            <IonText color="medium">
              <p>
                Producto profesional de alta calidad para jugadores de tenis de
                mesa que buscan precisión, control y rendimiento competitivo.
              </p>
            </IonText>
          </IonCol>
        </IonRow>

        {/* Botón agregar */}
        <IonRow className="ion-margin-top">
          <IonCol size="12">
            <IonButton expand="block" onClick={() => addToCart(product)}>
              <IonIcon icon={cartOutline} slot="start" />
              Agregar al carrito
            </IonButton>
          </IonCol>
        </IonRow>

      </IonGrid>
    </AppLayout>
  );
};

export default ProductDetail;
