import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonButton,
} from "@ionic/react";
import { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <IonCard>
      <IonImg src={product.image} alt={product.name} />
      <IonCardHeader>
        <IonCardTitle>{product.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>${product.price.toLocaleString("es-CO")}</p>
        <IonButton expand="block">Agregar al carrito</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default ProductCard;
