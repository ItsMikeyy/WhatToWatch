import requests as r
import random
import bs4

class Scrape:
    def get_movies(self, genres):
        genre_string = ",".join(genres)
        url = f'https://www.imdb.com/search/title/?genres={genre_string}&explore=genres&title_type=feature'
        headers = {
            'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'accept-language': 'en-GB,en;q=0.9',
        }

        prod_response = r.get(url, headers=headers)

        soup = bs4.BeautifulSoup(prod_response.text, features="lxml")
        titles = soup.findAll(class_="ipc-title__text")
        # img_links = soup.findAll(class_="ipc-image")["src"]
        random_title = random.choice(titles).get_text()
        random_title = random_title.split(" ")[1:]
        random_title = " ".join(random_title) 
        return random_title
    


    