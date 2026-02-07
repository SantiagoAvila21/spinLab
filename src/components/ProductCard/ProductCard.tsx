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
      routerLink={`/product/${product.Id}`}
      button
      className="product-card"
    >
      <IonImg src={product.Image} alt={product.Name} />

      <IonCardHeader>
        <IonCardTitle className="product-name">{product.Name}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <h2 className="product-price">
          ${product.Price.toLocaleString("es-CO")}
        </h2>
      </IonCardContent>
    </IonCard>
  );
};

export default ProductCard;
