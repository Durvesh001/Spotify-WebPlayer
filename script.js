console.log("Welcome to Spotify Web");

// Initialise variables -
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");
let down_img = document.getElementsByClassName("songimage");

let songs = [
  {
    songName: "Hope",
    filePath: "songs/1.mp3",
    coverPath: "cover/cover_1.jpg",
    time_s: "02:45 ",
  },
  {
    songName: "Ex Bitch",
    filePath: "songs/2.mp3",
    coverPath: "cover/cover_2.jpg",
    time_s: "02:01 ",
  },
  {
    songName: "Moonlight",
    filePath: "songs/3.mp3",
    coverPath: "cover/cover_3.jpg",
    time_s: "02:17 ",
  },
  {
    songName: "Changes",
    filePath: "songs/4.mp3",
    coverPath: "cover/cover_4.jpg",
    time_s: "02:01 ",
  },
  {
    songName: "Revenge",
    filePath: "songs/5.mp3",
    coverPath: "cover/cover_5.jpg",
    time_s: "02:01 ",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
  element.getElementsByClassName("tt")[0].innerText = songs[i].time_s;
});


// handle play pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    // audioElement.src = `songs/${songIndex}.mp3`
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    console.log(songIndex);
    document.getElementById(`${songIndex}`).classList.remove("fa-circle-play");
    document.getElementById(`${songIndex}`).classList.add("fa-circle-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    console.log(songIndex);
    document.getElementById(`${songIndex}`).classList.remove("fa-circle-pause");
    document.getElementById(`${songIndex}`).classList.add("fa-circle-play");
  }
});

// Listen to events
audioElement.addEventListener("timeupdate", () => {
  progress = parseFloat(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
      console.log(e.target.classList);
      if (e.target.classList[2] == "fa-circle-play") {
        console.log(e.target.classList);
        //gives the event which has been clicked

        //Function makeAllPlays
        makeAllPlays();

        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex - 1].songName;
        down_img[0].getElementsByTagName("img")[0].src =
          songs[songIndex - 1].coverPath;
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
      } else {
        makeAllPlays();
        audioElement.pause();
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  console.log(songIndex);
  if (songIndex >= 5) {
    songIndex = 5;
  } else {
    songIndex += 1;
  }

  makeAllPlays();
  document.getElementById(`${songIndex}`).classList.add("fa-circle-pause");

  audioElement.src = `songs/${songIndex}.mp3`;
  down_img[0].getElementsByTagName("img")[0].src = songs[songIndex - 1].coverPath;
  masterSongName.innerText = songs[songIndex - 1].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 1) {
    songIndex = 1;
  } else {
    songIndex -= 1;
  }

  // convert plays to pause when previous is clicked
  makeAllPlays();
  document.getElementById(`${songIndex}`).classList.add("fa-circle-pause");

  audioElement.src = `songs/${songIndex}.mp3`;
  console.log(songIndex);
  down_img[0].getElementsByTagName("img")[0].src = songs[songIndex - 1].coverPath;
  masterSongName.innerText = songs[songIndex - 1].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

// songItems.forEach((element,i) => {
//     element.addEventListener('click',(e)=>{
//         // console.log(e.getElementsById(`${songIndex}`).classList)
//         if (e.document.getElementsById(`${songIndex}`).classList[2] == 'fa-circle-play'){
//             console.log('hello')
//         }

//     })
// })

// function makeAllPlays() {
//     const pauseButtons = document.querySelectorAll(".fa-circle-pause");
//     pauseButtons.forEach((button) => {
//       button.classList.remove("fa-circle-pause");
//       button.classList.add("fa-circle-play");
//     });
//   }

// songItems.forEach((element, i) => {
//     element.addEventListener("click", (e) => {
//     const songIndex = element.getAttribute("id");
//     const playButton = document.getElementById(songIndex).querySelector(".songItemPlay");

//     if (playButton.classList.contains("fa-circle-play")) {
//         makeAllPlays();
//         playButton.classList.remove("fa-circle-play");
//         playButton.classList.add("fa-pause-circle");
//         console.log('Play buttton clicked')
//         console.log(`Songindex = ${songIndex}`)
//         audioElement.src = `songs/${songIndex}.mp3`;
//         audioElement.currentTime = 0;
//         audioElement.play();
//         masterPlay.classList.remove("fa-circle-play");
//         masterPlay.classList.add("fa-circle-pause");
//     } else {
//         makeAllPlays();
//         audioElement.pause();
//         playButton.classList.remove("fa-pause-circle");
//         playButton.classList.add("fa-circle-play");
//         masterPlay.classList.remove("fa-circle-pause");
//         masterPlay.classList.add("fa-circle-play");
//         console.log("Pause button clicked");
//     }
//     });
// });
