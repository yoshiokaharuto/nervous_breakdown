import Card from "./Cards";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./Main.css";

function Main() {
  let imgs = [
    {
      num: 1,
      img: "img/luffy.png",
      isMatched: false,
    },
    {
      num: 2,
      img: "img/zoro.png",
      isMatched: false,
    },
    {
      num: 3,
      img: "img/sanji.png",
      isMatched: false,
    },
    {
      num: 4,
      img: "img/chopper.png",
      isMatched: false,
    },
    {
      num: 5,
      img: "img/santaisyou.png",
      isMatched: false,
    },
    {
      num: 6,
      img: "img/arlong.png",
      isMatched: false,
    },
    {
      num: 7,
      img: "img/jinbe.png",
      isMatched: false,
    },
    {
      num: 8,
      img: "img/brook.png",
      isMatched: false,
    },
  ];

  //タイマー用
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now);
    setNow(Date.now);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }
  function handleStop() {
    clearInterval(intervalRef.current);
  }
  let secondPassed = 0;
  if (startTime != null && now != null) {
    secondPassed = (now - startTime) / 1000;
  }

  const [cards, setCards] = useState([]);
  const [selectedCards, setselectedCards] = useState([]); //クリックしたカードの管理
  const [tries, setTries] = useState(0);

  const shuffleImgs = () => {
    let shuffledImgs = [...imgs, ...imgs] //2枚ずつ
      .map((item, index) => ({ ...item, id: index + 1 }))
      .sort((a, b) => 0.5 - Math.random());

    setCards(shuffledImgs);
  };

  useEffect(() => {
    shuffleImgs();
  }, []);

  useEffect(() => {
    if (selectedCards.length === 2) {
      setTimeout(() => {
        setselectedCards([]);
      }, 1000);
      checkMath();
    }
  }, [selectedCards]);

  useEffect(() => {
    if (cards.length === 0) return;

    const allMatched = cards.every((card) => card.isMatched);
    if (allMatched && tries <= 5) {
      setTimeout(() => {
        handleStop();
        alert(
          "ゲームクリア!\n 時間: " +
            secondPassed.toFixed(3) +
            "秒\n ミス回数: " +
            tries +
            "回"
        );
      }, 500);
    }
  }, [cards]);

  //カードがそろっているかを判別する
  const checkMath = () => {
    if (selectedCards[0].num === selectedCards[1].num) {
      let updatedCards = cards.map((card) => {
        if (card.num === selectedCards[0].num) {
          return { ...card, isMatched: true };
        }
        return card;
      });
      setCards(updatedCards);
    } else {
      setTries((prev) => prev + 1);
      //triesがある回数を超えたらゲームオーバー
      if (tries >= 5) {
        setTimeout(() => {
          handleStop();
          alert("ゲームオーバー");
        }, 500);

        let allOpenCards = cards.map((card) => {
          return { ...card, isMatched: true };
        });
        setCards(allOpenCards);
      }
    }
  };
  console.log(cards);
  return (
    <div>
      <p>{secondPassed.toFixed(3)}</p>
      <button className="button" onClick={handleStart}>
        スタート
      </button>
      <div className="container">
        <div className="cards-container">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              selectedCards={selectedCards}
              setselectedCards={setselectedCards}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
