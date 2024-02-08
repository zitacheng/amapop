export const API_URL = "http://192.168.1.49:1337";

export const popsSerie = [
    {id: 0, name: 'Labubu', selected: false},
    {id: 1, name: 'Azura', selected: false},
    {id: 2, name: 'SkullPanda', selected: false},
    {id: 3, name: 'Hirono', selected: false},
    {id: 4, name: 'Nori', selected: false},
    {id: 5, name: 'Molly', selected: false},
    {id: 6, name: 'Hapuchichi', selected: false},
    {id: 7, name: 'Cry Baby', selected: false},
    {id: 8, name: 'Dimoo', selected: false},
    {id: 9, name: 'Conan', selected: false},
    {id: 10, name: 'League of ledengs', selected: false},
    {id: 11, name: 'Pucky', selected: false},
    {id: 12, name: 'Naruto', selected: false},
    {id: 13, name: 'Disney', selected: false},
    {id: 14, name: 'Minions', selected: false},
    {id: 15, name: 'Pino Jelly', selected: false},
    {id: 16, name: 'Zsiga', selected: false},
    {id: 17, name: 'Hacipupu', selected: false},
    {id: 18, name: 'Teletubbies', selected: false},
    {id: 19, name: 'Friends', selected: false},
    {id: 20, name: 'Bob eponge', selected: false},
    {id: 21, name: 'Garfield', selected: false},
    {id: 22, name: 'Peach riot', selected: false},
    {id: 23, name: 'Spy x Family', selected: false},
    {id: 24, name: 'Duckoo', selected: false},
    {id: 25, name: 'Kubo', selected: false},
    {id: 26, name: 'Harry potter', selected: false},
    {id: 27, name: 'Lilios', selected: false},
    {id: 28, name: 'Astro boy', selected: false},
    {id: 29, name: 'Casper', selected: false},
    {id: 30, name: 'Ultraman', selected: false},
    {id: 31, name: 'Kiwiwi', selected: false},
    {id: 32, name: 'Yoseku ueno', selected: false},
    {id: 33, name: 'My little poeny', selected: false},
    {id: 34, name: 'Casper', selected: false},
    {id: 35, name: 'vita', selected: false},
    {id: 36, name: 'satyr rory', selected: false},
    {id: 37, name: 'fubobo', selected: false},
    {id: 38, name: 'Duckyo', selected: false},
  ];


export function stateSentence(state) {
    switch (state) {
      case "looking":
        return "Statue: Je recherche ce modèle";
      case "change":
        return "Statue: À échanger";
      case "booked":
        return "Statue: Ce modèle est éservé";
      default:
        return "";
    }
  }