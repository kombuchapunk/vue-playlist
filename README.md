# vue-playlist
Simple vue component that takes an array of videos as a prop and stitches them together/plays seamlessly in a custom video player

This is currently the only working solution to seamlessly play multiple videos (stitch into one video) in a row with a single working seek bar and controls made with vanilla JS.

![Player view](https://i.imgur.com/5zdIUyc.jpg)

## Description
This simple and lightweight Vue.js component allows you to stitch multiple videos together into a one single video with interactive custom controls. It seamlessly plays videos from a given (dynamic) array and creates a single seekbar making it seem to appear as a single video.


## Setup/Installation Requirements

To install, from your project directory run
  ```
  $ npm install vue-playlist --save
  ```


Import the component in your main.js file
  ```
import VuePlaylist from 'vue-playlist';
  ```
Define an array of video files with this structure
  ```
playlist: [
              {bucketRef: 'YOUR_VIDEO_URL'},
              {bucketRef: 'YOUR_VIDEO_URL'}
            ]
  ```
Now you can use it anywhere by simply referencing vue-playlist and passing the array of videos
  ```
<vue-playlist :playlist='playlist'></vue-playlist>
  ```

   (!) Make sure you have Font Awesome Icons installed/included in your application for the play/pause button to display properly. You can also overright the button text/icon with simple css styles.

## Styling

  For your convenience and the light weight vue-playlist doesn't come with any css styles. You will need to style the player and the controls to your preference.

  To change the width of the player, apply styling to the element with the class .player
  ```
.player {
     width: 700px;
}
  ```

Here is a simple stylesheet for you to play around with:
  ```
.player {
      max-width: 770px;
}
button#playPauseBtn {
      padding: 0;
      margin-right: 10px;
      color: rgba(255,255,255,0.85);
      border-radius: 0;
      background-color: rgba(0,0,0,0);
}
#progress {
      position: absolute;
      z-index: 2000;
      bottom: 0;
      width: 99.96%;
      background-color: rgba(0,0,0,0.7);
      left: 0;
}

input[type=range].slider {
      width: 90%;
      margin: 10px 0;
      background-color: rgba(0,0,0,0.1);
      border-radius: 0;
}
input[type=range].slider:focus {
      outline: none;
}
input[type=range].slider::-webkit-slider-runnable-track {
      width: 100%;
      height: 10px;
      cursor: pointer;
      /* box-shadow: 0px 0px 0.3px #000000, 0px 0px 0px #0d0d0d; */
      background: #484d4d;
      border-radius: 2.5px;
      border: 0px solid #010101;
}
input[type=range].slider::-webkit-slider-thumb {
      box-shadow: 0px 0px 1px #730000, 0px 0px 0px #8d0000;
      border: 0px solid rgba(108, 202, 149, 0.48);
      height: 28px;
      width: 13px;
      border-radius: 7px;
      background: rgba(208, 0, 1, 0.93);
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -3px;
}
input[type=range].slider:focus::-webkit-slider-runnable-track {
      background: #abb1b1;
}
input[type=range].slider::-moz-range-track {
      width: 100%;
      height: 10px;
      cursor: pointer;
      background: #484d4d;
      border: 0;
}
input[type=range].slider::-moz-range-thumb {
      box-shadow: 0px 0px 1px #730000, 0px 0px 0px #8d0000;
      border: 0px solid rgba(108, 202, 149, 0.48);
      height: 28px;
      width: 13px;
      border-radius: 7px;
      background: rgba(208, 0, 1, 0.93);
      cursor: pointer;
}
input[type=range].slider::-ms-track {
      width: 100%;
      height: 10px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
}
input[type=range].slider::-ms-fill-lower {
      background: #000000;
      border: 0px solid #010101;
      border-radius: 5px;
      box-shadow: 0px 0px 0.3px #000000, 0px 0px 0px #0d0d0d;
}
input[type=range].slider::-ms-fill-upper {
      background: #484d4d;
      border: 0px solid #010101;
      border-radius: 5px;
      box-shadow: 0px 0px 0.3px #000000, 0px 0px 0px #0d0d0d;
}
input[type=range].slider::-ms-thumb {
      box-shadow: 0px 0px 1px #730000, 0px 0px 0px #8d0000;
      border: 0px solid rgba(108, 202, 149, 0.48);
      height: 28px;
      width: 13px;
      border-radius: 7px;
      background: rgba(208, 0, 1, 0.93);
      cursor: pointer;
      height: 10px;
}
input[type=range].slider:focus::-ms-fill-lower {
      background: #484d4d;
}
input[type=range].slider:focus::-ms-fill-upper {
      background: #abb1b1;
}
#video-players {
      position: relative;
      height: 390px;
      width: 90%;
      margin: 0 auto;
}
  ```


##  Author

Misha Petrov @ http://fictiontribe.com

Email: uxmishka@gmail.com

Web: https://misha-petrov.com/

GitHub: https://github.com/mishapetrov
