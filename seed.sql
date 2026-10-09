-- Seed data for products table

INSERT INTO public.products (name, description, price, image_url, category, inventory_count, is_digital)
VALUES
  (
    'Ledger Nano X - Billetera Hardware Cripto',
    'Asegura tus criptoactivos con el Ledger Nano X. Con Bluetooth, soporta miles de tokens y mantiene tus claves privadas fuera de línea para máxima seguridad.',
    149.00,
    'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Hardware',
    50,
    false
  ),
  (
    'Camiseta Logo Bitcoin (Algodón Premium)',
    'Muestra tu apoyo a la revolución descentralizada con esta camiseta premium, ultra suave 100% algodón, con un logo minimalista de Bitcoin. Disponible en todas las tallas.',
    29.99,
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Ropa',
    200,
    false
  ),
  (
    'Masterclass Completa de Desarrollador Web3 (Curso Digital)',
    'Aprende a construir aplicaciones descentralizadas desde cero. Este curso completo en video cubre Solidity, Ethers.js, Hardhat y seguridad de contratos inteligentes.',
    199.00,
    'https://images.unsplash.com/photo-1639762681485-074b7f4ec651?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Educación',
    9999,
    true
  ),
  (
    'Letrero de Neón Solana',
    'Ilumina tu setup de juegos o la oficina con este letrero de neón vibrante, hecho a medida, que presenta el logo del ecosistema Solana. Tecnología LED eficiente.',
    125.50,
    'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Decoración',
    15,
    false
  ),
  (
    'Servicio de Auditoría de Contrato Inteligente (Básico)',
    'Revisión de seguridad profesional para tu contrato inteligente ERC20 o ERC721. Incluye análisis automatizado y revisión manual de hasta 500 líneas de código Solidity.',
    500.00,
    'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Servicios',
    10,
    true
  ),
  (
    'Libro Digital: Análisis del Mercado Cripto',
    'Un análisis profundo sobre analíticas on-chain y psicología de mercado. Escrito por veteranos de la industria para ayudarte a entender los ciclos del mercado.',
    15.00,
    'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Digital',
    9999,
    true
  );
