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
      className="product-card"
    >
      <IonImg src={product.image} alt={product.name} />

      <IonCardHeader>
        <IonCardTitle className="product-name">{product.name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <h2 className="product-price">
          ${product.price.toLocaleString("es-CO")}
        </h2>
      </IonCardContent>
    </IonCard>
  );
};

export default ProductCard;
