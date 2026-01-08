# 🚀 Tech Jobs Scraper (Selenium)

## Objetivo
Este proyecto automatiza la búsqueda de empleos tecnológicos remotos en **We Work Remotely**. Está diseñado para estudiantes de ingeniería o programación que buscan su primer empleo o prácticas en el mundo tech. 

## Tecnologías Utilizadas
- **Python 3.10+**
- **Selenium**: Para navegar e interactuar con la web.
- **Webdriver-manager**: Para gestionar automáticamente los drivers de Chrome.
- **Pandas**: Para la organización de los datos.

## Por qué Selenium?
A diferencia del ejemplo anterior, muchas webs de empleo cargan sus listas de forma dinámica mediante JavaScript. BeautifulSoup no puede ver ese contenido, por lo que usamos **Selenium** para simular un navegador real que sí ejecute ese código.

## Cómo ejecutarlo

1. **Instalar dependencias**:
   ```bash
   pip install selenium webdriver-manager pandas
   ```

2. **Asegúrate de tener Chrome instalado**.

3. **Ejecutar el script**:
   ```bash
   python scraper.py
   ```

4. **Resultado**:
   - Se abrirá un navegador invisible (headless).
   - El script extraerá el Título, Empresa y Región de las ofertas.
   - Guardará la información en `empleos_tech.json`.