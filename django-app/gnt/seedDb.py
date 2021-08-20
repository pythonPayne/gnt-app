import pandas as pd
import sqlite3

conn = sqlite3.connect('../../django-app/db.sqlite3')


def pkl_to_db(tableName, pklName, columns):
    df = pd.read_pickle(
        f"../gnt/Tyndale/pickles/{pklName}.pkl")
    df = df[columns]
    df.to_sql(tableName, conn, if_exists='replace', index=False)
    print(f"{tableName} done")


# NOTE: pickles have all possible fields from STEP repo
# this function filters out unnecessary fields and stores in sqlite db for graphql schema
pkl_to_db(
    'gnt_bcvindex',
    'bcvIndex',
    ['bcv', 'book', 'bookLong', 'chapter', 'verse'])
pkl_to_db(
    'gnt_morphology',
    'tegmc',
    ["morphology", "function", "tense", "voice",
     "mood", "person", "case", "gender", "number"])
pkl_to_db(
    'gnt_strongs',
    'strongs',
    ["strongs", "lexicon", "gloss", "transliteration", "frequency"])
pkl_to_db(
    'gnt_word',
    'tagnt',
    ["id", "greek", "english", "bcv", "nestleAland", "bcvIndex_id", "morphology_id", "strongs_id"])
