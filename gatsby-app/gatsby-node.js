const path = require(`path`)

exports.createPages = ({actions}) => {

    const chapters = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
    const books = [
        {id: 1, book:'Matthew', bookShort:'Mat', numChapters: 28}, 
        {id: 2, book:'Mark', bookShort:'Mrk', numChapters: 16},
        {id: 3, book:'Luke', bookShort:'Luk', numChapters: 24},
        {id: 4, book:'John', bookShort:'Jhn', numChapters: 21},
        {id: 5, book:'Acts', bookShort:'Act', numChapters: 28},
        {id: 6, book:'Romans', bookShort:'Rom', numChapters: 16},
        {id: 7, book:'1Corinthians', bookShort:'1Co', numChapters: 16},
        {id: 8, book:'2Corinthians', bookShort:'2Co', numChapters: 13},
        {id: 9, book:'Galatians', bookShort:'Gal', numChapters: 6},
        {id: 10, book:'Ephesians', bookShort:'Eph', numChapters: 6},
        {id: 11, book:'Philippians', bookShort:'Php', numChapters: 4},
        {id: 12, book:'Colossians', bookShort:'Col', numChapters: 4},
        {id: 13, book:'1Thessalonians', bookShort:'1Th', numChapters: 5},
        {id: 14, book:'2Thessalonians', bookShort:'2Th', numChapters: 3},
        {id: 15, book:'1Timothy', bookShort:'1Ti', numChapters: 6},
        {id: 16, book:'2Timothy', bookShort:'2Ti', numChapters: 4},
        {id: 17, book:'Titus', bookShort:'Tit', numChapters: 3},
        {id: 18, book:'Philemon', bookShort:'Phm', numChapters: 1},
        {id: 19, book:'Hebrews', bookShort:'Heb', numChapters: 13},
        {id: 20, book:'James', bookShort:'Jas', numChapters: 5},
        {id: 21, book:'1Peter', bookShort:'1Pe', numChapters: 5},
        {id: 22, book:'2Peter', bookShort:'2Pe', numChapters: 3},
        {id: 23, book:'1John', bookShort:'1Jn', numChapters: 5},
        {id: 24, book:'2John', bookShort:'2Jn', numChapters: 1},
        {id: 25, book:'3John', bookShort:'3Jn', numChapters: 1},
        {id: 26, book:'Jude', bookShort:'Jud', numChapters: 1},
        {id: 27, book:'Revelation', bookShort:'Rev', numChapters: 22},
    ]
    let data = []

    books.forEach(book => (
        data = [...data,
            ...chapters.slice(0,book.numChapters).map(j => (
                {
                    'book':book.book, 
                    'bookShort':book.bookShort,
                    'chapter':j, 
                    'bcv_Gte':('0'+book.id).slice(-2)+('0'+j).slice(-2)+'00', 
                    'bcv_Lte':('0'+book.id).slice(-2)+('0'+j).slice(-2)+'99'
                }
            ))
        ]
    ))
    
    data.forEach(chapter => {       
        actions.createPage({
        path: chapter.bookShort+'-'+chapter.chapter,
        component: path.resolve(`./src/templates/chapter.js`),
        context: {        
            bcv_Gte: chapter.bcv_Gte,
            bcv_Lte: chapter.bcv_Lte
        },
        })
    })

    const numbers = [...Array(9999).keys()].map(x => x+1)

    const data2 = numbers.map(n => "G" + ("000" + n).slice(-4))        

    data2.forEach(strongs => {       
        actions.createPage({
        path: "word-" + strongs,
        component: path.resolve(`./src/templates/word.js`),
        context: {        
            strongs: strongs            
        },
        })
    })

}