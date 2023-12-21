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
const arrayOfBeers = [];
const card = document.getElementById("card");
const div = document.getElementById("beer-info");
const randomButton = document.querySelector("#random-beer");
const divsearch = document.getElementById("search-result");
const ul = divsearch.querySelector("ul");
const pagination = document.getElementById("pagination-numbers");
const noresult = document.getElementById("no-result");
getBeers();
randomButton.addEventListener("click", () => {
    const randomObject = getRandomBeer();
    showCard(randomObject);
});
document.querySelector("#search").addEventListener("click", (e) => {
    e.preventDefault();
    const result = searchBeer();
    clearPrevSearchResult();
    if (result.length > 0) {
        searchResultList(result);
    }
    else {
        if (noresult.classList.contains("hide")) {
            noresult.classList.toggle("hide");
        }
    }
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
function searchBeer() {
    const searchValue = document.getElementById("search-name");
    return arrayOfBeers.filter((beer) => beer.name.toLocaleLowerCase() === searchValue.value);
}
function searchResultList(beers) {
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
function list10SearchResult(indexNum, beers) {
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
        }
        else {
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
