# 🚀 Guía de Ejecución - Products Comparison API

Esta guía proporciona instrucciones paso a paso para ejecutar el proyecto en diferentes entornos.

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 18.x o superior → [Descargar](https://nodejs.org/)
- **npm** versión 9.x o superior (incluido con Node.js)
- **Docker** (opcional) → [Descargar](https://www.docker.com/get-started)
- **Docker Compose** (opcional, incluido con Docker Desktop)

### Verificar Instalaciones

```bash
node --version   # Debe mostrar v18.x.x o superior
npm --version    # Debe mostrar 9.x.x o superior
docker --version # Debe mostrar Docker version 20.x.x o superior
```

---

## 🏃 Método 1: Ejecución Local (Desarrollo)

### Paso 1: Clonar o Descargar el Proyecto

```bash
# Si usas Git
git clone <repository-url>
cd products-comparison-api

# O descomprime el archivo ZIP en una carpeta
```

### Paso 2: Instalar Dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias definidas en `package.json`. El proceso puede tardar 1-2 minutos.

**Salida esperada:**
```
added 1234 packages in 45s
```

### Paso 3: Iniciar el Servidor en Modo Desarrollo

```bash
npm run start:dev
```

**Salida esperada:**
```
[Nest] 12345  - 10/26/2024, 11:11:11 PM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 10/26/2024, 11:11:11 PM     LOG [InstanceLoader] AppModule dependencies initialized
[Nest] 12345  - 10/26/2024, 11:11:11 PM     LOG [InstanceLoader] ProductsModule dependencies initialized
✅ 5 productos cargados exitosamente

🚀 ========================================
✅ Aplicación iniciada en: http://localhost:3000
📚 Documentación Swagger: http://localhost:3000/api/docs
🔍 Endpoints disponibles:
   - GET http://localhost:3000/products
   - GET http://localhost:3000/products/compare?ids=1,2,3
🚀 ========================================
```

### Paso 4: Probar la API

Abre tu navegador o usa herramientas como Postman/cURL:

**Opción A: Navegador**
```
http://localhost:3000/products
http://localhost:3000/products/compare?ids=1,2
http://localhost:3000/api/docs (Swagger UI)
```

**Opción B: cURL**
```bash
# Obtener todos los productos
curl http://localhost:3000/products

# Comparar productos
curl "http://localhost:3000/products/compare?ids=1,2,3"
```

**Opción C: PowerShell (Windows)**
```powershell
# Obtener todos los productos
Invoke-WebRequest -Uri http://localhost:3000/products | Select-Object -Expand Content

# Comparar productos
Invoke-WebRequest -Uri "http://localhost:3000/products/compare?ids=1,2" | Select-Object -Expand Content
```

### Paso 5: Detener el Servidor

Presiona `Ctrl + C` en la terminal donde está corriendo el servidor.

---

## 🏭 Método 2: Ejecución en Modo Producción

### Paso 1: Compilar el Proyecto

```bash
npm run build
```

Este comando compila TypeScript a JavaScript en la carpeta `dist/`.

**Salida esperada:**
```
> products-comparison-api@1.0.0 build
> nest build

✔ Successfully compiled
```

### Paso 2: Ejecutar en Modo Producción

```bash
npm run start:prod
```

La aplicación se ejecutará usando el código compilado optimizado.

---

## 🐳 Método 3: Ejecución con Docker

### Opción A: Docker Compose (Recomendado)

#### Paso 1: Construir y Levantar el Contenedor

```bash
docker-compose up --build
```

Este comando:
1. Construye la imagen Docker
2. Crea el contenedor
3. Inicia la aplicación

**Salida esperada:**
```
[+] Building 45.2s (18/18) FINISHED
[+] Running 1/1
 ✔ Container products-comparison-api  Created
Attaching to products-comparison-api
products-comparison-api  | ✅ 5 productos cargados exitosamente
products-comparison-api  | 🚀 ========================================
products-comparison-api  | ✅ Aplicación iniciada en: http://localhost:3000
```

#### Paso 2: Verificar que el Contenedor Está Corriendo

```bash
docker ps
```

**Salida esperada:**
```
CONTAINER ID   IMAGE                    STATUS         PORTS                    NAMES
abc123def456   meli-test-api           Up 30 seconds  0.0.0.0:3000->3000/tcp   products-comparison-api
```

#### Paso 3: Probar la API

```bash
curl http://localhost:3000/products
```

#### Paso 4: Ver Logs del Contenedor

```bash
docker-compose logs -f
```

#### Paso 5: Detener el Contenedor

```bash
# Detener y eliminar contenedores
docker-compose down

# Detener sin eliminar
docker-compose stop
```

### Opción B: Docker sin Compose

#### Paso 1: Construir la Imagen

```bash
docker build -t products-api .
```

#### Paso 2: Ejecutar el Contenedor

```bash
docker run -d -p 3000:3000 --name products-api products-api
```

#### Paso 3: Ver Logs

```bash
docker logs -f products-api
```

#### Paso 4: Detener y Eliminar

```bash
docker stop products-api
docker rm products-api
```

---

## 🧪 Método 4: Ejecutar Pruebas

### Pruebas Unitarias

```bash
# Ejecutar todas las pruebas
npm run test

# Ejecutar con cobertura
npm run test:cov

# Modo watch (re-ejecuta al guardar cambios)
npm run test:watch
```

**Salida esperada:**
```
PASS  src/products/products.service.spec.ts
  ProductsService
    ✓ debe estar definido (5 ms)
    findAll
      ✓ debe retornar un array de productos (2 ms)
    compareProducts
      ✓ debe retornar productos cuando los IDs existen (3 ms)
      ✓ debe lanzar NotFoundException cuando ningún ID existe (2 ms)

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
```

### Pruebas E2E (End-to-End)

```bash
npm run test:e2e
```

**Salida esperada:**
```
PASS  test/app.e2e-spec.ts
  Products API (e2e)
    GET /products
      ✓ debe retornar todos los productos con status 200 (45 ms)
    GET /products/compare
      ✓ debe comparar productos con IDs válidos (23 ms)
      ✓ debe retornar 400 cuando falta el parámetro ids (18 ms)

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
```

---

## 🔧 Solución de Problemas

### Problema: "Cannot find module"

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problema: Puerto 3000 ya en uso

**Solución 1: Cambiar el puerto**
```bash
PORT=3001 npm run start:dev
```

**Solución 2: Matar el proceso en el puerto 3000**
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Problema: Error al cargar products.json

**Verificar que el archivo existe:**
```bash
ls -la src/products/data/products.json
```

**Si no existe, verificar la estructura de carpetas:**
```bash
mkdir -p src/products/data
# Copiar el archivo products.json a esa ubicación
```

### Problema: Docker no puede construir la imagen

**Limpiar cache de Docker:**
```bash
docker system prune -a
docker-compose build --no-cache
```

### Problema: Errores de TypeScript

**Limpiar y recompilar:**
```bash
npm run build
# Si persiste el error
rm -rf dist
npm run build
```

---

## 📊 Verificación de Funcionamiento

### Checklist de Verificación

- [ ] El servidor inicia sin errores
- [ ] Se muestra el mensaje "✅ 5 productos cargados exitosamente"
- [ ] `GET /products` retorna 5 productos
- [ ] `GET /products/compare?ids=1,2` retorna 2 productos
- [ ] `GET /products/compare?ids=999` retorna error 404
- [ ] `GET /products/compare` (sin parámetros) retorna error 400
- [ ] Swagger UI accesible en `/api/docs`
- [ ] Las pruebas pasan exitosamente

### Comandos de Verificación Rápida

```bash
# 1. Verificar que el servidor responde
curl http://localhost:3000/products

# 2. Verificar endpoint de comparación
curl "http://localhost:3000/products/compare?ids=1,2"

# 3. Verificar manejo de errores
curl "http://localhost:3000/products/compare?ids=999"

# 4. Verificar Swagger
curl http://localhost:3000/api/docs
```

---

## 🎯 Comandos Rápidos de Referencia

```bash
# Desarrollo
npm install              # Instalar dependencias
npm run start:dev        # Iniciar en modo desarrollo
npm run build            # Compilar proyecto
npm run start:prod       # Iniciar en modo producción

# Pruebas
npm run test             # Ejecutar pruebas unitarias
npm run test:cov         # Pruebas con cobertura
npm run test:e2e         # Pruebas end-to-end

# Docker
docker-compose up        # Levantar con Docker
docker-compose down      # Detener Docker
docker-compose logs -f   # Ver logs

# Utilidades
npm run lint             # Verificar código
npm run format           # Formatear código
```

---

## 📞 Soporte

Si encuentras problemas no cubiertos en esta guía:

1. Verifica los logs de la aplicación
2. Revisa la sección de solución de problemas
3. Consulta la documentación en `README.md`
4. Verifica que todas las dependencias estén instaladas correctamente

---

**¡Listo! Tu API de comparación de productos está funcionando correctamente. 🎉**
