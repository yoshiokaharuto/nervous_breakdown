import Card from "./Cards";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./Main.css";

function LevelSelector({ setLevel }) {
  const handleClick = (level) => {
    setLevel(level);
    console.log("選択されたレベル:", level);
  };
  return (
    <div className="level-selector">
      <button onClick={() => handleClick("easy")}>Easy</button>
      <button onClick={() => handleClick("medium")}>Medium</button>
      <button onClick={() => handleClick("hard")}>Hard</button>
    </div>
  );
}

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

  const [level, setLevel] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCards, setselectedCards] = useState([]); //クリックしたカードの管理
  const [tries, setTries] = useState(0);

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
    if (level) {
      console.log("ゲーム開始時のレベル:", level); // デバッグ用
      shuffleImgs(level);
    } else {
      console.log("レベルが選択されていません");
    }
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondPassed = 0;
  if (startTime != null && now != null) {
    secondPassed = (now - startTime) / 1000;
  }

  const shuffleImgs = (level) => {
    console.log("呼び出された");
    let numPairs;
    if (level === "easy") numPairs = 4; // 4ペア
    if (level === "medium") numPairs = 6; // 6ペア
    if (level === "hard") numPairs = 8; // 8ペア

    console.log("選択されたペア数", numPairs);
    let selectedImgs = imgs.slice(0, numPairs); // レベルに応じてカードの数を選択
    let shuffledImgs = [...selectedImgs, ...selectedImgs] // 2枚ずつ
      .map((item, index) => ({ ...item, id: index + 1 }))
      .sort(() => 0.5 - Math.random());

    console.log("シャッフル後のカード:", shuffledImgs); // デバッグ用ログ
    setCards(shuffledImgs);
  };

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
    if (allMatched && tries <= 8) {
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
      if (tries >= 8) {
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

  return (
    <div className="body">
      {!level ? (
        <LevelSelector setLevel={setLevel} />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default Main;
