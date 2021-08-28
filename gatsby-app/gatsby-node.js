const path = require(`path`)

exports.createPages = ({actions}) => {

    const chapters = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
    const books = [
        // {id: 1, book:'Matthew', numChapters: 28}, 
        // {id: 2, book:'Mark', numChapters: 16},
        // {id: 3, book:'Luke', numChapters: 24},
        {id: 4, book:'John', numChapters: 21},
        // {id: 5, book:'Acts', numChapters: 28},
        // {id: 6, book:'Romans', numChapters: 16},
        // {id: 7, book:'1Corinthians', numChapters: 16},
        // {id: 8, book:'2Corinthians', numChapters: 13},
        // {id: 9, book:'Galatians', numChapters: 6},
        // {id: 10, book:'Ephesians', numChapters: 6},
        // {id: 11, book:'Philippians', numChapters: 4},
        // {id: 12, book:'Colossians', numChapters: 4},
        // {id: 13, book:'1Thessalonians', numChapters: 5},
        // {id: 14, book:'2Thessalonians', numChapters: 3},
        // {id: 15, book:'1Timothy', numChapters: 6},
        // {id: 16, book:'2Timothy', numChapters: 4},
        // {id: 17, book:'Titus', numChapters: 3},
        // {id: 18, book:'Philemon', numChapters: 1},
        // {id: 19, book:'Hebrews', numChapters: 13},
        // {id: 20, book:'James', numChapters: 5},
        // {id: 21, book:'1Peter', numChapters: 5},
        // {id: 22, book:'2Peter', numChapters: 3},
        // {id: 23, book:'1John', numChapters: 5},
        // {id: 24, book:'2John', numChapters: 1},
        // {id: 25, book:'3John', numChapters: 1},
        // {id: 26, book:'Jude', numChapters: 1},
        // {id: 27, book:'Revelation', numChapters: 22},
    ]
    let data = []

    books.forEach(book => (
        data = [...data,
            ...chapters.slice(0,book.numChapters).map(j => (
                {
                    'book':book.book, 
                    'chapter':j, 
                    'bcv_Gte':('0'+book.id).slice(-2)+('0'+j).slice(-2)+'00', 
                    'bcv_Lte':('0'+book.id).slice(-2)+('0'+j).slice(-2)+'99'
                }
            ))
        ]
    ))
    
    data.forEach(chapter => {       
        actions.createPage({
        path: chapter.book+'-'+chapter.chapter,
        component: path.resolve(`./src/templates/chapter.js`),
        context: {        
            bcv_Gte: chapter.bcv_Gte,
            bcv_Lte: chapter.bcv_Lte
        },
        })
    })

    // const numbers = [...Array(9999).keys()].map(x => x+1)

    // const data2 = numbers.map(n => "G" + ("000" + n).slice(-4))        

    // data2.forEach(strongs => {       
    //     actions.createPage({
    //     path: "word-" + strongs,
    //     component: path.resolve(`./src/templates/word.js`),
    //     context: {        
    //         strongs: strongs            
    //     },
    //     })
    // })

}