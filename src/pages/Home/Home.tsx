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
  IonSpinner,
} from "@ionic/react";
import { useState, useMemo, useEffect } from "react";

import { closeCircleOutline } from "ionicons/icons";

import AppLayout from "../../components/AppLayout/AppLayout";
import { Product } from "../../types/product";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";
import { fetchProducts } from "../../api/products";

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts(searchText, selectedCategory, selectedBrand, selectedSort)
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, [searchText, selectedCategory, selectedBrand, selectedSort]);

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
  }, [searchText, selectedCategory, selectedBrand, selectedSort, products]);

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
        <IonRow className="ion-justify-content-center">
          {loading ? (
            <IonCol size="12" className="ion-text-center ion-padding">
              <IonSpinner name="crescent" />
            </IonCol>
          ) : filteredProducts.length > 0 ? (
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
