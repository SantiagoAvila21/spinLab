# SpinLab Mobile - E-commerce de Tenis de Mesa

SpinLab Mobile es una aplicación **Ionic React** desarrollada como prototipo de tienda e-commerce especializada en productos de tenis de mesa. La app está diseñada para demostrar funcionalidades completas de compra, registro de usuarios y navegación de productos.

---

## Descripción del Proyecto

- **Framework:** Ionic con React.  
- **Backend:** Se implementó un backend en **.NET**, pero para los fines del entregable se utilizó **mockups y almacenamiento local (localStorage)** para simular la persistencia de datos.  
- **Propósito:** Entregar un prototipo funcional de tienda de tenis de mesa, con todos los flujos de usuario y funcionalidades de e-commerce.

---

## Funcionalidades Principales

1. **Registro y login de usuarios**  
   - Creación de cuentas y autenticación básica.  
   - Gestión de sesiones utilizando localStorage.

2. **Catálogo de productos**  
   - Visualización de productos de tenis de mesa con imágenes y descripción.  
   - Sistema de **filtros** para categorías y tipos de productos.

3. **Carrito de compras**  
   - Agregar, eliminar y modificar productos en el carrito.  
   - Cálculo de totales y cantidades.

4. **Persistencia de datos**  
   - Uso de **localStorage** para guardar datos del carrito y sesión del usuario.  
   - Funcionalidad totalmente operativa, aunque basada en mockups para el backend.

5. **Interfaz y navegación**  
   - Navegación fluida entre pantallas de productos, carrito, perfil y registro/login.  
   - UI adaptada a dispositivos móviles utilizando componentes de Ionic.

---

## Backend

- Se desarrolló un **backend en .NET** para simular la conexión a base de datos y servicios.  
- Aunque el backend no fue suficiente para el entregable final, la app utiliza mockups que permiten **simular completamente todas las funcionalidades de compra y usuario**.

---

## Instalación y Uso

1. Instalar el APK directamente en un dispositivo Android:  
   - El archivo APK se encuentra en `android/app/build/outputs/apk/debug/app-debug.apk`.  
   - Instalar y ejecutar la app directamente.

2. Alternativamente, para desarrollo y pruebas:  
   ```bash
   npm install
   npm run build
   npx cap copy android
   npx cap open android
