# 📂 Estructura del Proyecto

Este documento explica la arquitectura escalable implementada en el proyecto.

---

## 🏗️ Estructura Completa

```
meli-test/
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── nest-cli.json
│
├── README.md
├── run.md
├── plan.md
├── prompts.md
├── STRUCTURE.md (este archivo)
│
└── src/
    ├── main.ts                                    # Bootstrap de la aplicación
    ├── app.module.ts                              # Módulo raíz
    │
    ├── interfaces/                                # Interfaces globales compartidas
    │   └── product.interface.ts                   # Interface de Product
    │
    ├── config/                                    # Configuración y datos
    │   └── data/
    │       └── products.json                      # Datos de productos
    │
    ├── modules/                                   # Módulos de la aplicación
    │   └── products/
    │       ├── products.module.ts                 # Módulo de productos
    │       │
    │       ├── controllers/
    │       │   ├── products.controller.ts         # Controlador REST
    │       │   └── products.controller.spec.ts    # Tests del controlador
    │       │
    │       ├── services/
    │       │   ├── products.service.ts            # Lógica de negocio
    │       │   └── products.service.spec.ts       # Tests del servicio
    │       │
    │       └── dto/
    │           └── compare-products.dto.ts        # DTO para validación
    │
    └── common/                                    # Recursos compartidos
        └── filters/
            └── http-exception.filter.ts           # Filtro global de excepciones
```

---

## 💡 Ventajas de la Estructura

### 1. **Escalabilidad**
- Fácil agregar nuevos módulos sin afectar los existentes
- Estructura clara para proyectos grandes
- Separación lógica de responsabilidades

### 2. **Mantenibilidad**
- Código organizado por funcionalidad
- Fácil localizar archivos
- Convenciones claras

### 3. **Reutilización**
- Interfaces compartidas en `/interfaces`
- Recursos comunes en `/common`
- Configuración centralizada en `/config`

### 4. **Testing**
- Pruebas organizadas en `/tests`
- Fácil agregar nuevas pruebas
- Separación clara de tests unitarios y E2E

---

## 📝 Convenciones

### Interfaces Globales
**Ubicación:** `src/interfaces/`

Interfaces que se usan en múltiples módulos:
```typescript
// src/interfaces/product.interface.ts
export interface Product {
  id: number;
  name: string;
  // ...
}
```

### Módulos
**Ubicación:** `src/modules/{nombre-modulo}/`

Cada módulo contiene:
- `{modulo}.module.ts` - Configuración del módulo
- `controllers/` - Controladores REST
- `services/` - Lógica de negocio
- `dto/` - Data Transfer Objects
- `entities/` (opcional) - Entidades de base de datos
- `interfaces/` (opcional) - Interfaces específicas del módulo

### Recursos Comunes
**Ubicación:** `src/common/`

Recursos compartidos entre módulos:
- `filters/` - Filtros de excepciones
- `guards/` - Guards de autenticación
- `interceptors/` - Interceptores
- `pipes/` - Pipes de transformación
- `decorators/` - Decoradores personalizados

### Configuración
**Ubicación:** `src/config/`

Archivos de configuración:
- `data/` - Datos estáticos (JSON)
- `env/` - Configuración de entorno
- `database/` - Configuración de base de datos

### Pruebas
**Ubicación:** Junto al archivo que prueban

Pruebas unitarias ubicadas en el mismo directorio del archivo:
```
src/modules/products/services/
├── products.service.ts
└── products.service.spec.ts

src/modules/products/controllers/
├── products.controller.ts
└── products.controller.spec.ts
```

**Convención:** `{nombre}.spec.ts` junto a `{nombre}.ts`

**Cobertura de pruebas:**
- ✅ Servicios (lógica de negocio)
- ✅ Controladores (endpoints)
- ✅ DTOs (validaciones) - opcional
- ✅ Filtros (manejo de errores) - opcional

---

## 🔄 Imports Actualizados

### Antes:
```typescript
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';
```

### Ahora:
```typescript
import { Product } from '../../../interfaces/product.interface';
import { ProductsService } from '../services/products.service';
```

O usando alias (configurado en `tsconfig.json`):
```typescript
import { Product } from '@/interfaces/product.interface';
import { ProductsService } from '@/modules/products/services/products.service';
```

---

## 🚀 Agregar Nuevos Módulos

### Ejemplo: Módulo de Usuarios

1. **Crear estructura:**
```bash
mkdir -p src/modules/users/{controllers,services,dto}
```

2. **Crear archivos:**
```
src/modules/users/
├── users.module.ts
├── controllers/
│   └── users.controller.ts
├── services/
│   └── users.service.ts
└── dto/
    └── create-user.dto.ts
```

3. **Registrar en app.module.ts:**
```typescript
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
})
export class AppModule {}
```

---

## 📦 Configuración de Build

### nest-cli.json
```json
{
  "compilerOptions": {
    "assets": [
      "**/*.json",
      "config/data/*.json"
    ]
  }
}
```

Esto asegura que los archivos JSON se copien al directorio `dist/` durante el build.

### Dockerfile
```dockerfile
# Copiar archivos de datos JSON
COPY --from=builder /app/src/config/data ./dist/config/data
```

---

## 🧪 Ejecutar Pruebas

Las pruebas se ejecutan desde la carpeta `src/tests/`:

```bash
# Todas las pruebas
npm run test

# Con cobertura
npm run test:cov

# Modo watch
npm run test:watch
```

---

## 📚 Recursos Adicionales

- **NestJS Best Practices:** https://docs.nestjs.com/
- **Project Structure Guide:** https://docs.nestjs.com/fundamentals/modules
- **Testing Guide:** https://docs.nestjs.com/fundamentals/testing

---

## ✅ Checklist de Migración

Si estás migrando de la estructura anterior:

- [x] Mover interfaces a `src/interfaces/`
- [x] Mover datos a `src/config/data/`
- [x] Reorganizar módulos en `src/modules/{modulo}/`
- [x] Separar controllers en `controllers/`
- [x] Separar services en `services/`
- [x] Mover pruebas a `src/tests/`
- [x] Actualizar imports en todos los archivos
- [x] Actualizar `nest-cli.json`
- [x] Actualizar `Dockerfile`
- [x] Actualizar `docker-compose.yml`
- [x] Actualizar documentación

---

**Estructura implementada siguiendo las mejores prácticas de NestJS para proyectos escalables** ✨
