import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
} from "@ionic/react";
import { Product } from "../../types/product";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <IonCard
      routerLink={`/product/${product.id}`}
      button
    >
      <IonImg src={product.image} alt={product.name} />

      <IonCardHeader>
        <IonCardTitle>{product.name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <p>${product.price.toLocaleString("es-CO")}</p>
      </IonCardContent>
    </IonCard>
  );
};

export default ProductCard;
