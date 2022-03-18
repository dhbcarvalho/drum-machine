import * as React from "https://cdn.skypack.dev/react@17.0.1";
/* global React, ReactDOM */
/* eslint-disable react/prop-types, react/no-multi-comp */

// eslint-disable-next-line no-unused-vars
const projectName = "drum-machine";

// coded by @no-stack-dub-sack (github) / @no_stack_sub_sack (codepen)

const bankOne = [
{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Heater-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },

{
  keyCode: 87,
  keyTrigger: "W",
  id: "Heater-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },

{
  keyCode: 69,
  keyTrigger: "E",
  id: "Heater-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },

{
  keyCode: 65,
  keyTrigger: "A",
  id: "Heater-4",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },

{
  keyCode: 83,
  keyTrigger: "S",
  id: "Clap",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },

{
  keyCode: 68,
  keyTrigger: "D",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },

{
  keyCode: 90,
  keyTrigger: "Z",
  id: "Kick-n'-Hat",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },

{
  keyCode: 88,
  keyTrigger: "X",
  id: "Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },

{
  keyCode: 67,
  keyTrigger: "C",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" }];



const bankTwo = [
{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Chord-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },

{
  keyCode: 87,
  keyTrigger: "W",
  id: "Chord-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },

{
  keyCode: 69,
  keyTrigger: "E",
  id: "Chord-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },

{
  keyCode: 65,
  keyTrigger: "A",
  id: "Shaker",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },

{
  keyCode: 83,
  keyTrigger: "S",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },

{
  keyCode: 68,
  keyTrigger: "D",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },

{
  keyCode: 90,
  keyTrigger: "Z",
  id: "Punchy-Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },

{
  keyCode: 88,
  keyTrigger: "X",
  id: "Side-Stick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },

{
  keyCode: 67,
  keyTrigger: "C",
  id: "Snare",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" }];



const activeStyle = {
  backgroundColor: "orange",
  boxShadow: "0 3px orange",
  height: 77,
  marginTop: 13 };


const inactiveStyle = {
  backgroundColor: "grey",
  marginTop: 10,
  boxShadow: "3px 3px 5px black" };


class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle };

    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  activatePad() {
    if (this.props.power) {
      if (this.state.padStyle.backgroundColor === "orange") {
        this.setState({
          padStyle: inactiveStyle });

      } else {
        this.setState({
          padStyle: activeStyle });

      }
    } else if (this.state.padStyle.marginTop === 13) {
      this.setState({
        padStyle: inactiveStyle });

    } else {
      this.setState({
        padStyle: {
          height: 77,
          marginTop: 13,
          backgroundColor: "grey",
          boxShadow: "0 3px grey" } });


    }
  }
  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, " "));
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: "drum-pad",
        id: this.props.clipId,
        onClick: this.playSound,
        style: this.state.padStyle }, /*#__PURE__*/

      React.createElement("audio", {
        className: "clip",
        id: this.props.keyTrigger,
        src: this.props.clip }),

      this.props.keyTrigger));


  }}


class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let padBank;
    if (this.props.power) {
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return /*#__PURE__*/(
          React.createElement(DrumPad, {
            clip: padBankArr[i].url,
            clipId: padBankArr[i].id,
            keyCode: padBankArr[i].keyCode,
            keyTrigger: padBankArr[i].keyTrigger,
            power: this.props.power,
            updateDisplay: this.props.updateDisplay }));


      });
    } else {
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return /*#__PURE__*/(
          React.createElement(DrumPad, {
            clip: "#",
            clipId: padBankArr[i].id,
            keyCode: padBankArr[i].keyCode,
            keyTrigger: padBankArr[i].keyTrigger,
            power: this.props.power,
            updateDisplay: this.props.updateDisplay }));


      });
    }
    return /*#__PURE__*/React.createElement("div", { className: "pad-bank" }, padBank);
  }}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      display: String.fromCharCode(160),
      currentPadBank: bankOne,
      currentPadBankId: "Heater Kit",
      sliderVal: 0.3 };

    this.displayClipName = this.displayClipName.bind(this);
    this.selectBank = this.selectBank.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.powerControl = this.powerControl.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160) });

  }
  selectBank() {
    if (this.state.power) {
      if (this.state.currentPadBankId === "Heater Kit") {
        this.setState({
          currentPadBank: bankTwo,
          display: "Smooth Piano Kit",
          currentPadBankId: "Smooth Piano Kit" });

      } else {
        this.setState({
          currentPadBank: bankOne,
          display: "Heater Kit",
          currentPadBankId: "Heater Kit" });

      }
    }
  }
  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name });

    }
  }
  adjustVolume(e) {
    if (this.state.power) {
      this.setState({
        sliderVal: e.target.value,
        display: "Volume: " + Math.round(e.target.value * 100) });

      setTimeout(() => this.clearDisplay(), 1000);
    }
  }
  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160) });

  }
  render() {
    const powerSlider = this.state.power ?
    {
      float: "right" } :

    {
      float: "left" };

    const bankSlider =
    this.state.currentPadBank === bankOne ?
    {
      float: "left" } :

    {
      float: "right" };

    {
      const clips = [].slice.call(document.getElementsByClassName("clip"));
      clips.forEach(sound => {
        sound.volume = this.state.sliderVal;
      });
    }
    return /*#__PURE__*/(
      React.createElement("div", { className: "inner-container", id: "drum-machine" }, /*#__PURE__*/
      React.createElement(PadBank, {
        clipVolume: this.state.sliderVal,
        currentPadBank: this.state.currentPadBank,
        power: this.state.power,
        updateDisplay: this.displayClipName }), /*#__PURE__*/


      React.createElement("div", { className: "logo" }, /*#__PURE__*/
      React.createElement("div", { className: "inner-logo " }, "FCC" + String.fromCharCode(160)), /*#__PURE__*/
      React.createElement("i", { className: "inner-logo fa fa-free-code-camp" })), /*#__PURE__*/


      React.createElement("div", { className: "controls-container" }, /*#__PURE__*/
      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("p", null, "Power"), /*#__PURE__*/
      React.createElement("div", { className: "select", onClick: this.powerControl }, /*#__PURE__*/
      React.createElement("div", { className: "inner", style: powerSlider }))), /*#__PURE__*/


      React.createElement("p", { id: "display" }, this.state.display), /*#__PURE__*/
      React.createElement("div", { className: "volume-slider" }, /*#__PURE__*/
      React.createElement("input", {
        max: "1",
        min: "0",
        onChange: this.adjustVolume,
        step: "0.01",
        type: "range",
        value: this.state.sliderVal })), /*#__PURE__*/


      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("p", null, "Bank"), /*#__PURE__*/
      React.createElement("div", { className: "select", onClick: this.selectBank }, /*#__PURE__*/
      React.createElement("div", { className: "inner", style: bankSlider }))))));





  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));