import roots from '../img/roots.png';
import torch from '../img/torch.png';
import React, { useContext, useState, useEffect } from 'react';
import { GameContext } from '../GameContext';


const rootsData = [{
  "author": "Walt Whitman, from Leaves of Grass",
  "content":
  [
    "I wish I could translate the hints about the dead young men and women",
    "And the hints about old men and mothers, and the offspring taken soon out of their laps",
    "What do you think has become of the young and old men? ",
    "And what do you think has become of the women and children?",
    "",
    "They are alive and well somewhere,",
    "The smallest sprout shows there is really no death,",
    "And if ever there was it led forward life, and does not wait at the end to arrest it,",
    "And ceas'd the moment life appear'd.",  
    "",
    "All goes onward and outward, nothing collapses,",
    "And to die is different from what any one supposed, and luckier."
  ],
  "citationLink": "https://poets.org/poem/song-myself-6-child-said-what-grass"
}, {
  "author": "刘少明 (Liu Shaoming)",
  "content": [
    "In 2017, Liu Shaoming was sentenced to 4.5 years in prison for publishing a blog post reflecting on the impact of his participation in the June 4th protests on his life, from which the below statements are excerpted.",
    "",
    "社会大转型到来的那天，我会潜心著作，如实记录国家人民和个人历史。在这场伟大的社会运动中，我学了很多，认知了很多，也思考了很多，把很多很多付之践行，无愧的说，我尽力了!",
    "When the day of great social transformation arrives, I will dedicate myself to writing, faithfully recording the history of the nation, its people, and my own experiences. In this great social movement, I have learned a lot, recognized a lot, thought a lot, and have put so many of my beliefs into practice such that I can say with a clear conscience: “I have worked hard!\"",
    "",
    "人生心灵之旅，无私无欲，朝着坚定的信仰，迈着脚步向前行是没有人可以阻挡的了的!",
    "No one can hinder the human spirit in its steady, forward march when it is grounded in selfless detachment and led by firm beliefs.",
    "",
    "失败不是灾难，它经过时间的励炼，是积累的厚福",
    "Failure is not a disaster; through the tempering of time, it becomes a profound blessing accumulated."
  ],
  "citationLink": "https://www.chinesepen.org/blog/archives/33271"

}]
const styles = {
  base: {
    "background-image": `url(${roots})`,
    "width": "800px",
    "height": "482px"
  }
}


const CONSTANTS = {
  BASE: "BASE",
  SPLATTERS: [
    ["SPLATTER_ONE", torch],
    ["SPLATTER_TWO", torch]
  ]
}

styles[CONSTANTS.SPLATTERS[0][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "12px",
}
styles[CONSTANTS.SPLATTERS[1][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "475px",
}

styles["ICON_SIZE"] = {
  "height": "42px",
  "width": "30px",
  "top": "325px",
}

styles["CENTER"] = {
  textAlign: "center",
  fontFamily: "Dancing Script, cursive"
}

styles["RIGHT"] = {
  textAlign: "right",
  fontFamily: "Courier Prime, monospace",
  display: "block"
}

styles["POETRY"] = {
  margin: "0px 2px",
  textIndent: "-10px"
}

styles["TEXT_BOX"] = {
  backgroundColor: 'rgba(0, 0, 0, 0.8)', // Black background with 80% opacity
  color: 'white', // White text color
  padding: '20px', // Add some padding inside the container
  borderRadius: '8px', // Adds rounded corners
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Adds a subtle shadow
  maxWidth: '90%', // Ensure the container doesn't exceed the width of its parent
  margin: '10px auto', // Center the container horizontally
  fontSize: "14px",
  fontFamily: "Raleway, sans-serif"
};


function Roots() {
  const { setRootsText } = useContext(GameContext);
  const [splatteredIndex, setSplatteredIndex] = useState(null);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [fadeClass, setFadeClass] = useState("fade-in");


  useEffect(() => {
    if (fadeClass === "fade-out") {
      const timer = setTimeout(() => {
        setFadeClass("fade-in");
      }, 500); // Time matches fade-out animation duration
      return () => clearTimeout(timer);
    }
  }, [fadeClass]);

  const handleFigureClick = (index) => {
    if (splatteredIndex !== index) {
      setFadeClass("fade-out"); // Start fade-out animation
      setTimeout(() => {
        setSplatteredIndex(index); // Update content
        setFadeClass("fade-in"); // Trigger fade-in animation
        setRootsText(
          <div style={{ ...styles.TEXT_BOX, opacity: 0 }} className={fadeClass}>
            <h2 style={styles.CENTER}> Translated Hints</h2>
            {renderContent(rootsData[index].content)}
            <a style={styles.RIGHT} href={rootsData[index].citationLink} target="_blank">{rootsData[index].author}</a>
          </div>
        );
      }, 500); // Delay re-render until fade-out is complete
    }
  };



  const renderContent = (contentArray) => {
    return contentArray.map(paragraph => {
      if (paragraph === "") return <br />
      return <p style={styles["POETRY"]}>{paragraph}</p>
    })
  }

  function renderPlaceholderSplatters() {
    return CONSTANTS.SPLATTERS.map((splatterStyle, index) => (
        <div
          key={index}
          style={{...styles[splatterStyle[0]], ...styles["ICON_SIZE"]}}
          onClick={() => handleFigureClick(index)}
          >
            {splatteredIndex === index && (
              <img src={splatterStyle[1]} alt="Blood Splatter" className="blood-splatter fade-in" />
            )}
            {previousIndex === index && (
              <img src={splatterStyle[1]} alt="Blood Splatter" className="blood-splatter fade-out" />
            )}
        </div>
    ))
  }


  return (
      <div style={styles.base}>
        {renderPlaceholderSplatters()}
      </div>
  );
}

export default Roots;
