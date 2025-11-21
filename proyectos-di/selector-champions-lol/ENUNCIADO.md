
El objetivo de este proyecto es desarrollar una aplicación web simple que permita a los usuarios explorar y seleccionar campeones del popular juego League of Legends. La aplicación mostrará una lista de campeones y, al seleccionar uno, mostrará sus detalles.

## Funcionalidades Principales

1.  **Visualización de la Lista de Campeones:**
    *   La aplicación debe mostrar una lista de todos los campeones disponibles.
    *   Cada campeón en la lista debe mostrar su nombre y su imagen.

2.  **Detalles del Campeón:**
    *   Al hacer clic en un campeón de la lista, la aplicación debe mostrar una vista detallada de ese campeón.
    *   La vista de detalles debe incluir:
        *   Nombre del campeón.
        *   Imagen del campeón.
        *   Descripción (lore) del campeón.

## Estructura del Proyecto

Se recomienda la siguiente estructura de componentes:

*   `ChampionListComponent`: Para mostrar la lista de campeones.
*   `ChampionDetailComponent`: Para mostrar los detalles de un campeón seleccionado.

## Datos de los Campeones

Los datos de los campeones se proporcionarán en un archivo `champions.json`. Deberás cargar y utilizar estos datos en tu aplicación.

## Pistas y Consejos

*   **Comunicación entre Componentes:** Para comunicar el campeón seleccionado desde `ChampionListComponent` a `ChampionDetailComponent`, puedes utilizar un servicio de Angular o un `@Input()` en el componente de detalles.

*   **Generación de URLs de Imágenes:** Las URLs de las imágenes de los campeones y sus habilidades siguen un patrón. Puedes construir estas URLs dinámicamente.

    *   **URL de la imagen del campeón:** `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{championId}_0.jpg`
    *   **URL de skins del campeón:**  `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{championId}_{skinNum}.jpg`;

    Asegúrate de reemplazar `{championId}` con los valores correspondientes de tus datos.

## Peticiones a la API

En una aplicación Angular, las peticiones a una API externa para obtener datos se suelen realizar en un servicio. Este servicio puede ser inyectado en los componentes que necesiten acceder a esos datos. La petición en sí se suele lanzar en el método `ngOnInit` del ciclo de vida del componente.

En este proyecto, las peticiones que se realizan son las siguientes:

*   **Obtener todos los campeones:**
    ```
    https://ddragon.leagueoflegends.com/cdn/15.22.1/data/en_US/champion.json
    ```

*   **Obtener los datos de un campeón específico:**
    ```
    https://ddragon.leagueoflegends.com/cdn/15.22.1/data/en_US/champion/{championId}.json
    ```

*   **Obtener la imagen de un campeón:**
    ```
    https://ddragon.leagueoflegends.com/cdn/15.22.1/img/champion/{imageName}
    ```

*   **Obtener el splash art de un campeón:**
    ```
    https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{championId}_0.jpg
    ```

*   **Obtener la skin de un campeón:**
    ```
    https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{championId}_{skinNum}.jpg
    ```