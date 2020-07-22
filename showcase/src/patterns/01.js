import React, { useState, Component } from "react";
import mojs from "mo-js";
import styles from "./index.css";

const initialState = {
  count: 0,
  countTotal: 10,
  isClicked: false,
};

/*
HIGHER ORDER COMPONENT
*/

const clapWithAnimation = (WrappedComponent) => {
  class ClapWithAnimation extends Component {
    animationTimeline = new mojs.Timeline();
    state = {
      animationTimeline: this.animationTimeline,
    };

    componentDidMount() {
      const scaleButton = new mojs.Html({
        el: "#clap",
        duration: 300,
        scale: { 1.3: 1 },
        easing: mojs.easing.ease.out,
      });

      const newAnimationTimeline = this.animationTimeline.add([scaleButton]);

      this.setState({ animationTimeline: newAnimationTimeline });
    }
    render() {
      return (
        <WrappedComponent
          {...this.props}
          animationTimeline={this.animationTimeline}
        />
      );
    }
  }
  return ClapWithAnimation;
};

const MediumClap = ({ animationTimeline }) => {
  const MAXIMUM_USER_COUNT = 10;
  const [clapState, setClapState] = useState(initialState);
  const { count, countTotal, isClicked } = clapState;

  const handleClapClick = () => {
    // set state
    // count++
    // countTotal ++
    animationTimeline.replay();
    setClapState((prevState) => ({
      isClicked: true,
      count: Math.min(count + 1, MAXIMUM_USER_COUNT),
      countTotal:
        count < MAXIMUM_USER_COUNT
          ? prevState.countTotal + 1
          : prevState.countTotal,
    }));
  };
  return (
    <button id="clap" className={styles.clap} onClick={handleClapClick}>
      <ClapIcon isClicked={isClicked} />
      <ClapCount count={count} />
      <CountTotal countTotal={countTotal} />
    </button>
  );
};

/* 
Subcomponents follow

*/

const ClapIcon = ({ isClicked }) => {
  return (
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100.08 125"
        className={`${styles.icon} ${isClicked && styles.checked}`}
      >
        <path d="M77.704 12.876c1.175 1.144 1.931 2.559 2.264 4.053.367-.27.756-.503 1.158-.706.971-1.92.654-4.314-.964-5.891-1.998-1.944-5.198-1.915-7.151.091l-.216.222C74.639 10.819 76.363 11.572 77.704 12.876zM48.893 26.914c.407.885.687 1.93.791 3.057l16.478-16.928c.63-.648 1.364-1.144 2.145-1.545 1.006-1.93.712-4.367-.925-5.96-2.002-1.948-5.213-1.891-7.155.108L44.722 21.575C47.043 23.836 47.82 24.599 48.893 26.914zM10.041 66.626c-.118-8.864 3.219-17.24 9.396-23.584l18.559-19.064c.727-2.031.497-4.076-.076-5.319-.843-1.817-1.314-2.271-3.55-4.451L13.501 35.645C2.944 46.489 2.253 63.277 11.239 74.94 10.51 72.259 10.078 69.478 10.041 66.626z" />
        <path d="M21.678,45.206l20.869-21.437c2.237,2.18,2.708,2.634,3.55,4.451c0.837,1.819,0.994,5.356-1.607,8.05 L32.642,48.514c-0.459,0.471-0.446,1.228,0.028,1.689c0.472,0.457,1.228,0.452,1.686-0.019l34.047-34.976 c1.941-1.999,5.153-2.056,7.155-0.108c1.998,1.944,2.03,5.159,0.089,7.155L50.979,47.584c-0.452,0.464-0.437,1.224,0.038,1.688 c0.482,0.466,1.234,0.457,1.689-0.009l28.483-29.28c1.952-2.005,5.153-2.035,7.15-0.09c1.995,1.943,2.048,5.142,0.097,7.144 L59.944,56.308c-0.453,0.466-0.441,1.223,0.038,1.688c0.469,0.456,1.227,0.449,1.678-0.015L86.32,32.645 c1.942-1.995,5.15-2.061,7.15-0.113c2.003,1.949,2.043,5.175,0.101,7.17l-24.675,25.32c-0.453,0.467-0.442,1.219,0.038,1.688 c0.47,0.457,1.231,0.453,1.682-0.014l14.56-14.973c1.958-2.013,5.167-2.043,7.159-0.107c2.011,1.96,2.051,5.152,0.09,7.164 L64.792,87.17c-11.576,11.892-30.638,12.153-42.54,0.569C10.349,76.151,10.103,57.095,21.678,45.206" />
      </svg>
    </span>
  );
};

const ClapCount = ({ count }) => {
  return <span className={styles.count}> + {count}</span>;
};

const CountTotal = ({ countTotal }) => {
  return <span className={styles.total}>{countTotal}</span>;
};

/* 
USAGE

*/

const Usage = () => {
  const AnimatedMediumClap = clapWithAnimation(MediumClap);
  return <AnimatedMediumClap />;
};

export default Usage;
