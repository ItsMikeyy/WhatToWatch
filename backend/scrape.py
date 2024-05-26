import requests as r
import random
import bs4

class Scrape:
    def get_show(self, genres, type):
        genre_string = ""
        if len(genre_string) > 1:
            genre_string = ",".join(genres)
        else:
            for w in genres:
                genre_string += w
        print(genre_string)
        url = f'https://www.imdb.com/search/title/?genres={genre_string}&explore=genres&title_type={type}'
        headers = {
            'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            'accept-language': 'en-GB,en;q=0.9',
        }

        prod_response = r.get(url, headers=headers)

        soup = bs4.BeautifulSoup(prod_response.text, features="lxml")
        data = self.get_data(soup)
        return data        
    
    def get_data(self, soup):
        divs = soup.findAll(class_="ipc-metadata-list-summary-item")
        divs.pop()            #Extra element
        selected_div = random.choice(divs)

        title = self.get_title(selected_div)
        img = self.get_img(selected_div)
        desc = self.get_description(selected_div)
        link = self.get_link(selected_div)
        return {"title": title, "img": img, "description": desc, "link": link}


        


    def get_title(self, element):
        title = element.find(class_="ipc-title__text").get_text()
        title = title.split(" ")
        title = " ".join(title[1::]) 
        return title

    def get_img(self, element):
        img = element.find(class_="ipc-image")
        return img["src"]
    
    def get_description(self, element):
        desc = element.find(class_="ipc-html-content-inner-div").get_text()
        return desc
    
    def get_link(self, element):
        href = element.find(class_="ipc-lockup-overlay")["href"]
        link = "https://www.imdb.com/" + href
        return link


    