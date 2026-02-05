import {
  IonText,
  IonImg,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { useState, useMemo } from "react";

import { closeCircleOutline } from "ionicons/icons";

import AppLayout from "../../components/AppLayout/AppLayout";
import { Product } from "../../types/product";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

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
  {
    id: 3,
    name: "Pelotas Butterfly 40+ (6 unidades)",
    price: 78000,
    image: "https://revspin.net/images/balls/butterfly-3-star-40-plus-poly.jpg",
    category: "Pelotas",
    rating: 4.5,
    brand: "Butterfly",
  },
  {
    id: 4,
    name: "Goma DHS Hurricane 3 Neo",
    price: 145000,
    image:
      "https://revspin.net/images/rubber/dhs-neo-hurricane-3-provincial-blue-sponge.jpg",
    category: "Gomas",
    rating: 4.7,
    brand: "DHS",
  },
  {
    id: 5,
    name: "Mesa de Tenis de Mesa Stiga Advantage",
    price: 1850000,
    image:
      "https://images.weserv.nl/?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F715H6LW4MpL.jpg&w=640&q=100&output=webp",
    category: "Mesas",
    rating: 4.9,
    brand: "Stiga",
  },
  {
    id: 6,
    name: "Estuche Butterfly Doble",
    price: 98000,
    image:
      "https://www.rocayaltura.co/4739-large_default/estuche-butterfly-2-raquetas.jpg",
    category: "Accesorios",
    rating: 4.4,
    brand: "Butterfly",
  },
];

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("");

  // Obtener todos las marcas distintas de cada producto usando un Set
  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  );
  // Obtener todas las categorías distintas de cada producto usando un Set
  const brands = Array.from(new Set(products.map((product) => product.brand)));

  // Se realiza primero el filtrado por nombre, luego por categoria y finalmente por marca
  // El resultado es la interseccion de los tres filtros
  const filteredProducts = useMemo(() => {
    let filter = products
      .filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()),
      )
      .filter((product) =>
        selectedCategory === "all"
          ? true
          : product.category === selectedCategory,
      )
      .filter((product) =>
        selectedBrand === "all" ? true : product.brand === selectedBrand,
      );

    // Aplicar el orden seleccionado
    if (selectedSort === "price-asc") {
      filter = filter.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-desc") {
      filter = filter.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "rating-desc") {
      filter = filter.sort((a, b) => b.rating - a.rating);
    }

    return filter;
  }, [searchText, selectedCategory, selectedBrand, selectedSort]);

  // Funcion para limpiar los filtros
  const handleClearFilters = () => {
    setSearchText("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSelectedSort("");
  };

  return (
    <AppLayout>
      <IonText className="ion-text-center ion-margin">
        <h2>Tu lugar para el tenis de mesa</h2>
      </IonText>

      <IonImg
        src="../../../public/assets/pingpongGif.gif"
        alt="Tenis de mesa promo"
        className="ion-margin"
      />

      {/* Buscador */}
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" size-md="8" size-lg="6">
            <IonSearchbar
              placeholder="Buscar palas, gomas, pelotas..."
              onIonInput={(e) => setSearchText(e.detail.value ?? "")}
              debounce={0}
            />
          </IonCol>
        </IonRow>
      </IonGrid>

      <IonText className="ion-text-start ion-margin-start" color="primary">
        Filtrar:
      </IonText>

      {/* Filtros */}
      <IonGrid className="ion-margin-top">
        <IonRow className="ion-justify-content-center ion-align-items-center">
          {/* Categoría */}
          <IonCol size="12" size-md="4" size-lg="3">
            <IonSelect
              placeholder="Categoría"
              interface="popover"
              value={selectedCategory}
              onIonChange={(e) => setSelectedCategory(e.detail.value)}
            >
              <IonSelectOption value="all">Categoría</IonSelectOption>

              {categories.map((category) => (
                <IonSelectOption key={category} value={category}>
                  {category}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonCol>

          {/* Marca */}
          <IonCol size="12" size-md="4" size-lg="3">
            <IonSelect
              placeholder="Marca"
              interface="popover"
              value={selectedBrand}
              onIonChange={(e) => setSelectedBrand(e.detail.value)}
            >
              <IonSelectOption value="all">Marca</IonSelectOption>

              {brands.map((brand) => (
                <IonSelectOption key={brand} value={brand}>
                  {brand}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonCol>

          {/* Ordenar */}
          <IonCol size="12" size-md="4" size-lg="3">
            <IonSelect
              placeholder="Ordenar por"
              interface="popover"
              value={selectedSort}
              onIonChange={(e) => setSelectedSort(e.detail.value)}
            >
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

      <div className="ion-filter-divbutton">
        <IonButton
          fill="clear"
          slot="end"
          className="ion-margin-end"
          onClick={handleClearFilters}
        >
          <IonIcon slot="start" icon={closeCircleOutline} />
          <IonLabel>Limpiar Filtro</IonLabel>
        </IonButton>
      </div>

      {/* Grid de productos */}
      <IonGrid>
        <IonRow>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <IonCol key={product.id} size="6" size-md="6" size-lg="4">
                <ProductCard product={product} />
              </IonCol>
            ))
          ) : (
            <IonCol size="12">
              <IonText className="ion-text-center ion-margin">
                <p>No se encontraron productos</p>
              </IonText>
            </IonCol>
          )}
        </IonRow>
      </IonGrid>
    </AppLayout>
  );
};

export default Home;
