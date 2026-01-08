# PokéAPI + Ionic & Angular (Standalone Components)

Este proyecto es un ejemplo práctico de cómo integrar **Ionic 7** con **Angular 17+** utilizando el nuevo paradigma de **Standalone Components**. Está diseñado como material didáctico para enseñar el consumo de APIs REST y el desarrollo de interfaces móviles premium.

## 🚀 Cómo se creó este proyecto

El proyecto fue generado utilizando la CLI de Ionic con el siguiente comando:

```bash
npx ionic start pokemon-app blank --type=angular
```

Se seleccionó la arquitectura de **Standalone Components** para simplificar la estructura del proyecto y eliminar la necesidad de `AppModule`.

## 📂 Estructura del Proyecto

```text
src/
├── app/
│   ├── services/
│   │   └── poke.service.ts      # Cliente API para PokeAPI
│   ├── home/
│   │   ├── home.page.ts         # Lista de Pokémon con scroll infinito
│   │   ├── home.page.html
│   │   └── home.page.scss       # Estilos premium (Glassmorphism)
│   ├── detail/
│   │   ├── detail.page.ts       # Vista detallada de un Pokémon
│   │   ├── detail.page.html
│   │   └── detail.page.scss
│   ├── app.routes.ts            # Configuración de rutas
│   └── app.component.ts         # Componente raíz
└── main.ts                      # Configuración de arranque (HttpClient, Ionic)
```

## 🛠️ Componentes y Partes Clave

### 1. PokeService (`poke.service.ts`)
Utiliza `HttpClient` para realizar peticiones a la API. Se hace uso de `firstValueFrom` de RxJS para manejar las peticiones de forma asíncrona con `async/await`, lo cual suele ser más intuitivo para los alumnos que empiezan con TypeScript.

### 2. Home Page (Listado)
- **IonSearchbar**: Filtrado dinámico en tiempo real de la lista cargada.
- **IonInfiniteScroll**: Implementa la paginación técnica cargando nuevos Pokémon conforme el usuario llega al final de la lista.
- **Glassmorphism Design**: Se han aplicado efectos de desenfoque y degradados para dar un aspecto moderno y "premium".

### 3. Detail Page (Detalle)
- **Routing**: Recupera el nombre del Pokémon de la URL mediante `ActivatedRoute`.
- **IonProgressBar**: Visualización de estadísticas base (HP, Ataque, etc.) de forma gráfica.
- **Official Artwork**: Muestra la imagen de alta calidad proporcionada por la PokeAPI en lugar de los sprites clásicos.

## 🎮 Funcionalidades implementadas
- [x] Listado completo de Pokémon.
- [x] Búsqueda por nombre.
- [x] Scroll infinito (Lazy loading de datos).
- [x] Navegación entre vistas.
- [x] Ficha técnica detallada con estadísticas y pesos/alturas.

## 💻 Ejecución del proyecto

Para ejecutar el proyecto en desarrollo:

```bash
npx ionic serve
```

---
*Este proyecto fue generado como ejemplo para la asignatura de Desarrollo de Interfaces (DI).*
