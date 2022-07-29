import time
import pandas as pd
from duckdb import query
import requests
import pandas as pd
from bs4 import BeautifulSoup
import concurrent.futures
pd.options.display.max_columns = 200
pd.options.display.max_rows = 500
pd.set_option('mode.chained_assignment', None)

def get_df(a,b):
    t0 = time.time() 
    print(f"starting {a} to {b}")
    strongs = []
    greekWordList = []
    definitionList = []
    usageList = []
    for i in range(a,b+1):
                
        url = 'https://biblehub.com/greek/' + str(i) + '.htm'
        try:
            page = requests.get(url, timeout=10)
            soup = BeautifulSoup(page.content,'html.parser')
            leftbox = soup.find("div",{'id':"leftbox"})
            try:
                original_word = leftbox.text.split('Original Word: ')[1].split('Part of Speech:')[0].split('Transliteration:')[0].split('Phonetic Spelling:')[0]
            except:
                original_word = ""
            try:
                definition = leftbox.text.split('Definition: ')[1].split('Usage:')[0].split('HELPS Word-studies')[0]
            except:
                definition = ""
            try:
                usage = leftbox.text.split('Usage: ')[1].split('HELPS Word-studies')[0]                
            except:
                usage = ""
        except:
            pass
        
        strongs.append(('000'+str(i))[-4:])
        greekWordList.append(original_word)
        definitionList.append(definition)
        usageList.append(usage)
    temp = pd.DataFrame(list(zip(strongs, greekWordList, definitionList, usageList)), columns=['lexn_strongs','greek', 'definition','usage'])    
    
    print(f"Total time {a} to {b}: {round(time.time()-t0,2)} seconds")    
    return temp

def main():   
    t0 = time.time() 
    a = [x for x in range(1,5625,725)]
    b = [x+724 for x in range(1,5625,725)]
    b[-1] = 5625

    with concurrent.futures.ProcessPoolExecutor() as executor:
        results = executor.map(get_df, a, b)
    
    df = pd.concat([r for r in results]).sort_values('lexn_strongs')
    df.to_pickle('../../pickles/lexnalt.pkl')

    print(df)

    print(f"Total time: {round(time.time()-t0,2)} seconds")    

if __name__ == '__main__':
    main()        