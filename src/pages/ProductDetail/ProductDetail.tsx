import {
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonButton,
  IonIcon,
  IonBadge,
} from "@ionic/react";
import { cartOutline, star } from "ionicons/icons";
import { useParams } from "react-router";
import AppLayout from "../../components/AppLayout/AppLayout";
import { Product } from "../../types/product";
import { useCart } from "../../context/CartContext";

/**
 * MOCK temporal
 * Luego esto viene de contexto / API
 */
const products: Product[] = [
  {
    id: 1,
    name: "Raqueta Butterfly Timo Boll ALC",
    price: 850000,
    image:
      "https://deporteka.com.co/wp-content/uploads/2022/05/35861_01-600x600.webp",
    category: "Raquetas",
    rating: 4.8,
    brand: "Butterfly",
  },
  {
    id: 2,
    name: "Raqueta DHS Hurricane 301",
    price: 620000,
    image: "https://revspin.net/images/blade/dhs-hurricane-301.jpg",
    category: "Raquetas",
    rating: 4.6,
    brand: "DHS",
  },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <AppLayout title="Producto">
        <IonText className="ion-padding">
          <p>Producto no encontrado</p>
        </IonText>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={product.name}>
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
