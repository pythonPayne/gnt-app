import pandas as pd

###############################################################################
###############################################################################
# NOTES
# input: .txt files from STEP repo https://github.com/STEPBible/STEPBible-Data
# output: .pkl files for Django models. See django-app/gnt/schema.py and models.py
###############################################################################
###############################################################################
print("prepping BcvIndex and Word pickles from STEP repo...")


def tagnt_to_df(filename):
    """read TAGNT txt file from Tyndale repo into pandas dataframe"""
    column_names = ['reference', 'wordType', 'greek', 'english', 'strongs', 'morphology', 'dictionaryForm', 'gloss',
                    'editions', 'spellingVariants', 'meaningVariants', 'spanish', 'subMeaning', 'superMeaning', 'conjoin', 'word']
    df = pd.read_csv(filename, sep='\t', header=None,
                     names=column_names, comment='#')
    return df.dropna(subset=['greek'])


# read GNT, word by word, from two .txt files in STEP repo -- Mat-Jhn, Act-Rev
df1 = tagnt_to_df(
    "../data/TAGNT Mat-Jhn - Translators Amalgamated Greek NT - STEPBible.org CC-BY.txt")
df2 = tagnt_to_df(
    "../data/TAGNT Act-Rev - Translators Amalgamated Greek NT - STEPBible.org CC-BY.txt")
df = pd.concat([df1, df2]).reset_index(drop=True)

# for indexing, sorting
df["id"] = df.index
df['book'] = df.reference.apply(lambda x: x.split('.')[0].split('_')[1])
df['bookNum'] = df.reference.apply(lambda x: (
    '0' + str(int(x.split('.')[0].split('_')[0])-40))[-2:])
df['chapter'] = df.reference.apply(lambda x: x.split('.')[1][-2:])
df['verse'] = df.reference.apply(lambda x: x.split('.')[2][-2:])
df['bcv'] = df.bookNum + df.chapter + df.verse
df['chapter'] = df.chapter.astype(int)
df['verse'] = df.verse.astype(int)

###############################################################################
###############################################################################
# model: BcvIndex
###############################################################################
###############################################################################
cols = ['bcv', 'book', 'chapter', 'verse']
dg = df.groupby(cols).count().reset_index()[cols].sort_values(by='bcv')
dg['bookLong'] = dg.book.apply(
    lambda x: 'Matthew' if x == 'Mat' else
              'Mark' if x == 'Mrk' else
              'Luke' if x == 'Luk' else
              'John' if x == 'Jhn' else
              'Acts' if x == 'Act' else
              'Romans' if x == 'Rom' else
              '1 Corinthians' if x == '1Co' else
              '2 Corinthians' if x == '2Co' else
              'Galatians' if x == 'Gal' else
              'Ephesians' if x == 'Eph' else
              'Philippians' if x == 'Php' else
              'Colossians' if x == 'Col' else
              '1 Thessalonians' if x == '1Th' else
              '2 Thessalonians' if x == '2Th' else
              '1 Timothy' if x == '1Ti' else
              '2 Timothy' if x == '2Ti' else
              'Titus' if x == 'Tit' else
              'Philemon' if x == 'Phm' else
              'Hebrews' if x == 'Heb' else
              'James' if x == 'Jas' else
              '1 Peter' if x == '1Pe' else
              '2 Peter' if x == '2Pe' else
              '1 John' if x == '1Jn' else
              '2 John' if x == '2Jn' else
              '3 John' if x == '3Jn' else
              'Jude' if x == 'Jud' else
              'Revelation' if x == 'Rev' else "flag"
)
dg.to_pickle("../pickles/bcvIndex.pkl")

###############################################################################
###############################################################################
# model: Word ('_id' suffix to accomodate Django model relationships)
###############################################################################
###############################################################################
df = df.rename(columns={
    "bcv": "bcvIndex_id",
    "morphology": "morphology_id",
    "strongs": "strongs_id"
}).drop(columns=['book', 'bookNum', 'chapter', 'verse'])
df['bcv'] = df.bcvIndex_id
df['nestleAland'] = df.wordType.apply(lambda x: True if x in [
                                      "=NA diff TR ˹˺", "=NA not TR ⁽⁾", "=NA same TR ~~"] else False)
df.to_pickle("../pickles/tagnt.pkl")

###############################################################################
###############################################################################
# model: Strongs (5435 unique strongs_id in NT, merging with tbesg)
###############################################################################
###############################################################################
print("prepping Strongs pickle from STEP repo...")
strongs_ids = df.groupby('strongs_id').count().reset_index(
)[['strongs_id', 'bcv']].rename(columns={'bcv': 'frequency'})
tbesg = pd.read_csv(
    "../data/TBESG - Translators Brief lexicon of Extended Strongs for Greek - STEPBible.org CC BY.txt",
    sep='\t', header=None, skiprows=64,
    names=['strongs_id', 'gloss', 'lexicon',
           'transliteration', 'grammar', 'definitionhtml'],
    comment='#',
)
df_strongs = strongs_ids.merge(tbesg, how='left', on='strongs_id')
df_strongs = df_strongs.rename(columns={
    "strongs_id": "strongs",
})
df_strongs.to_pickle("../pickles/strongs.pkl")

###############################################################################
###############################################################################
# model: Morphology
###############################################################################
###############################################################################
print("prepping Morphology pickle from STEP repo...")
filename = '../data/TEGMC - Translators Expansion of Greek Morphhology Codes - STEPBible.org CC BY.txt'
names = ['a', 'b']
df = pd.read_csv(
    filename,
    sep='\t',
    skip_blank_lines=False,
    skiprows=110,
    header=None,
    names=names,
)

# keep relevant lines
df = df.iloc[:-19]
df = df[df['a'] != '$'].reset_index(drop=True)
num_parsings = int(df.shape[0]/4)
line_list = []
for i in range(num_parsings):
    line_list.extend([1, 2, 3, 4])

df['PARSING_LINE'] = line_list

line1 = df[df['PARSING_LINE'] == 1].reset_index()[['a', 'b']]\
    .rename(columns={'a': 'MORPHOLOGY', 'b': 'LINE1'})
line2 = df[df['PARSING_LINE'] == 2].reset_index()[['b']]\
    .rename(columns={'b': 'LINE2'})
line3 = df[df['PARSING_LINE'] == 3].reset_index()[['b']]\
    .rename(columns={'b': 'LINE3'})
line4 = df[df['PARSING_LINE'] == 4].reset_index()[['b']]\
    .rename(columns={'b': 'LINE4'})

q = line1.join(line2).join(line3).join(line4)

# get all parsing pieces as separate columns
l1 = list(q['LINE1'])
cols = []
records = []
for l in l1:
    a = [i.strip() for i in l.split(';')]
    b = [i.split('=')[0] for i in a]
    c = [i.split('=')[1] for i in a]
    record = {k: v for k, v in list(zip(b, c))}
    records.append(record)
    cols.extend(b)
temp = pd.DataFrame(cols, columns=['a'])

names1 = ['Function', 'Tense', 'Voice', 'Mood', 'Person', 'Case', 'Gender', 'Number', 'Form',
          'Name type', 'Extra', 'Original language', 'Adj.Numb.', 'Indeclinable', 'Name in Original language']
names2 = ['FUNCTION', 'TENSE', 'VOICE', 'MOOD', 'PERSON', 'CASE', 'GENDER', 'NUMBER', 'FORM',
          'NAME_TYPE', 'EXTRA', 'ORIG_LANG', 'ADJ_NUMB', 'INDECLINABLE', 'NAME_IN_ORIG_LANG']
renameDict = {k: v for k, v in list(zip(names1, names2))}

r = pd.DataFrame(records)[names1].rename(columns=renameDict)
colsKeep = ['MORPHOLOGY'] + names2
z = q.join(r)[colsKeep]

z = z.rename(columns={
    "MORPHOLOGY": "morphology",
    "FUNCTION": "function",
    "TENSE": "tense",
    "VOICE": "voice",
    "MOOD": "mood",
    "PERSON": "person",
    "CASE": "case",
    "GENDER": "gender",
    "NUMBER": "number"
})

# Morphology model
z.to_pickle('../pickles/tegmc.pkl')
