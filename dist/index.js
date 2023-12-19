var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getBeers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://api.punkapi.com/v2/beers");
            console.log(response);
            if (response.status === 200) {
                const data = yield response
                    .json()
                    .then((beer) => beer.forEach((beer) => arrayOfBeers.push(beer)));
                return data;
            }
            else {
                throw Error("Något gick fel, försök igen senare");
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
getBeers();
const arrayOfBeers = [];
console.log(arrayOfBeers);
const card = document.getElementById("card");
const div = document.getElementById("beer-info");
const randomButton = document.querySelector("#random-beer");
randomButton.addEventListener("click", () => {
    const randomObject = getRandomBeer();
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
function showCard(randomObject) {
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
function getRandomBeer() {
    return arrayOfBeers[Math.floor(Math.random() * arrayOfBeers.length)];
}
function showDetails(beer) {
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
function searchBeer() {
    const searchValue = document.getElementById("search-name");
    return arrayOfBeers.filter((beer) => beer.name.toLocaleLowerCase() === searchValue.value);
}
function searchResultList(beers) {
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
                }
                else {
                    li[index].innerHTML = "";
                }
            }
        });
        pagination.appendChild(element);
    }
}
