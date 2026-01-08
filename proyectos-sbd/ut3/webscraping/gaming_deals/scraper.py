import time
import random
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd

def get_steam_deals():
    print("🎮 Buscando las mejores ofertas en Steam...")
    
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    try:
        url = "https://store.steampowered.com/search/?specials=1&filter=topsellers"
        driver.get(url)
        
        # Esperar a que los resultados de búsqueda aparezcan
        wait = WebDriverWait(driver, 15)
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "search_result_row")))
        
        # Obtener los elementos de los juegos
        game_rows = driver.find_elements(By.CLASS_NAME, "search_result_row")
        
        deals = []
        
        for row in game_rows[:15]: # Top 15
            try:
                title = row.find_element(By.CLASS_NAME, 'title').text
                
                # Descuento
                try:
                    discount = row.find_element(By.CLASS_NAME, 'discount_pct').text
                except:
                    discount = "0%"
                
                # Precios
                try:
                    # Si hay descuento, buscamos el precio final
                    final_price = row.find_element(By.CLASS_NAME, 'discount_final_price').text
                except:
                    # Si no hay descuento, buscamos el precio normal
                    final_price = row.find_element(By.CLASS_NAME, 'search_price').text.strip()

                deals.append({
                    "Juego": title,
                    "Descuento": discount,
                    "Precio Final": final_price
                })
            except Exception:
                continue
                
        return deals

    except Exception as e:
        print(f"❌ Error al realizar el scraping: {e}")
        return []
    finally:
        driver.quit()

if __name__ == "__main__":
    steam_deals = get_steam_deals()
    
    if steam_deals:
        print("\n🔥 Top 15 Ofertas Más Vendidas en Steam:")
        df = pd.DataFrame(steam_deals)
        print(df.to_string(index=False))
        
        df.to_csv("ofertas_steam.csv", index=False, encoding='utf-8-sig')
        print("\n✅ Datos guardados en 'ofertas_steam.csv'")
    else:
        print("📭 No se pudieron obtener ofertas reales. Steam podría estar bloqueando el acceso automatizado.")
