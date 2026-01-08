# 🎬 IMDb Movie Trends Scraper

## Objetivo
Este proyecto extrae automáticamente las **20 películas que son tendencia** actualmente en IMDb (Most Popular Movies). Es ideal para cinéfilos que quieren estar al día con los estrenos y las películas más comentadas del momento.

## Tecnologías Utilizadas
- **Python 3.10+**
- **BeautifulSoup4**: Para el parseo del HTML.
- **Requests**: Para realizar las peticiones HTTP.
- **Pandas**: Para la estructuración y exportación de los datos.

## Funcionamiento
El script realiza una petición a la sección de "Most Popular Movies" de IMDb, analiza la estructura del DOM para extraer los títulos y las valoraciones, y finalmente genera un archivo CSV con la información.

## Cómo ejecutarlo

1. **Instalar dependencias**:
   ```bash
   pip install requests beautifulsoup4 pandas
   ```

2. **Ejecutar el script**:
   ```bash
   python scraper.py
   ```

3. **Resultado**:
   - Verás el listado de películas por consola.
   - Se generará un archivo `tendencias_imdb.csv` con los datos.