var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getBeer() {
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
getBeer();
const randomButton = document.querySelector("#random-beer");
randomButton.addEventListener("click", () => {
    const card = document.getElementById("card");
    const h1 = card.querySelector("h1");
    const button = card.querySelector("button");
    const img = card.querySelector("img");
    const randomObject = arrayOfBeers[Math.floor(Math.random() * arrayOfBeers.length)];
    h1.innerHTML = randomObject.name;
    img.src = randomObject.image_url;
});
