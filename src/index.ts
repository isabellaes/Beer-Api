interface beer {
  name: string;
  description: string;
  image_url: string;
  abv: number;
  volume: {
    value: number;
    unit: string;
  };
  ingredients: [
    {
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
    }
  ];
  food_pairing: string[];
  brewers_tips: string;
}

async function getBeer(): Promise<beer[]> {
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
getBeer();

const randomButton = document.querySelector("#random-beer");
randomButton.addEventListener("click", () => {
  const card = document.getElementById("card");
  const h1 = card.querySelector("h1");
  const button = card.querySelector("button");
  const img = card.querySelector("img");

  const randomObject =
    arrayOfBeers[Math.floor(Math.random() * arrayOfBeers.length)];
  h1.innerHTML = randomObject.name;
  img.src = randomObject.image_url;
});
