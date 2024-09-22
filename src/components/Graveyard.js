import React, {useEffect, useState, useRef, useCallback, useContext} from 'react';
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  MapCameraChangedEvent,
  Pin,
  InfoWindow
} from '@vis.gl/react-google-maps';
import {MarkerClusterer} from '@googlemaps/markerclusterer';

import graveyard from '../img/graveyard.png';
import hand from '../img/hand.png';
import { GameContext } from '../GameContext';
import MapComponent from './Map';

import zhaoLong from '../img/ZHAO_Long_01.jpg';
import shiYan from '../img/SHI_Yan_01.jpg';
import xiaoBo from '../img/xiaobo.png';
import chengRenXing from '../img/CHENG_Renxing_01.jpg';
import suXin from '../img/SuXin.jpg';
import xiGuiRu from '../img/XI_Guiru_01.jpg';
import zhangXiangHong from '../img/ZHANG_Xianghong_01.jpg';

const CONSTANTS = {
  BASE: "BASE",
  SPLATTERS: [
    ["SPLATTER_ONE", hand],
    ["SPLATTER_TWO", hand],
    ["SPLATTER_THREE", hand],
    ["SPLATTER_FOUR", hand],
    ["SPLATTER_FIVE", hand],
    ["SPLATTER_SIX", hand],
    ["SPLATTER_SEVEN", hand]

  ]
}

const styles = {}


styles[CONSTANTS.SPLATTERS[0][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "10px",
}
styles[CONSTANTS.SPLATTERS[1][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "80px",
}
styles[CONSTANTS.SPLATTERS[2][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "158px",
}
styles[CONSTANTS.SPLATTERS[3][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "233px",
}
styles[CONSTANTS.SPLATTERS[4][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "403px",
}
styles[CONSTANTS.SPLATTERS[5][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "465px",
}
styles[CONSTANTS.SPLATTERS[6][0]] = {
  "position": "relative",
  "display": "inline-block",
  "left": "605px",
}
// Map center coordinates (Tiananmen Square)
const center = {
  lat: 39.9087, // Latitude for Tiananmen Square
  lng: 116.3974, // Longitude for Tiananmen Square
};


styles[CONSTANTS.BASE] = {
    "background-image": `url(${graveyard})`,
    "width": "800px",
    "height": "168px"
};
styles["ICON_SIZE"] = {
  "height": "40px",
  "width": "25px",
  "top": "115px",
  "cursor": "pointer"
}

styles["MAP_STYLE"] = {
  "position": "relative",
  "height": "266px",
  "width": "800px",
  "top": "125px"
}

styles["CENTER"] = {
  textAlign: "center",
  fontFamily: "Crimson Text, serif",
  fontStyle: "italic"
}

styles["RIGHT"] = {
  display: "block",
  textAlign: "right",
  fontFamily: "Courier Prime, monospace"
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

styles["IMAGE"] = {
  width: "75px",
  float: "left",
  marginRight: "15px"
}

const motherSonData = [
  {
    mother: "苏冰娴 (Su Bingxian) and 赵廷杰 (Zhao Tingjie)",
    lat: 39.90718344969694, 
    lng: 116.37630390257877,
    son:  "赵龙 (Zhao Long)",
    story: ['In mid May 1989, Zhao Long was working at Longfu Market. Beijing was not quiet that month. Millions of students and citizens had started protests and rallies against corruption and for democracy. Zhao Long and his friends at the Market were concerned about this movement. They marched in the streets several times. After work, he often went to see his college-students friends on Tiananmen Square, bringing them food and water. One night after martial law was imposed in Beijing, I told him, "Longlong, don\'t go to the rallies any more, and don\'t go to Tiananmen Square. You are too young, you don\'t know how to protect yourself." He said, "Ma, don\'t worry. I only want to be a witness to history."',],
    death: "On June 4, at around 2 a.m., on West Chang’an Avenue between the Cultural Palace of Nationalities and Liubukou, Zhao was hit in the chest by three bullets... His father, Zhao Tingjie (赵廷杰), and his mother, Su Bingxian (苏冰娴), both deceased, were key members of the Tiananmen Mothers.",
    link: "https://truth30.hrichina.org/zhao_long.html",
    image: zhaoLong
  },
  {
    mother: "韩淑香 (Han Shuxiang) and  石峰 (Shi Feng),",
    lat: 39.9074258392074,
    lng: 116.3566529153439,
    son: "Shi Yan（石岩）",
    story: ['From a 1999 interview with Shi Yan\'s surviving family:',
      '"When Shi Yan died, the children did not tell their parents. They hid this information for five years, afraid that their parents would not be able to withstand the blow... After his father, Shi Feng, found out, this already introverted man could not deal with the suffering. To let out his grief, he frequently traveled to the ocean’s edge to cry. He fell ill under enormous psychological stress. His illness took over his body, and he has been bedridden ever since."',],
    death: 'Early in the morning of June 4, Shi Yan was shot in his temple at an overpass. A Red Cross ambulance took him to the Beijing People’s Hospital, where he died. Shi Feng has since passed away.', 
    link: 'https://truth30.hrichina.org/shi_yan.html',
    image: shiYan

  },
  {
    mother: "肖昌宜 (Xiao Changyi) and 姚瑞生 (Yao Ruisheng)",
    lat: 39.908096497143404,
    lng: 116.33545470685895,
    son: "肖波（Xiao Bo）",
    story: ["At the time of Xiao's death, I was in my hometown in Hunan, recuperating after the birth of twins. I received news that he and an old classmate of his had arranged to meet at Muxudi on the night of June 3. Xiao had heard that the situation there was very tense. As the advisor to all chemistry students in the class of 1989, he was concerned that some of his students might be in danger.",],
    death: 'On the night of June 3, 1989, Xiao Bo was shot in the chest, and the bullet severed his aorta. When he was brought to Fuxing Hospital, emergency staff recognized him as the same person who had helped to bring another wounded person to the hospital earlier. As the hospital was not prepared to treat gunshot wounds, Xiao bled to death. Both his parents were members of the Tiananmen Mothers before they passed away.',
    link: 'https://truth30.hrichina.org/xiao_bo.html',
    image: xiaoBo

  },
  {
    mother: "金亚喜 (Jin Yaxi)",
    lat: 39.90834346874038,
    lng: 116.39773878980195,
    son: "程仁兴（CHENG Renxing）",
    story: [
      'A dialogue from an interview conducted by You Weijie:',
      'You Weijie: “Grandma, can tell us your thoughts?"',
      "Choking up, Jin Yaxi said something to her daughter-in-law. Though I couldn’t understand, I knew how much pain she must feel at the death of her second son.",
      'Xia Xiya: “She said she doesn’t know how to say it. She doesn’t know what will become of our country in the future—so she doesn’t dare say anything. I told her, at her age, it’s okay for her to say anything she’d like.”',
      'You Weijie: “Actually, we shouldn’t have come and disturbed grandma’s life. But next year will be the 25th anniversary of June Fourth. We hope that grandma can tell us how she feels about her son being shot to death. She ought to ask for justice.”',
      'Jin Yaxi: “My son was shot to death. I’m not willing to let it go!”'
      ],
    death: 'Cheng was the first documented victim of the June Fourth crackdown who was killed in Tiananmen Square [despite government claim that no deaths occurred in the Square]. In the afternoon of June 3, 1989, as Cheng heard that the Party Committee of Beijing was urging residents and students not to go out that night, he rushed toward Tiananmen Square on his bicycle. He was shot in the early morning of June 4, beneath the national flag in Tiananmen Square,',
    link: 'https://truth30.hrichina.org/cheng_renxing.html',
    image: chengRenXing
  },
  {
    mother: "高捷 (Gao Jie)",
    lat: 39.907352757877554,
    lng: 116.35264980616064,
    son: "苏欣 (Su Xin) ",
    story: [
      'From an essay written by Gao Jie in 2009:',
      '"There is not a single moment when I don\'t miss her. Countless times she has appeared in my dreams in tears, saying, "Mother, I have died an unjust death. I want to live so that I can take care of you." Every year on Qing Ming festival, I go to sweep her grave. When I stand in front of her grave, I think: I can visit her now. But after I die, who will come to visit us?"',
      'Gao Jie has since passed away.'
    ],
    death: 'After dinner on June 3, 1989, Su was outside when she saw the mounting tension in the streets. As an only child, she was worried about her mother who was home by herself, having recently lost her own father as well as her husband. Su called her mother to say that she would come over to her house to keep her company. Her mother told her not to come, but Su, who loved her mother deeply, could not stop worrying and decided to bicycle there. On her way there, she was stopped at the southern side of the intersection at Nanlishi Road as martial law troops armed with submachine guns were firing into the crowds on the roadside. Su was shot in the chest.',
    link: 'https://truth30.hrichina.org/su_xin.html',
    image: suXin

  },
  {
    mother: "谭淑琴 (Tan Shuqin)",
    lat: 39.91836987430064,
    lng: 116.35126136987432,
    son: "奚桂茹 (Xi Guiru)",
    story: [
      'Tan Shuqin, from a joint statement by the Tiananmen Mothers in 2016:', 
      '"This year is the 27th anniversary of June Fourth. As the mother of a victim, an old lady almost 80 years old, I still firmly believe that justice is among us, and that the June Fourth massacre will ultimately receive the fairness and justice it deserves! My demands: speak the truth about the shooting! Pursue legal liability for the decision-makers! Apologize to us, and compensate us!"',
      'Tan Shuqin has since passed away.'
    ],
    death: 'On the evening of June 3, 1989, Xi and her brother walked a friend home in the Fuxingmen area. On their way back, at Yuetan South Street not far from Erqi Theater, they ran into military trucks carrying martial law troops. As they were about to cross the street after the trucks passed, a soldier on top of one of the vehicles suddenly opened fire into the crowd on the street. Several people collapsed instantly. Xi was shot in the shoulder and fell into her brother’s arms.',
    link: 'https://truth30.hrichina.org/xi_guiru.html',
    image: xiGuiRu

  },
  {
    mother: "王培靖 (Wang Peijing) and 张耀祖 (Zhang Yaozu )",
    lat: 39.89855985882021,
    lng: 116.39785992755756,
    son: "张向红 (Zhang Xianghong)",
    story: [
      'From an essay by 丁子霖 (Ding Zilin), founding member of the Tiananmen Mothers, in 2005:',
      'Zhang’s mother stated, again and again, that her daughter had always been an honest, obedient child, who never crossed the line. She had good grades and was well-behaved. That night, the old mother spoke extremely fast when she told me this, almost without thinking, never pausing. Yet on the massacre and the blood debt it caused, she never spoke a word, let alone condemned it. I thought, since her daughter’s death, she must have said the same things when she was dealing with her daughter’s school, the work units of her husband and herself, and people in the streets and neighbors and friends. The chill and fear created by the June Fourth massacre had stunned this elderly couple.',
      'Both Wang Peijing and Zhang Yaozu have since passed away.'
    ],
    death: 'Shortly after 11:00 p.m. on June 3, 1989, Zhang and her elder brother, sister-in-law, and others were returning from a relative’s home in Zhushikou. At Qianmen, they were stopped by martial law troops and separated. Zhang and her sister-in-law hid behind a bush on the west side of Qianmen. A bullet hit her on the left side of the chest, puncturing her aorta and piercing her back. She was taken to the city emergency center and died in the early hours of June 4.',
    link: 'https://truth30.hrichina.org/zhang_xianghong.html',
    image: zhangXiangHong
  }
]


function Graveyard() {
  const { setGraveyardText, setRootsText } = useContext(GameContext);
  const [splatteredIndex, setSplatteredIndex] = useState(null);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [panToLocation, setPanToLocation] = useState(null);

  const renderContent = (contentArray) => {
    return contentArray.map(paragraph => (
      <p>{paragraph}</p>
    ))
  }

  useEffect(() => {
    if (previousIndex !== null) {
      const timer = setTimeout(() => {
        setPreviousIndex(null);
      }, 500); // Time matches fade-out animation duration
      return () => clearTimeout(timer);
    }
  }, [previousIndex]);

  // const [selected, setSelected] = useState(new Map());

  const handleFigureClick = (index) => {
    if (splatteredIndex !== index) {
      setPreviousIndex(splatteredIndex); // Set previous index for fade-out
      setSplatteredIndex(index); // Set new splattered index

      const selectedLocation = motherSonData[index];
      setGraveyardText((
        <div style={styles["TEXT_BOX"]} class="fade-in">  
          <h2 style={styles["CENTER"]}> Mothers' Laps</h2>
          {renderContent(motherSonData[index].story)}
          <a style={styles["RIGHT"]} href={selectedLocation.link} target="_blank">{selectedLocation.mother}</a>
        </div>
      ))
      setRootsText((
        <div style={styles["TEXT_BOX"]} class="fade-in">
          <h2 style={styles["CENTER"]}>Offspring Taken</h2>  
          <img style={styles["IMAGE"]} src={selectedLocation.image} />
          <p>{motherSonData[index].death}</p>
          <a style={styles["RIGHT"]} href={selectedLocation.link} target="_blank">{selectedLocation.son}</a>
        </div>
      ))
      setPanToLocation({
        lat: selectedLocation.lat,
        lng: selectedLocation.lng
      });
  


    }
  };

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

  const handleGravestoneClick = useCallback((ev, id) => {
    // setSelected((prev) => new Map(prev).set(id, !prev.get(id)));
    // setGraveyardText(<p>{graveyardData.find((d) => d.id === id).testimonial}</p>);
  }, []);


  // const handleSelected = id => {
  //   console.log("here's the id..." + id);
  //   setSelected(prev => {
  //     const newSelected = new Map(prev);
  //     newSelected.forEach((value, key) => {
  //       console.log("Is" + key + "equal to: " + id);
  //       console.log(key == id);
  //       if (key == id) {
  //         newSelected.set(id, true)
  //       } else {
  //         newSelected.set(key, false)
  //       }
  //     })
  //     console.log("Well, a new map>>>")
  //     console.log(newSelected);
  //     return newSelected;

  //   })
  // }
  return (
      <div style={styles[CONSTANTS.BASE]}>
        {renderPlaceholderSplatters()}
        <div style={styles.MAP_STYLE}>
          <MapComponent panToLocation={panToLocation} pois={motherSonData} onSelected={(index) => handleFigureClick(index)} />
        </div>
      </div>
  );
}

export default Graveyard;
