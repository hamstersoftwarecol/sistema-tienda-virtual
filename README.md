# Plataforma de Comercio Electrónico Full Stack 🚀

Bienvenido al repositorio de este sitio web de comercio electrónico Full Stack listo para producción. Esta tienda moderna te permite vender productos físicos, digitales y servicios, e integra pagos seguros tanto con dinero fiduciario (tarjetas) como con criptomonedas (USDT/USDC).

## 💡 Lo que incluye

*   **Arquitectura Moderna:** App Router de Next.js (versión 15).
*   **Interfaz Responsiva:** Construida con Tailwind CSS y componentes de `lucide-react`.
*   **Autenticación y Base de Datos:** Integración completa con Supabase (Autenticación y PostgreSQL).
*   **Carrito de Compras:** Gestión de estado global y persistente utilizando Zustand.
*   **Pagos Fiat:** Pasarela de pago segura con Stripe Checkout.
*   **Pagos Web3:** Integración con criptomonedas estables (USDT y USDC) usando `ethers.js` y MetaMask.
*   **Gestión de Órdenes:** Panel de control de cliente para ver su historial de compras y Panel de Administración para visualizar ventas y catálogo.

## 🛠 Pila Tecnológica

*   [Next.js](https://nextjs.org/) (React, TypeScript)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [Supabase](https://supabase.com/)
*   [Stripe](https://stripe.com/)
*   [Ethers.js](https://docs.ethers.org/) (Web3)
*   [Zustand](https://docs.pmnd.rs/zustand) (Estado global)

## 🚀 Instalación y Configuración Local

Sigue estos pasos para correr el proyecto en tu entorno local:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura las Variables de Entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes claves:
    ```env
    # Supabase (Obtén estos de tu panel de Supabase)
    NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

    # Stripe (Obtén estos de tu panel de Stripe)
    STRIPE_SECRET_KEY=tu_stripe_secret_key
    ```

4.  **Configura la Base de Datos:**
    Copia el contenido del archivo `supabase-schema.sql` y ejecútalo en el SQL Editor de tu proyecto en Supabase para crear las tablas necesarias (`products`, `orders`, `order_items`).

5.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si tienes sugerencias, encuentras bugs o quieres añadir características, siéntete libre de abrir un *Issue* o un *Pull Request*.
