import { useEffect, useState } from "react";

//card: 表示するカードのデータ
//selectedCards: 現在選択されているカードのリスト
//setselectedCards: 選択されたカードのリストを更新する
const Card = ({ card, selectedCards, setselectedCards }) => {
  //カードが表向きか裏向きかの状態
  const [isFripped, setIsFripped] = useState(false);

  const handleClick = () => {
    setselectedCards([...selectedCards, card]);
  };
  //selectedCardsが変更されるたびに実行
  useEffect(() => {
    if (
      selectedCards[0] === card ||
      selectedCards[1] === card ||
      card.isMatched
    ) {
      setIsFripped(true);
    } else {
      setIsFripped(false);
    }
  }, [selectedCards]);

  return (
    //カードの状態に応じてクラス名を変更
    <div className={isFripped ? "card open" : "card"} onClick={handleClick}>
      <div className="front">
        <img src={card.img} alt="" />
      </div>
      <div className="back"></div>
    </div>
  );
};

export default Card;
