import pandas as pd
import sqlite3

conn = sqlite3.connect('../../backend/db.sqlite3')

def pkl_to_db(model):
    df = pd.read_pickle(f"../api/pickles/{model}.pkl")     
    df.to_sql(f'api_{model}', conn, if_exists='replace', index=False)
    print(f"api_{model} done")

pkl_to_db('pars')
pkl_to_db('lexn')
pkl_to_db('word')
pkl_to_db('book')
pkl_to_db('chap')
pkl_to_db('vers')
pkl_to_db('pdgm')
pkl_to_db('frlc')
pkl_to_db('frlb')
