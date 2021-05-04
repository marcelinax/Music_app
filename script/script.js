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

    let content = `
      <div class="song-box-top-menu"></div>
        <div class="song-box-about-song">
          <div class="song-avatar">
            <img src=${this.photoUrl} alt="" />
          </div>
          <div class="song-details">
            <p class="title">${this.title}</p>
            <p class="author">${this.author}</p>
            <p class="length">${this.length}</p>
          </div>
        </div>
        <div class="song-box-bottom-menu">
        <button id="next-song">NEXT</button>
        <button id="previous-song">PREVIOUS</button>
        </div>
      `;
    songBox.innerHTML = content;
    document.querySelector("main").appendChild(songBox);
  }
}

class Songs {
  songs = [];
  constructor() {
    this.initCreateNewSong();
    this.readSongsFromLocalStorage();
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
          songShape.photoUrl
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
      photoUrlSong
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
}

const songs = new Songs();
