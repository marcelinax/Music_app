"use strict";

class Song {
  constructor(title, length, author, album, photoUrl, isLiked = false) {
    this.title = title;
    this.length = length;
    this.author = author;
    this.album = album;
    this.photoUrl = photoUrl;
    this.isLiked = isLiked;
    this.renderSong();
  }
  renderSong() {
    const songBox = document.querySelector(".song-box");
    // songBox.setAttribute("id", this.index);
    let content = `
      <div class="song-box-top-menu">
      <button class='small-btn' id='add-to-likes'>
      <img src='../assets/bxs-heart.svg' >
      </button>
      <h5>Playing now </h5>
      <button class='small-btn'>
      <img src='../assets/bxs-playlist.svg' >
      </button>
      </div>
        <div class="song-box-about-song">
        <div class="song-avatar-box">
          <div class="song-avatar" style="background-image: url('${this.photoUrl}');"></div>
        </div>
        <div class="song-details">
            <p class="title">${this.title}</p>
            <p class="author">${this.author}</p>
           
        </div>
        <div class='track-length-bar'>
        <span></span>
         <p class="length">${this.length}</p>
        </div>
        </div>
        <div class="song-box-bottom-menu">
        <button class='rounded-btn' id="next-song">
        <img src='../assets/bx-repeat.svg' >
        </button>
        <button class='rounded-btn' id="previous-song">
        <img src='../assets/bx-skip-previous.svg' >
        </button>
        <button class='rounded-btn big-btn' id="previous-song">
        <img src='../assets/bx-play.svg' >
        </button>
        <button class='rounded-btn' id="next-song">
        <img src='../assets/bx-skip-next.svg' >
        </button>
        <button class='rounded-btn' id="previous-song">
        <img src='../assets/bx-shuffle.svg' >
        </button>
        
        </div>
      `;
    songBox.innerHTML = content;
    document.querySelector("main").appendChild(songBox);
  }
}

class Songs {
  songs = [];
  cuurentSongIndex = 0;
  constructor() {
    this.initCreateNewSong();
    this.readSongsFromLocalStorage();
    this.initChangeSong();
  }
  saveSongInLocalStorage() {
    localStorage.setItem("songs", JSON.stringify(this.songs));
  }
  readSongsFromLocalStorage() {
    this.songs = [];
    const localStringSongs = localStorage.getItem("songs");
    if (localStringSongs) {
      const songsShapes = JSON.parse(localStorage.getItem("songs"));
      songsShapes.forEach((songShape) => {
        const song = new Song(
          songShape.title,
          songShape.author,
          songShape.length,
          songShape.album,
          songShape.photoUrl,
          songShape.isLiked
        );
        this.songs.push(song);
      });
    }
  }
  createNewSong() {
    const titleSong = document.getElementById("song-title").value;
    const authorSong = document.getElementById("song-author").value;
    const lengthSong = document.getElementById("song-length").value;
    const albumSong = document.getElementById("song-album").value;
    const photoUrlSong = document.getElementById("song-photo-url").value;

    const isLiked = false;

    if (!titleSong) {
      alert("Enter title!");
      return;
    }
    if (!authorSong) {
      alert("Enter author!");
      return;
    }
    if (!lengthSong) {
      alert("Enter lengthSong!");
      return;
    }
    if (!albumSong) {
      alert("Enter album!");
      return;
    }
    if (!photoUrlSong) {
      alert("Enter photo url!");
      return;
    }
    const song = new Song(
      titleSong,
      authorSong,
      lengthSong,
      albumSong,
      photoUrlSong,
      isLiked
    );
    this.songs.push(song);
    this.saveSongInLocalStorage();

    document.getElementById("song-title").value = "";
    document.getElementById("song-author").value = "";
    document.getElementById("song-length").value = "";
    document.getElementById("song-album").value = "";
    document.getElementById("song-photo-url").value = "";
  }
  initCreateNewSong() {
    document.getElementById("add-song").addEventListener("click", () => {
      this.createNewSong();
    });
  }

  playNextSong() {}
  playPreviousSong() {}
  initChangeSong() {
    document.getElementById("next-song").addEventListener("click", () => {
      this.playNextSong();
    });
    document.getElementById("previous-song").addEventListener("click", () => {
      this.playPreviousSong();
    });
  }
}

class UI {
  constructor() {
    this.initOpenAddNewSongForm();
  }
  openAddNewSongForm() {
    document.querySelector(".form-box").classList.toggle("form-box--active");
    document
      .querySelector(".open-form")
      .classList.toggle("open-form--disactive");
  }
  initOpenAddNewSongForm() {
    document.getElementById("open-form-btn").addEventListener("click", () => {
      this.openAddNewSongForm();
    });
  }
}

const songs = new Songs();
const ui = new UI();
