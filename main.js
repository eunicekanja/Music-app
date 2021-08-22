'use strict'
const musicContainer=document.querySelector('.music-container');
const playBtn=document.querySelector('#play');
const prevBtn=document.querySelector('#prev');
const nextBtn=document.querySelector('#next');
const audio=document.querySelector('#audio');
const progress=document.querySelector('.progress');
const cover=document.querySelector('#cover');
const title=document.querySelector('#title');
const progressContainer=document.querySelector('.progress-container');
const icon=document.querySelector('i.fas');

//song titles
const songs=[
    'Bad Idea','Fake Smile','Make Up','Young Blood'
]
//keep track of songs
let songIndex=2;
//load song info, calling function load song with song index as parameter
loadSong(songIndex)
function loadSong(song){
title.innerText=songs[song];
audio.src=`music/audio-${song}.mp3`
cover.src=`images/song-${song}.jpg`
}
//click button event
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play()
}
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause()
}
playBtn.addEventListener('click',function(){
    const isPlaying=musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong()
    }
    else{
        playSong()
    }
})
//change song
function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1
    }
    loadSong(songIndex);
    playSong()
}
function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0
    }
    loadSong(songIndex);
    playSong() 
}
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong)
//progress bar
function updateProgress(e){
const{duration, currentTime}=e.srcElement;
const progressPercent=(currentTime/duration*100)
progress.style.width=`${progressPercent}%`
}
audio.addEventListener('timeupdate',updateProgress)
//change progress
function setProgress(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const duration=audio.duration;

    audio.currentTime=(clickX/width)*duration
}
progressContainer.addEventListener('click',setProgress);

audio.addEventListener('ended',nextSong)