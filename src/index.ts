interface beer {
  name: string;
  description: string;
  image_url: string;
  abv: number;
  volume: {
    value: number;
    unit: string;
  };
  ingredients: {
    hops: [
      {
        name: string;
        add: string;
        attribut: string;
        amount: { value: number; unit: string };
      }
    ];
    malt: [
      {
        name: string;
        amount: {
          value: number;
          unit: string;
        };
      }
    ];
    yeast: string;
  };
  food_pairing: string[];
  brewers_tips: string;
}

async function getBeers(): Promise<beer[]> {
  try {
    const response = await fetch("https://api.punkapi.com/v2/beers");
    console.log(response);
    if (response.status === 200) {
      const data: beer[] = await response
        .json()
        .then((beer) => beer.forEach((beer: beer) => arrayOfBeers.push(beer)));

      return data;
    } else {
      throw Error("Något gick fel, försök igen senare");
    }
  } catch (error) {
    console.log(error);
  }
}

getBeers();

const arrayOfBeers: beer[] = [];
console.log(arrayOfBeers);

const card = document.getElementById("card");
const div = document.getElementById("beer-info");

const randomButton = document.querySelector("#random-beer");
randomButton.addEventListener("click", () => {
  const randomObject: beer = getRandomBeer();
  showCard(randomObject);
});

document.querySelector("#search").addEventListener("click", (e) => {
  e.preventDefault();
  /*  const result = searchBeer();
  if (result) {
    searchResultList(result);
  } */
  searchResultList(arrayOfBeers);
});

function showCard(randomObject: beer) {
  if (card.classList.contains("hide")) {
    card.classList.toggle("hide");
  }

  const h1 = card.querySelector("h1");
  const button = card.querySelector("button");
  const img = card.querySelector("img");
  h1.innerHTML = randomObject.name;
  img.src = randomObject.image_url;
  button.addEventListener("click", () => {
    showDetails(randomObject);
  });
}

function getRandomBeer(): beer {
  return arrayOfBeers[Math.floor(Math.random() * arrayOfBeers.length)];
}

function showDetails(beer: beer) {
  if (card.classList.contains("hide") != true) {
    card.classList.toggle("hide");
  }

  randomButton.classList.toggle("hide");
  div.classList.toggle("hide");
  //lägg till info i detaljsidan
  document.getElementById("name").innerHTML = beer.name;
  document.getElementById("description").innerHTML = beer.description;
  document.getElementById("abv").innerHTML = beer.abv.toString();
  document.getElementById("volume").innerHTML =
    beer.volume.value + " " + beer.volume.unit;
  div.querySelector("img").src = beer.image_url;
  document.getElementById("food-pairing").innerHTML =
    beer.food_pairing.toString();
  document.getElementById("brewers-tips").innerHTML = beer.brewers_tips;
  div.querySelector("button").addEventListener("click", () => {
    randomButton.classList.toggle("hide");
    div.classList.toggle("hide");
  });
}

function searchBeer(): beer[] | void {
  const searchValue = document.getElementById(
    "search-name"
  ) as HTMLInputElement;
  return arrayOfBeers.filter(
    (beer) => beer.name.toLocaleLowerCase() === searchValue.value
  );
}

function searchResultList(beers: beer[]): void {
  const div = document.getElementById("search-result");
  const li = div.querySelectorAll("li");

  const pagination = document.getElementById("pagination");

  const number = Math.ceil(beers.length / 10);
  console.log(number);

  let indexBeer = 0;
  for (let index1 = 0; index1 <= number - 1; index1++) {
    const element = document.createElement("a");

    element.innerHTML = (index1 + 1).toString();
    console.log(index1);

    element.addEventListener("click", () => {
      for (let index = 0; index < 10; index++) {
        if (beers[indexBeer]) {
          li[index].innerHTML = beers[indexBeer].name;
          li[index].addEventListener("click", () => {
            showDetails(beers[index]);
          });
          indexBeer++;
        } else {
          li[index].innerHTML = "";
        }
      }
    });
    pagination.appendChild(element);
  }
}
