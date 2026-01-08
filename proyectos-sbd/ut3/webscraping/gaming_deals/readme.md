# 🎮 Steam Gaming Deals (BeautifulSoup)

## Objetivo
Este script extrae las **mejores ofertas de videojuegos** de los "Top Sellers" en Steam. Es ideal para estudiantes que quieren ahorrar dinero en juegos y ver cómo se extraen precios y descuentos de un e-commerce masivo.

## Tecnologías Utilizadas
- **Python 3.10+**
- **Selenium**: Para navegar e interactuar con la web de Steam de forma realista.
- **Webdriver-manager**: Gestiona automáticamente la instalación del driver de Chrome.
- **Pandas**: Para formatear los resultados en una tabla clara.

## El reto de Steam
Steam suele tener medidas de seguridad para evitar scrapers masivos. En este script, utilizamos **Selenium** para simular un navegador real, lo que nos permite saltarnos las detecciones básicas que bloquean peticiones directas de librerías como `requests`.

## Cómo ejecutarlo

1. **Instalar dependencias**:
   ```bash
   pip install selenium webdriver-manager pandas
   ```

2. **Ejecutar el script**:
   ```bash
   python scraper.py
   ```

3. **Resultado**:
   - Listado de juegos, porcentaje de descuento y precio final por consola.
   - Archivo `ofertas_steam.csv` con todos los datos.
