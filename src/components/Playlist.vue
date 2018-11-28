<template>
  <div class="player">
    <div id='audio-players'></div>
    <div id="video-players">
      <div id="progress" class="progress-seek">
        <button @click="playerButton()" id="playPauseBtn"><i class='fa fa-pause'></i></button>
        <input type="range" class="slider" id="seek-bar" value="0">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'VuePlaylist',
  data () {
    return {
      id: null,
      name: null,
      creatorId: null,
      slug: null,
      videos: [],
      playerIndex: 0,
      uploadDate: null,
      players: [],
      currentPlayer: null,
      currentZIndex: 1000
    }
  },
  props: ['playlist'],
  mounted: function () {
    console.log(this.playlist);
    var self = this;
    var videoplayers = document.getElementById("video-players");
    var audioplayers = document.getElementById("audio-players");
    var videoDuration = 0;

    // Get duration of each video
    for (let index=0; index<this.playlist.length; index++) {
      // console.log('INDEX: ' + index);
      self.playlist[index].timeInPlaylist = [];
      self.playlist[index].duration = 0;
      let audio = document.createElement('audio');
      audio.setAttribute('id', 'audio' + index);
      audio.setAttribute('src', self.playlist[index].bucketRef);
      audioplayers.appendChild(audio);
      audio.addEventListener('canplaythrough', function(e){
         videoDuration = Math.round(e.currentTarget.duration);
         // console.log("Duration of video number " + index + ": " +
         // videoDuration + " seconds");
         self.playlist[index].duration = videoDuration;
         // if (index == 0) {
         //   self.playlist[index].timeInPlaylist[0] = 0;
         //   self.playlist[index].timeInPlaylist[1] = videoDuration;
         // } else if (self.playlist[index-1].timeInPlaylist[1] > 0) {
         //   self.playlist[index].timeInPlaylist[0] = self.playlist[index-1].timeInPlaylist[1];
         //   self.playlist[index].timeInPlaylist[0] = self.playlist[index-1].timeInPlaylist[1] + videoDuration;
         // } else if (self.playlist[ind])
         // playlistLength = playlistLength + videoDuration;
         // self.playlist[index].timeInPlaylist[1] = playlistLength;
      });
    };

    // Set time in playlist for each video
    var numOfTimes = 0;
    var keepCheckingForDuration = setInterval(function () {
      var playlistLength = 0;
      for (let index=0; index<self.playlist.length; index++) {
        self.playlist[index].timeInPlaylist[0] = playlistLength;
        playlistLength = playlistLength + self.playlist[index].duration;
        self.playlist[index].timeInPlaylist[1] = playlistLength;
        // console.log(self.playlist[index].timeInPlaylist);
      }
      if (++numOfTimes === 5) {
          window.clearInterval(keepCheckingForDuration);
      }
    }, 1000);

    // Preload videos and play the first one
    for (var i=0; i<self.playlist.length; i++) {
      let newPlayer = document.createElement('video');
      newPlayer.setAttribute('id', 'player' + i);
      // newPlayer.setAttribute('class', 'video-players');
      // preload each video
      newPlayer.src = self.playlist[i].bucketRef;
      newPlayer.load();
      videoplayers.appendChild(newPlayer);
      self.players[i] = document.getElementById('player' + i);
      // self.players[i].addEventListener('v-on:click', self.playerButton());
    }
    for (var i=0; i<self.players.length; i++) {
      self.players[i].onended = function() { self.switchVideo() };
      self.players[i].onclick = function() { self.playerButton() };
      self.players[i].style.maxWidth = "100%";
      self.players[i].style.top = "0";
      self.players[i].style.left = "0";
      self.players[i].style.position = 'absolute';
    }
    console.log(self.players);
    self.currentPlayer = self.players[0];
    self.currentPlayer.style.zIndex = self.currentZIndex;
    // player1.src = self.playlist[self.playerIndex].bucketRef;
    // self.playerIndex++;
    // player2.src = self.playlist[self.playerIndex].bucketRef;
    // player1.load();
    // player2.load();
    self.currentPlayer.play();

    var seekBar = document.getElementById("seek-bar");

    // Update the seek bar as the video plays
    self.currentPlayer.addEventListener("timeupdate", function() {
      // Calculate the slider value
      var value = (100 / self.getTotalDuration(self.playlist)) * self.currentPlayer.currentTime;
      // console.log("Start time for this clip: " + self.playlist[self.playerIndex].timeInPlaylist[0]);
      // console.log(value + "% / 100%");
      // Update the slider value
      seekBar.value = value;
    });

    // Event listener for the seek bar
    seekBar.addEventListener("change", function() {
      // Calculate the new time
      var time = self.currentPlayer.duration * (seekBar.value / 100);
      // console.log('time: ' + time);

      var currentVideoIndex = self.playerIndex;
      self.checkSeekBarVideo(seekBar.value, currentVideoIndex, time);
    });
  },
  methods: {
    previewVideo() {
    },
    switchVideo() {
      if (this.playerIndex < (this.playlist.length - 1)) {
        var self = this;
        this.playerIndex++;
        var seekBar = document.getElementById("seek-bar");
        self.currentPlayer = self.players[self.playerIndex];
        if(self.playerIndex > 0) {
          self.players[self.playerIndex-1].style.zIndex = "0";
        }
        self.currentPlayer.style.zIndex = self.currentZIndex++;


        // Update the seek bar as the video plays
        self.currentPlayer.addEventListener("timeupdate", function() {
          // Calculate the slider value
          var value = (100 / self.getTotalDuration(self.playlist)) * (self.playlist[self.playerIndex].timeInPlaylist[0] + self.currentPlayer.currentTime);
          // console.log(value + "% / 100%")
          // Update the slider value
          seekBar.value = value;
        });

        // Event listener for the seek bar
        seekBar.addEventListener("change", function() {
          // Calculate the new time
          var time = self.currentPlayer.duration * (seekBar.value / 100);
          // console.log('time: ' + time);
          // Update the video time
          var currentVideoIndex = self.playerIndex;
          self.checkSeekBarVideo(seekBar.value, currentVideoIndex, time);
        });

        self.currentPlayer.play();
      }
      else {
        console.log("end of list");
        this.currentPlayer = this.players[0];
        this.currentPlayer.style.zIndex = this.currentZIndex;
        this.currentPlayer.currentTime = 0;
      }
    },
    playerButton() {
      var player = this.currentPlayer;
      if (player.paused == true) {
        // Play the video
        player.play();
        document.getElementById('playPauseBtn').innerHTML="<i class='fa fa-pause'></i>";
      } else {
        // Pause the video
        player.pause();
        document.getElementById('playPauseBtn').innerHTML="<i class='fa fa-play'></i>";
      }
    },
    getTotalDuration(playlist) {
      var duration = 0;
      for (var i=0; i<playlist.length; i++) {
        duration += playlist[i].duration
      }
      // console.log("Total duration: " + duration)
      return duration
    },
    checkSeekBarVideo(seekValue, index, time) {
        var seekBar = document.getElementById('seek-bar');
        // If current seek value is in the range of this particular video, rewind/forward it
        if ((seekValue < ((this.playlist[index].timeInPlaylist[1]) / this.getTotalDuration(this.playlist))*100) && (seekValue > (this.playlist[index].timeInPlaylist[0]/ this.getTotalDuration(this.playlist))*100)) {
          // console.log('current player: ' + this.currentPlayer)
          seekBar.value = seekValue;
          this.currentPlayer.currentTime = ((this.getTotalDuration(this.playlist) * (seekValue / 100)) - this.playlist[index].timeInPlaylist[0]);
          this.currentPlayer.play();
        } // Otherwise, load a different video that's in this range
        else {
          var seekTo = this.getTotalDuration(this.playlist) * (seekValue / 100);
          for (var i=0; i<this.playlist.length; i++) {
            if ((seekTo < this.playlist[i].timeInPlaylist[1]) && (seekTo > this.playlist[i].timeInPlaylist[0])) {
              this.currentPlayer.pause();
              this.playerIndex = i;
              this.currentPlayer = this.players[this.playerIndex];
              this.currentPlayer.currentTime = seekTo - this.playlist[i].timeInPlaylist[0];
              this.currentPlayer.style.zIndex = this.currentZIndex++;
              this.currentPlayer.play();
            }
          }
        }

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
