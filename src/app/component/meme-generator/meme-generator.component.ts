import { Component, OnInit } from '@angular/core';
import { State } from "../../models/State";

@Component({
  selector: 'app-meme-generator',
  templateUrl: './meme-generator.component.html',
  styleUrls: ['./meme-generator.component.css']
})
export class MemeGeneratorComponent implements OnInit {
  constructor() { }

  state: State = {
    fontSize: "26",
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
    allMemeImgs: []
  };


  ngOnInit(): void {
    fetch("https://api.imgflip.com/get_memes")
      .then((data) => data.json())
      .then((response) => {
        const { memes } = response.data;
        this.state.allMemeImgs = memes;
      });
  }

  handleChange = (event) => {
    let name:any = event.name;
    let value:any = event.value;

    if (name === "topText") {
      this.state.topText = value;
    } else if (name === "bottomText") {
      this.state.bottomText = value;
    } else if (name === "fontSize") {
      this.state.fontSize = value;
    }
  };

  handleClick = () => {
    let randomNumber = Math.floor( Math.random() * this.state.allMemeImgs.length);
    this.state.randomImg = this.state.allMemeImgs[randomNumber].url;
  };
}