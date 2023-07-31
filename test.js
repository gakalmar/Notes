let bestSellingAlbums = [
  {
      artist: "Michael Jackson",
      title: "Thriller",
      year: 1982,
      genres: ["pop", "post-disco", "funk", "rock"],
      sale: 70000000,
  },
  {
      artist: "AC/DC",
      title: "Back in Black",
      year: 1980,
      genres: ["hard rock"],
      sale: 50000000,
  },
  {
      artist: "Whitney Houston",
      title: "The Bodyguard",
      year: 1992,
      genres: ["r&b", "soul", "pop", "soundtrack"],
      sale: 45000000,
  },
  {
      artist: "Pink Floyd",
      title: "The Dark Side of the Moon",
      year: 1973,
      genres: ["progressive rock"],
      sale: 45000000,
  },
  {
      artist: "Eagles",
      title: "Their Greatest Hits (1971 - 1975)",
      year: 1976,
      genres: ["country rock", "soft rock", "folk rock"],
      sale: 44000000,
  },
  {
      artist: "Eagles",
      title: "Hotel California",
      year: 1976,
      genres: ["soft rock"],
      sale: 42000000,
  },
  {
      artist: "Shania Twain",
      title: "Come On Over",
      year: 1997,
      genres: ["country", "pop"],
      sale: 40000000,
  },
  {
      artist: "Fleetwood Mac",
      title: "Rumours",
      year: 1977,
      genres: ["soft rock"],
      sale: 40000000,
  },
];

// DO NOT MODIFY THE CODE ABOVE THIS LINE
// WRITE YOUR CODE BELOW THIS LINE



//1 Calculate average sales income:
let averageSale = (bestSellingAlbums[0].sale + bestSellingAlbums[1].sale + bestSellingAlbums[2].sale + bestSellingAlbums[3].sale + bestSellingAlbums[4].sale + bestSellingAlbums[5].sale + bestSellingAlbums[6].sale + bestSellingAlbums[7].sale) / bestSellingAlbums.length
//TEST RESULT console.log(averageSale);


//2 Calculate average age:
let currentYear = 2023;
let averageAge = ((currentYear - bestSellingAlbums[0].year) + (currentYear - bestSellingAlbums[1].year) + (currentYear - bestSellingAlbums[2].year) + (currentYear - bestSellingAlbums[3].year) + (currentYear - bestSellingAlbums[4].year) + (currentYear - bestSellingAlbums[5].year) + (currentYear - bestSellingAlbums[6].year) + (currentYear - bestSellingAlbums[7].year)) / bestSellingAlbums.length;
//TEST RESULT console.log(averageAge);


//3 Newest and oldes album:
let newestAlbum = bestSellingAlbums[6];
let oldestAlbum = bestSellingAlbums[3];
//TEST RESULT console.log(newestAlbum, oldestAlbum);


//4 Albums of Eagles:
let albumsOfEagles = {
  sales: bestSellingAlbums[4].sale + bestSellingAlbums[5].sale,
  isBothSofTock: bestSellingAlbums[4].genres[1] === bestSellingAlbums[5].genres[0]
}
//TEST RESULT console.log(bestSellingAlbums[4].genres[1] === bestSellingAlbums[5].genres[0]);


//5 Add an extra album:
bestSellingAlbums[8] = {
  artist: "Blink 182",
  title: "Take Off Your Pants And Jacket",
  year: 2001,
  genres: ["Pop-punk", "Punk Rock"],
  sale: 14000000,
}
//TEST RESULT console.log(bestSellingAlbums[8]);


//6 Like it or not
bestSellingAlbums[0].iLikeIt = true;
bestSellingAlbums[1].iLikeIt = true;
bestSellingAlbums[2].iLikeIt = false;
bestSellingAlbums[3].iLikeIt = true;
bestSellingAlbums[4].iLikeIt = true;
bestSellingAlbums[5].iLikeIt = true;
bestSellingAlbums[6].iLikeIt = false;
bestSellingAlbums[7].iLikeIt = true;
bestSellingAlbums[8].iLikeIt = true;
//TEST RESULT console.log(bestSellingAlbums);



// DO NOT MODIFY THE CODE BELOW THIS LINE
let toExport;

try {
toExport = [
  {name: "averageSale", content: averageSale, type: "number"},
      {name: "averageAge", content: averageAge, type: "number"},
      {name: "newestAlbum", content: newestAlbum, type: "object"},
      {name: "oldestAlbum", content: oldestAlbum, type: "object"},
      {name: "albumsOfEagles", content: albumsOfEagles, type: "object"}
]
} catch (error) {
toExport = {error: error.message}
}

export {toExport};
