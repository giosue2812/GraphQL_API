const authors = [
    { id: 1, name: 'J. K. Rowling' },
    { id: 2, name: 'J. R. R. Tolkien' },
    { id: 3, name: 'Brent Weeks' }
];

const books = [
    { id: 1, titre: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
    { id: 2, titre: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
    { id: 3, titre: 'Harry Potter and the Goblet of Fire', authorId: 1 },
    { id: 4, titre: 'The Fellowship of the Ring', authorId: 2 },
    { id: 5, titre: 'The Two Towers', authorId: 2 },
    { id: 6, titre: 'The Return of the King', authorId: 2 },
    { id: 7, titre: 'The Way of Shadows', authorId: 3 },
    { id: 8, titre: 'Beyond the Shadows', authorId: 3 }
];

module.exports = {authors,books}
