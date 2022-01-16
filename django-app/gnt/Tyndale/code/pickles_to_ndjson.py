import pandas as pd
    
###############################################################################
###############################################################################
# ntword
###############################################################################
###############################################################################
df = pd.read_pickle("../pickles/tagnt.pkl")
df['_type'] = 'ntword'
df = df.rename(columns={'strongs_id':'strongs','morphology_id':'morphology'})

bcv = list(df.bcv)
bcvw = ['01010101']
i = 1
bcv_ = '010101'
for item in bcv[1:]:
    if item == bcv_:
        i += 1
    else:
        i = 1
    w = ('0' + str(i))[-2:]
    bcvw.append(item+w)
    bcv_ = item

df['_id'] = bcvw

def get_ref(x):    
    return {"_type": "reference", "_ref": x.replace('+','-').replace(' ','')}

df['strongs'] = df.strongs.apply(lambda x: get_ref(x))
df['morphology'] = df.morphology.apply(lambda x: get_ref(x))

df = df[[       
    '_id', 
    '_type',    
    'greek',
    'english',
    'nestleAland',
    'bcv',
    'strongs',
    'morphology',
]].fillna("")

df = df[(df.bcv > '060000') & (df.bcv < '070000')]
df.to_json("../ndjsons/ntword.ndjson",
           orient="records",
           force_ascii=False,
           lines=True)
###############################################################################
###############################################################################
# strongs
###############################################################################
###############################################################################
df = pd.read_pickle("../pickles/strongs.pkl")
df['_type'] = 'strongs'
df['_id'] = df['strongs']
df['_id'] = df._id.apply(lambda x: x.replace('+','-'))
df['title'] = df['_id']
df = df[[        
    '_id',
    '_type',        
    'title',
    'lexicon',
    'gloss',
    'transliteration',
    'frequency',    
]]
df.lexicon = df.lexicon.fillna("")
df.gloss = df.gloss.fillna("")
df.transliteration = df.transliteration.fillna("")
df.frequency = df.frequency.fillna(0)
df.to_json("../ndjsons/strongs.ndjson",
           orient="records",
           force_ascii=False,
           lines=True)
###############################################################################
###############################################################################
# morphology
###############################################################################
###############################################################################
df = pd.read_pickle("../pickles/tegmc.pkl")
df['_type'] = 'morphology'
df['_id'] = df['morphology']
df['_id'] = df._id.apply(lambda x: x.replace('+','-'))
df['_id'] = df._id.apply(lambda x: x.replace(' ',''))
df['title'] = df['_id']
df = df[[        
    '_id',
    '_type',        
    "title",
    "function", 
    "tense", 
    "voice",
    "mood",
    "person",
    "case",
    "gender",
    "number"
]].fillna("")
df.to_json("../ndjsons/morphology.ndjson",
           orient="records",
           force_ascii=False,
           lines=True)           