import requests
from bs4 import BeautifulSoup
import pandas as pd

def get_trending_movies():
    print("🎬 Obteniendo las películas en tendencia de IMDb...")
    
    # URL de películas populares de IMDb
    url = "https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm"
    
    # User-agent para evitar ser bloqueado
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # En IMDb moderno, los datos suelen estar en una lista de items
        # Buscamos los contenedores de las películas
        movie_items = soup.find_all('li', class_='ipc-metadata-list-summary-item')
        
        movies = []
        
        for item in movie_items[:20]: # Obtenemos las primeras 20
            title_tag = item.find('h3', class_='ipc-title__text')
            rating_tag = item.find('span', class_='ipc-rating-star--imdb')
            year_tags = item.find_all('span', class_='sc-b189961a-8 kLaxwI cli-title-metadata-item')
            
            title = title_tag.text if title_tag else "N/A"
            rating = rating_tag.text.strip().split()[0] if rating_tag else "N/A"
            
            # Limpiar el título (a veces viene con el número de ranking delante)
            if '.' in title:
                title = title.split('.', 1)[1].strip()
                
            movies.append({
                "Título": title,
                "Rating": rating
            })
            
        return movies

    except Exception as e:
        print(f"❌ Error al realizar el scraping: {e}")
        return []

if __name__ == "__main__":
    trending_movies = get_trending_movies()
    
    if trending_movies:
        print("\n🏆 Top 20 Películas en Tendencia:")
        df = pd.DataFrame(trending_movies)
        print(df.to_string(index=False))
        
        # Guardar en CSV
        df.to_csv("tendencias_imdb.csv", index=False, encoding='utf-8-sig')
        print("\n✅ Datos guardados en 'tendencias_imdb.csv'")
    else:
        print("📭 No se pudieron obtener datos.")
