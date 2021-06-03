function getFourNumberFacts(numArr) {
  const baseURL = 'http://numbersapi.com';
  const container = document.querySelector('.response-items');
  numArr.forEach(async (num) => {
    res = await axios.get(`${baseURL}/${num}`);
    let li = document.createElement('li');
    li.innerHTML = res.data;
    container.append(li);
  });
}

getFourNumberFacts([10, 43, 13, 19]);

window.onload = async function () {
  const res = await axios.get(
    'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
  );
  document.querySelector('button').addEventListener('click', async () => {
    try {
      const drawCard = await axios.get(
        `https://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`
      );
      imgsrc = drawCard.data.cards[0].image;
      remaining = drawCard.data.remaining;
      if (remaining == 0) {
        document.querySelector('button').style.display = 'none';
      } else {
        if ('content' in document.createElement('template')) {
          const container = document.querySelector('.playingCards');
          const temp = document.querySelector('.card-template');
          let clone = temp.content.cloneNode(true);
          let img = clone.querySelector('img');
          img.src = imgsrc;
          container.appendChild(clone);
        }
      }
    } catch (err) {
      console.log('Something went wrong!', err);
    }
  });
};
