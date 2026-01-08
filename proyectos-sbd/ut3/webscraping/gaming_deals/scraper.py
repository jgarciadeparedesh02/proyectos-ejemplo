import requests
from bs4 import BeautifulSoup
import pandas as pd

def get_steam_deals():
    print("🎮 Buscando las mejores ofertas en Steam...")
    
    # URL de los más vendidos con oferta
    url = "https://store.steampowered.com/search/?specials=1&filter=topsellers"
    
    # User-Agent más realista
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "es-ES,es;q=0.9"
    }

    try:
        # Añadimos cookies para evitar redirecciones o bloqueos básicos por región/edad
        cookies = {'birthtime': '568022401', 'lastagecheckage': '1-0-1988'}
        
        response = requests.get(url, headers=headers, cookies=cookies, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Encontrar el contenedor de resultados
        search_results = soup.find('div', id='search_resultsRows')
        if not search_results:
            # Intentar otro selector si el anterior falla
            search_results = soup.select_one('#search_resultsRows')
            
        if not search_results:
            return []
            
        items = search_results.find_all('a', recursive=False)
        
        deals = []
        
        for item in items[:15]:
            try:
                title = item.find('span', class_='title').text
                
                # Descuento
                discount_elem = item.find('div', class_='search_discount')
                discount = discount_elem.text.strip() if discount_elem and discount_elem.text.strip() else "0%"
                
                # Precios
                price_div = item.find('div', class_='search_price')
                price_text = price_div.text.strip()
                
                # Limpieza de precio (Steam a veces pone el original y el rebajado juntos)
                if "€" in price_text:
                    parts = [p.strip() for p in price_text.split("€") if p.strip()]
                    final_price = parts[-1] + "€" if parts else "N/A"
                else:
                    final_price = price_text

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

if __name__ == "__main__":
    steam_deals = get_steam_deals()
    
    if steam_deals:
        print("\n🔥 Top 15 Ofertas Más Vendidas en Steam:")
        df = pd.DataFrame(steam_deals)
        print(df.to_string(index=False))
        df.to_csv("ofertas_steam.csv", index=False, encoding='utf-8-sig')
        print("\n✅ Datos guardados en 'ofertas_steam.csv'")
    else:
        print("⚠️ No se pudieron obtener ofertas en vivo.")
        print("💡 Generando datos de ejemplo para demostración...")
        example_data = [
            {"Juego": "Elden Ring", "Descuento": "-40%", "Precio Final": "35,99€"},
            {"Juego": "Cyberpunk 2077", "Descuento": "-50%", "Precio Final": "29,99€"},
            {"Juego": "Hades II", "Descuento": "-10%", "Precio Final": "26,09€"}
        ]
        df = pd.DataFrame(example_data)
        df.to_csv("ofertas_steam_ejemplo.csv", index=False, encoding='utf-8-sig')
        print("✅ Ejemplo guardado en 'ofertas_steam_ejemplo.csv'")
