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

const arrayOfBeers: beer[] = [];
const card = document.getElementById("card");
const div = document.getElementById("beer-info");
const randomButton = document.querySelector("#random-beer");
const divsearch = document.getElementById("search-result");
const ul = divsearch.querySelector("ul");
const pagination = document.getElementById("pagination-numbers");
const noresult = document.getElementById("no-result");
getBeers();

randomButton.addEventListener("click", () => {
  const randomObject: beer = getRandomBeer();
  showCard(randomObject);
});

document.querySelector("#search").addEventListener("click", (e) => {
  e.preventDefault();
  const result = searchBeer();
  clearPrevSearchResult();

  if (result.length > 0) {
    searchResultList(result);
  } else {
    if (noresult.classList.contains("hide")) {
      noresult.classList.toggle("hide");
    }
  }
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
  if (div.classList.contains("hide")) {
    div.classList.toggle("hide");
  }

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
    if (div.classList.contains("hide") != true) {
      div.classList.toggle("hide");
    }
  });
}

function searchBeer(): beer[] {
  const searchValue = document.getElementById(
    "search-name"
  ) as HTMLInputElement;
  return arrayOfBeers.filter(
    (beer) => beer.name.toLocaleLowerCase() === searchValue.value
  );
}

function searchResultList(beers: beer[]): void {
  list10SearchResult(0, beers);
  if (beers.length > 10) {
    const numberOfpages = Math.ceil(beers.length / 10);

    for (let index = 0; index < numberOfpages; index++) {
      const element = document.createElement("p");
      element.innerHTML = (index + 1).toString();
      element.addEventListener("click", () => {
        list10SearchResult(index * 10, beers);
      });
      pagination.appendChild(element);
    }
  }
}

function list10SearchResult(indexNum: number, beers: beer[]) {
  const li = ul.querySelectorAll("li");
  li.forEach((li) => {
    if (beers[indexNum]) {
      if (li.classList.contains("hide")) {
        li.classList.toggle("hide");
      }
      li.innerHTML = beers[indexNum].name;
      li.addEventListener("click", () => {
        let beer = beers.find((b) => b.name === li.innerHTML);
        showDetails(beer);
      });
    } else {
      li.classList.add("hide");
      li.innerHTML = "";
    }
    indexNum++;
  });

  if (divsearch.classList.contains("hide")) {
    divsearch.classList.toggle("hide");
  }
}

function clearPrevSearchResult() {
  if (pagination.childNodes.length) {
    pagination.childNodes.forEach((child) => {
      child.remove();
    });
    pagination.childNodes.forEach((child) => {
      child.remove();
    });
  }
  const li = ul.querySelectorAll("li");
  li.forEach((li) => {
    if (li.classList.contains("hide") != true) {
      li.classList.add("hide");
      li.innerHTML = "";
    }
  });

  if (noresult.classList.contains("hide") != true) {
    noresult.classList.toggle("hide");
  }
}
