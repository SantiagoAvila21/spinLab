import {
  IonText,
  IonImg,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

import AppLayout from "../../components/AppLayout/AppLayout";
import { Product } from "../../types/product";
import ProductCard from "../../components/ProductCard/ProductCard";

const products: Product[] = [
  {
    id: 1,
    name: "Raqueta Butterfly Timo Boll ALC",
    price: 850000,
    image:
      "https://deporteka.com.co/wp-content/uploads/2022/05/35861_01-600x600.webp",
    category: "Raquetas",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Raqueta DHS Hurricane 301",
    price: 620000,
    image: "https://revspin.net/images/blade/dhs-hurricane-301.jpg",
    category: "Raquetas",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Pelotas Butterfly 40+ (6 unidades)",
    price: 78000,
    image: "https://revspin.net/images/balls/butterfly-3-star-40-plus-poly.jpg",
    category: "Pelotas",
    rating: 4.5,
  },
  {
    id: 4,
    name: "Goma DHS Hurricane 3 Neo",
    price: 145000,
    image:
      "https://revspin.net/images/rubber/dhs-neo-hurricane-3-provincial-blue-sponge.jpg",
    category: "Gomas",
    rating: 4.7,
  },
  {
    id: 5,
    name: "Mesa de Tenis de Mesa Stiga Advantage",
    price: 1850000,
    image:
      "https://images.weserv.nl/?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F715H6LW4MpL.jpg&w=640&q=100&output=webp",
    category: "Mesas",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Estuche Butterfly Doble",
    price: 98000,
    image:
      "https://www.rocayaltura.co/4739-large_default/estuche-butterfly-2-raquetas.jpg",
    category: "Accesorios",
    rating: 4.4,
  },
];

const Home: React.FC = () => {
  return (
    <AppLayout title="SpinLab">
      {/* Título / slogan */}
      <IonText className="ion-text-center ion-margin">
        <h2>Tu lugar para el tenis de mesa</h2>
      </IonText>

      {/* GIF promocional */}
      <IonImg
        src="../../../public/assets/pingpongGif.gif"
        alt="Tenis de mesa promo"
        className="ion-margin"
      />

      {/* Buscador */}
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-md="8" size-lg="6">
            <IonSearchbar placeholder="Buscar palas, gomas, pelotas..." />
          </IonCol>
        </IonRow>
      </IonGrid>

      {/* Filtros */}
      <IonGrid className="ion-margin-top">
        <IonRow className="ion-justify-content-center ion-align-items-center">
          {/* Categoría */}
          <IonCol size="12" size-md="4" size-lg="3">
            <IonSelect placeholder="Categoría" interface="popover">
              <IonSelectOption value="all">Todas</IonSelectOption>
              <IonSelectOption value="Raquetas">Raquetas</IonSelectOption>
              <IonSelectOption value="Gomas">Gomas</IonSelectOption>
              <IonSelectOption value="Pelotas">Pelotas</IonSelectOption>
              <IonSelectOption value="Mesas">Mesas</IonSelectOption>
              <IonSelectOption value="Accesorios">Accesorios</IonSelectOption>
            </IonSelect>
          </IonCol>

          {/* Marca */}
          <IonCol size="12" size-md="4" size-lg="3">
            <IonSelect placeholder="Marca" interface="popover">
              <IonSelectOption value="all">Todas</IonSelectOption>
              <IonSelectOption value="Butterfly">Butterfly</IonSelectOption>
              <IonSelectOption value="DHS">DHS</IonSelectOption>
              <IonSelectOption value="Stiga">Stiga</IonSelectOption>
            </IonSelect>
          </IonCol>

          {/* Ordenar */}
          <IonCol size="12" size-md="4" size-lg="3">
            <IonSelect placeholder="Ordenar por" interface="popover">
              <IonSelectOption value="price-asc">
                Precio: menor a mayor
              </IonSelectOption>
              <IonSelectOption value="price-desc">
                Precio: mayor a menor
              </IonSelectOption>
              <IonSelectOption value="rating-desc">Rating ⭐</IonSelectOption>
            </IonSelect>
          </IonCol>
        </IonRow>
      </IonGrid>

      {/* Grid de productos */}
      <IonGrid>
        <IonRow>
          {products.map((product) => (
            <IonCol key={product.id} size="6" size-md="6" size-lg="4">
              <ProductCard product={product} />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </AppLayout>
  );
};

export default Home;
