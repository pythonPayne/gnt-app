const path = require(`path`)

exports.createPages = ({actions}) => {

    const chapters = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
    const books = [
        {id: 1, bookNameAbbrev:'Mat', numChapters: 28}, 
        {id: 2, bookNameAbbrev:'Mrk', numChapters: 16},
        {id: 3, bookNameAbbrev:'Luk', numChapters: 24},
        {id: 4, bookNameAbbrev:'Jhn', numChapters: 21},
        {id: 5, bookNameAbbrev:'Act', numChapters: 28},
        {id: 6, bookNameAbbrev:'Rom', numChapters: 16},
        {id: 7, bookNameAbbrev:'1Co', numChapters: 16},
        {id: 8, bookNameAbbrev:'2Co', numChapters: 13},
        {id: 9, bookNameAbbrev:'Gal', numChapters: 6},
        {id: 10, bookNameAbbrev:'Eph', numChapters: 6},
        {id: 11, bookNameAbbrev:'Php', numChapters: 4},
        {id: 12, bookNameAbbrev:'Col', numChapters: 4},
        {id: 13, bookNameAbbrev:'1Th', numChapters: 5},
        {id: 14, bookNameAbbrev:'2Th', numChapters: 3},
        {id: 15, bookNameAbbrev:'1Ti', numChapters: 6},
        {id: 16, bookNameAbbrev:'2Ti', numChapters: 4},
        {id: 17, bookNameAbbrev:'Tit', numChapters: 3},
        {id: 18, bookNameAbbrev:'Phm', numChapters: 1},
        {id: 19, bookNameAbbrev:'Heb', numChapters: 13},
        {id: 20, bookNameAbbrev:'Jas', numChapters: 5},
        {id: 21, bookNameAbbrev:'1Pe', numChapters: 5},
        {id: 22, bookNameAbbrev:'2Pe', numChapters: 3},
        {id: 23, bookNameAbbrev:'1Jn', numChapters: 5},
        {id: 24, bookNameAbbrev:'2Jn', numChapters: 1},
        {id: 25, bookNameAbbrev:'3Jn', numChapters: 1},
        {id: 26, bookNameAbbrev:'Jud', numChapters: 1},
        {id: 27, bookNameAbbrev:'Rev', numChapters: 22},
    ]
    let data = []

    // books.filter(book => book.id === 4).forEach(book => (
    books.forEach(book => (        
        data = [...data,
            ...chapters.slice(0,book.numChapters).map(j => (
                {                    
                    'bookNameAbbrev':book.bookNameAbbrev,
                    'chapter':j, 
                    'chapId':('0'+book.id).slice(-2)+('0'+j).slice(-2),                    
                }
            ))
        ]
    ))
    
    data.forEach(chapter => {       
        actions.createPage({
        path: chapter.bookNameAbbrev+'-'+chapter.chapter,
        component: path.resolve(`./src/templates/chapter.js`),
        context: {        
            chapId: chapter.chapId,            
            defer: true,
        }        
        })
    })

    const lexnIds = [...Array(5390).keys()].map(n => ("000" + n).slice(-4))    
    lexnIds.forEach(lexnId => {       
        actions.createPage({
        path: "word-" + lexnId,
        component: path.resolve(`./src/templates/word.js`),
        context: {        
            lexnId: lexnId,        
            defer: true,
        }        
        })
    })

}
