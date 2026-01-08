import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd

def scrape_jobs():
    print("🚀 Buscando empleos en 'We Work Remotely'...")
    
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    try:
        # Cargamos la página principal
        url = "https://weworkremotely.com/"
        driver.get(url)
        
        # Esperar a que el contenedor de listas aparezca
        wait = WebDriverWait(driver, 20)
        # El subagent encontró 'new-listing-container'
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "new-listing-container")))
        
        # Intentamos obtener los items
        job_items = driver.find_elements(By.CLASS_NAME, "new-listing-container")
        
        jobs_list = []
        
        for item in job_items:
            try:
                # Dentro de cada item, buscamos título y empresa
                # Usamos selectores CSS relativos para mayor precisión
                title = item.find_element(By.CSS_SELECTOR, ".new-listing__header__title").text
                company = item.find_element(By.CSS_SELECTOR, ".new-listing__company-name").text
                
                try:
                    region = item.find_element(By.CSS_SELECTOR, ".new-listing__company-headquarters").text
                except:
                    region = "Remote"
                
                jobs_list.append({
                    "Puesto": title,
                    "Empresa": company,
                    "Región": region
                })
                
                if len(jobs_list) >= 20: break
            except Exception:
                continue
        
        return jobs_list

    except Exception as e:
        print(f"❌ Error durante el scraping: {e}")
        # Intento de fallback desesperado con BeautifulSoup si Selenium falla
        return []
    finally:
        driver.quit()

if __name__ == "__main__":
    jobs = scrape_jobs()
    
    if jobs:
        print(f"\n✅ Se encontraron {len(jobs)} ofertas destacadas:")
        df = pd.DataFrame(jobs)
        print(df.to_string(index=False)) 
        df.to_json("empleos_tech.json", orient="records", indent=4, force_ascii=False)
        print("\n✅ Datos guardados en 'empleos_tech.json'")
    else:
        print("📭 No se encontraron ofertas reales. Revisa la conexión a internet o los selectores.")
