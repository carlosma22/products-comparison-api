# 🛍️ Products Comparison API

API RESTful desarrollada con **NestJS** y **TypeScript** para comparar productos y obtener información detallada de múltiples artículos. Diseñada siguiendo estándares profesionales de arquitectura limpia y mejores prácticas de desarrollo backend.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Endpoints](#-endpoints)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Pruebas](#-pruebas)
- [Docker](#-docker)
- [Documentación API](#-documentación-api)
- [Estructura del Proyecto](#-estructura-del-proyecto)

---

## ✨ Características

- ✅ **API RESTful** con endpoints para consultar y comparar productos
- ✅ **Validación de datos** con `class-validator` y `class-transformer`
- ✅ **Manejo de errores** centralizado con filtros personalizados
- ✅ **Documentación automática** con Swagger/OpenAPI
- ✅ **Pruebas unitarias y E2E** con Jest
- ✅ **Containerización** con Docker y Docker Compose
- ✅ **Código limpio** siguiendo principios SOLID y convenciones NestJS
- ✅ **TypeScript** con tipado estricto
- ✅ **Datos locales** almacenados en JSON (sin base de datos)

---

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **NestJS** | 10.x | Framework backend progresivo |
| **TypeScript** | 5.x | Lenguaje de programación tipado |
| **Swagger** | 7.x | Documentación de API |
| **Jest** | 29.x | Framework de testing |
| **Docker** | Latest | Containerización |
| **Node.js** | 18.x | Runtime de JavaScript |

---

## 🏗️ Arquitectura

El proyecto sigue una **arquitectura modular escalable** basada en los principios de NestJS:

```
src/
├── main.ts                          # Punto de entrada de la aplicación
├── app.module.ts                    # Módulo raíz
│
├── interfaces/                      # Interfaces globales compartidas
│   └── product.interface.ts
│
├── config/                          # Configuración y datos
│   └── data/
│       └── products.json
│
├── modules/                         # Módulos de la aplicación
│   └── products/
│       ├── products.module.ts
│       ├── controllers/
│       │   ├── products.controller.ts
│       │   └── products.controller.spec.ts
│       ├── services/
│       │   ├── products.service.ts
│       │   └── products.service.spec.ts
│       └── dto/
│           └── compare-products.dto.ts
│
└── common/                          # Recursos compartidos
    └── filters/
        └── http-exception.filter.ts
```

### Principios Aplicados

- **Separación de responsabilidades**: Controladores, servicios y DTOs claramente definidos
- **Inyección de dependencias**: Uso del sistema DI de NestJS
- **Validación en capas**: DTOs con decoradores de `class-validator`
- **Manejo de errores centralizado**: Filtro global para excepciones HTTP
- **Tipado fuerte**: Interfaces TypeScript para todos los modelos

---

## 🔌 Endpoints

### 1. Obtener todos los productos

```http
GET /products
```

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "name": "Smartphone Samsung Galaxy S23 Ultra",
    "imageUrl": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
    "description": "Smartphone premium con cámara de 200MP...",
    "price": 1199.99,
    "rating": 4.8,
    "specifications": [
      { "key": "Pantalla", "value": "6.8 pulgadas Dynamic AMOLED 2X, 120Hz" },
      { "key": "Procesador", "value": "Snapdragon 8 Gen 2" }
    ]
  }
]
```

### 2. Comparar productos por IDs

```http
GET /products/compare?ids=1,2,3
```

**Parámetros:**
- `ids` (requerido): Lista de IDs separados por comas (ej: `1,2,3`)

**Respuesta exitosa (200):**
```json
[
  {
    "id": 1,
    "name": "Smartphone Samsung Galaxy S23 Ultra",
    "price": 1199.99,
    "rating": 4.8,
    ...
  },
  {
    "id": 2,
    "name": "Laptop Dell XPS 15",
    "price": 1899.99,
    "rating": 4.6,
    ...
  }
]
```

**Error de validación (400):**
```json
{
  "statusCode": 400,
  "timestamp": "2024-10-26T23:11:00.000Z",
  "path": "/products/compare",
  "method": "GET",
  "message": ["El parámetro ids debe contener números separados por comas (ej: 1,2,3)"],
  "error": "Bad Request"
}
```

**Productos no encontrados (404):**
```json
{
  "statusCode": 404,
  "timestamp": "2024-10-26T23:11:00.000Z",
  "path": "/products/compare",
  "method": "GET",
  "message": "No se encontraron productos con los IDs proporcionados",
  "error": "Not Found",
  "requestedIds": [999, 998]
}
```

---

## 📦 Instalación

### Prerrequisitos

- **Node.js** 18.x o superior
- **npm** 9.x o superior
- **Docker** (opcional, para containerización)

### Pasos

1. **Clonar el repositorio:**
```bash
git clone <repository-url>
cd products-comparison-api
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Verificar la instalación:**
```bash
npm run build
```

---

## 🚀 Uso

### Desarrollo

Iniciar el servidor en modo desarrollo con hot-reload:

```bash
npm run start:dev
```

La API estará disponible en: `http://localhost:3000`

### Producción

Compilar y ejecutar en modo producción:

```bash
npm run build
npm run start:prod
```

### Variables de Entorno

Crear un archivo `.env` (opcional):

```env
PORT=3000
NODE_ENV=development
```

---

## 🧪 Pruebas

### Pruebas Unitarias

```bash
# Ejecutar todas las pruebas
npm run test

# Ejecutar con cobertura
npm run test:cov

# Modo watch
npm run test:watch
```

### Pruebas E2E

```bash
npm run test:e2e
```

### Cobertura Esperada

El proyecto incluye pruebas para:
- ✅ Servicio de productos (`products.service.spec.ts`)
- ✅ Endpoints de la API (`app.e2e-spec.ts`)
- ✅ Validaciones de DTOs
- ✅ Manejo de errores

---

## 🐳 Docker

### Construcción y Ejecución

**Usando Docker Compose (recomendado):**

```bash
# Construir y levantar el contenedor
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Detener el contenedor
docker-compose down
```

**Usando Docker directamente:**

```bash
# Construir la imagen
docker build -t products-api .

# Ejecutar el contenedor
docker run -p 3000:3000 products-api
```

### Desarrollo con Docker

Para desarrollo con hot-reload, usar `Dockerfile.dev`:

```bash
docker build -f Dockerfile.dev -t products-api-dev .
docker run -p 3000:3000 -v $(pwd)/src:/app/src products-api-dev
```

---

## 📚 Documentación API

La documentación interactiva de Swagger está disponible en:

```
http://localhost:3000/api/docs
```

Características de la documentación:
- 📖 Descripción completa de endpoints
- 🔍 Ejemplos de request/response
- ✅ Validaciones y esquemas
- 🧪 Interfaz para probar endpoints

---

## 📁 Estructura del Proyecto

```
products-comparison-api/
├── src/
│   ├── main.ts                                    # Bootstrap de la aplicación
│   ├── app.module.ts                              # Módulo raíz
│   │
│   ├── interfaces/                                # Interfaces globales
│   │   └── product.interface.ts
│   │
│   ├── config/                                    # Configuración
│   │   └── data/
│   │       └── products.json                      # Datos de productos
│   │
│   ├── modules/                                   # Módulos de la aplicación
│   │   └── products/
│   │       ├── products.module.ts
│   │       ├── controllers/
│   │       │   ├── products.controller.ts         # Controlador REST
│   │       │   └── products.controller.spec.ts    # Tests del controlador
│   │       ├── services/
│   │       │   ├── products.service.ts            # Lógica de negocio
│   │       │   └── products.service.spec.ts       # Tests del servicio
│   │       └── dto/
│   │           └── compare-products.dto.ts        # DTO para validación
│   │
│   └── common/                                    # Recursos compartidos
│       └── filters/
│           └── http-exception.filter.ts           # Filtro global de excepciones
│
├── test/
│   ├── app.e2e-spec.ts                            # Pruebas E2E
│   └── jest-e2e.json                              # Configuración Jest E2E
│
├── Dockerfile                                      # Dockerfile para producción
├── Dockerfile.dev                                  # Dockerfile para desarrollo
├── docker-compose.yml                              # Orquestación de contenedores
├── package.json                                    # Dependencias y scripts
├── tsconfig.json                                   # Configuración TypeScript
├── nest-cli.json                                   # Configuración NestJS CLI
├── README.md                                       # Este archivo
├── run.md                                          # Guía de ejecución
├── prompts.md                                      # Prompts de IA utilizados
└── plan.md                                         # Plan técnico del proyecto
```

---

## 🎯 Decisiones Técnicas

### ¿Por qué NestJS?

- **Arquitectura escalable**: Modular y basada en inyección de dependencias
- **TypeScript nativo**: Tipado fuerte y mejor experiencia de desarrollo
- **Ecosistema maduro**: Integración con Swagger, Jest, y más
- **Convenciones claras**: Estructura predecible y mantenible

### ¿Por qué archivos JSON en lugar de base de datos?

- **Simplicidad**: No requiere configuración de base de datos
- **Portabilidad**: Fácil de ejecutar en cualquier entorno
- **Evaluación técnica**: Enfoque en la arquitectura de la API
- **Escalabilidad futura**: Fácil migración a base de datos real

### Patrones Implementados

- **Repository Pattern**: Servicio como capa de acceso a datos
- **DTO Pattern**: Validación y transformación de datos
- **Exception Filter**: Manejo centralizado de errores
- **Dependency Injection**: Desacoplamiento de componentes

---

## 👨‍💻 Desarrollo

### Comandos Útiles

```bash
# Formatear código
npm run format

# Linting
npm run lint

# Compilar
npm run build

# Limpiar y reinstalar
rm -rf node_modules dist
npm install
```

### Agregar Nuevos Productos

Editar el archivo `src/config/data/products.json`:

```json
{
  "id": 6,
  "name": "Nuevo Producto",
  "imageUrl": "https://example.com/image.jpg",
  "description": "Descripción del producto",
  "price": 999.99,
  "rating": 4.5,
  "specifications": [
    { "key": "Característica", "value": "Valor" }
  ]
}
```

---

## 📝 Licencia

MIT License - Ver archivo LICENSE para más detalles.

---

## 🤝 Contribuciones

Este proyecto fue desarrollado como parte de una evaluación técnica. Para contribuciones:

1. Fork el proyecto
2. Crear una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

---

## 📧 Contacto

Para preguntas o sugerencias sobre este proyecto, contactar al equipo de desarrollo.

---

**Desarrollado con ❤️ usando NestJS y TypeScript**
