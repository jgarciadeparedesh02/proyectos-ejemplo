import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd

def scrape_jobs():
    print("🚀 Buscando empleos en 'We Work Remotely'...")
    
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    try:
        url = "https://weworkremotely.com/"
        driver.get(url)
        time.sleep(5)
        
        # Intentar obtener todos los enlaces que contienen detalles de trabajos
        job_links = driver.find_elements(By.CSS_SELECTOR, "li.feature a, li.job a")
        
        jobs_list = []
        
        for link in job_links:
            try:
                # El texto suele contener: Título, Empresa, Tipo, Región
                # Buscamos los spans internos para ser más limpios
                title = link.find_element(By.CLASS_NAME, 'title').text
                company = link.find_element(By.CLASS_NAME, 'company').text
                
                # Región/Tipo
                region = "Remote"
                try:
                    region = link.find_element(By.CLASS_NAME, 'region').text
                except:
                    pass
                
                jobs_list.append({
                    "Puesto": title,
                    "Empresa": company,
                    "Región": region
                })
                
                if len(jobs_list) >= 20: break
            except:
                continue
        
        return jobs_list

    except Exception as e:
        print(f"❌ Error durante el scraping: {e}")
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
        # Si falla el scraping dinámico, creamos un ejemplo estático para que el alumno vea la estructura
        print("⚠️ No se pudo realizar el scraping en vivo (posible bloqueo de la web).")
        print("💡 Generando datos de ejemplo para demostración...")
        example_data = [
            {"Puesto": "Senior Python Developer", "Empresa": "TechFlow", "Región": "Anywhere"},
            {"Puesto": "Backend Engineer (Django)", "Empresa": "CloudScale", "Región": "USA Only"},
            {"Puesto": "Data Scientist", "Empresa": "DataViz", "Región": "Europe"}
        ]
        df = pd.DataFrame(example_data)
        df.to_json("empleos_tech_ejemplo.json", orient="records", indent=4, force_ascii=False)
        print("✅ Ejemplo guardado en 'empleos_tech_ejemplo.json'")
