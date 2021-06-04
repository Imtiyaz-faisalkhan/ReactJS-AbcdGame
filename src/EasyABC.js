import React, {Component} from 'react';
import alphabets from './alphabets.json';
import classNames from 'classnames';

class EasyABC extends Component {

constructor(props){
  super(props);
  this.state = {
    alphabets : alphabets,
    currentPostion : 0,
    currentTick : 0,
    random:false,
    sound:true
  }
  this.next = this.next.bind(this);
  this.previous = this.previous.bind(this);
  this.playSound = this.playSound.bind(this);
  this.switchRandom = this.switchRandom.bind(this);
  this.switchSound = this.switchSound.bind(this);
  this.manualPlay = this.manualPlay.bind(this);
}
componentDidMount(){
  let letterSound = document.querySelector('audio[data-key="letter"]')
  if(this.state.currentPostion===0){
    letterSound.play();
    console.log("called this 1")
  }


}
componentDidUpdate(){
  this.playSound();
}

playSound(){
  let letterSound = document.querySelector('audio[data-key="letter"]')
  let wordSound = document.querySelector('audio[data-key="word"]')
  if(this.state.sound){
    if(this.state.currentTick===0){
      letterSound.currentTime=0;
      letterSound.play();
      console.log("called this 2")
    }else{
      wordSound.play();
      wordSound.currentTime=0;
    }
  }

}
manualPlay(){
  let letterSound = document.querySelector('audio[data-key="letter"]')
  let wordSound = document.querySelector('audio[data-key="word"]')
    if(this.state.currentTick===0){
      letterSound.currentTime=0;
      letterSound.play();
      console.log("called this 2")
    }else{
      wordSound.play();
      wordSound.currentTime=0;  
  }
}

randomNumber(max,min){
  return Math.floor(Math.random()*(max-min+1))+min;
}
// Next Button
next(){
  if(this.state.random){
    // dispaly word and image if the tick is less the 2
    if(this.state.currentTick < 2){
      this.setState({currentTick : this.state.currentTick+1})
    }else{
      // display next random letter
      this.setState({currentPostion : this.randomNumber(0,25),currentTick:0});
    }
  }else{
    if(this.state.currentTick<2){
      this.setState({currentTick : this.state.currentTick+1})
    }else{
      if(this.state.currentPostion === this.state.alphabets.length-1){
        // if the current Letter is Z
        this.setState({currentPostion : 0,currentTick:0});
      }else{
        this.setState({currentPostion : this.state.currentPostion+1,currentTick:0});
      }

    }
  }
}
// Previous button function
  previous(){
  if(this.state.currentPostion > 0){
    this.setState({currentPostion:this.state.currentPostion-1,currentTick:0});
  }else{
    // if the postion is at 0 i.e A
    this.setState({currentPostion:this.state.alphabets.length-1,currentTick:0});
  }

  }
  // TO randomize the letters
  switchRandom(){
    this.setState({random:!this.state.random})
  }

  switchSound(){
    this.setState({sound:!this.state.sound})
  }

  render(){
    let showImage = this.state.currentTick !== 0? true : false;
    let showWord = this.state.currentTick ===2 ? true : false;
    return(
      <div className="game">
      <span className = "random-label">Random Letters </span>
      <label className="switch">
        <input type="checkbox" defaultValue = "false" checked = {this.state.random} onClick={this.switchRandom}/>
        <div className="slider round"></div>
      </label>
      <span className = "random-label">Sound </span>
      <label className="switch">
        <input type="checkbox" defaultValue = "true" checked = {this.state.sound} onClick={this.switchSound}/>
        <div className="slider round"></div>
      </label>

        <div className="option">
          <div className="fields">
            <div className="field-block">
              {this.state.alphabets[this.state.currentPostion].letter}
                <audio src={this.state.alphabets[this.state.currentPostion].letterSound} data-key="letter"/>
            </div>

            current postion : {this.state.currentTick}
          </div>
          <div className="buttons">
          <a className="button prev" onClick={this.previous}>Previous</a>
          <a className="button sound" onClick={this.manualPlay}>Play again</a>
          <a className="button next" onClick={this.next}>Next</a>
          </div>
          <div className="fields">
            <div className="field-block">
            <div className="left-field">
              <div className = {classNames("placeholder-span",{hide:showImage})}>Click Next to view image</div>
              <img className = {classNames("letter-image",{hide:!showImage})}src={this.state.alphabets[this.state.currentPostion].image}
              alt = {this.state.alphabets[this.state.currentPostion].word}  />
              <audio src={this.state.alphabets[this.state.currentPostion].wordSound} data-key="word"/>
            </div>
            <div className="right-field">
              <div className ={classNames("placeholder-span",{hide:showWord})}>Click Next to view spelling</div>
              <div className ={classNames("word",{hide:!showWord})}>
              {this.state.alphabets[this.state.currentPostion].word.toUpperCase()}
              </div>
              <audio src={this.state.alphabets[this.state.currentPostion].wordSound} data-key="word"/>
            </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default EasyABC;
