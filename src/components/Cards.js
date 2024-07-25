import { useEffect, useState } from "react";

const Card = ({ card, selectedCards, setselectedCards }) => {
  const [isFripped, setIsFripped] = useState(false);

  const handleClick = () => {
    setselectedCards([...selectedCards, card]);
  };
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
    <div className={isFripped ? "card open" : "card"} onClick={handleClick}>
      <div className="front">
        <img src={card.img} alt="" />
      </div>
      <div className="back"></div>
    </div>
  );
};

export default Card;
