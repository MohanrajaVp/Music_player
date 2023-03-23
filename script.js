

const content =document.querySelector(".content"),
Playimage = content.querySelector(".music-image img"),
musicName = content.querySelector(".music-titles .name"),
musicArtist = content.querySelector(".music-titles .artist"),
Audio = content.querySelector(".main-song"),
playBtn = content.querySelector(".play-pause"),
playBtnIcon = content.querySelector(".play-pause span"),
nextBtn = content.querySelector("#next"),
prevtBtn = content.querySelector("#prev"),
progressBar = content.querySelector(".progress-bar"),
progessDetais = content.querySelector(".progress-details"),
repeatBtn=content.querySelector("#repeat"),
Shuffle=content.querySelector("#shuffle");
let index=1;

window.addEventListener("load", ()=>{
loadData(index);


});

function loadData(indexValue){
    
musicName.innerHTML = songs[indexValue-1].name;
musicArtist.innerHTML = songs[indexValue-1].artist;
Playimage.src = "images/"+songs[indexValue-1].img+".jpg";
Audio.src="music/"+songs[indexValue-1].audio+".mp3";
}

playBtn.addEventListener("click", ()=>{
      
    const isMusicPaused = content.classList.contains("paused");
    if(isMusicPaused){
        pauseSong();
    }
    else{
        playSong();
    }
});

function playSong(){
    content.classList.add("paused");
    playBtnIcon.innerHTML="pause";
    Audio.play();
}

function pauseSong(){

    content.classList.remove("paused");
    playBtnIcon.innerHTML="play_arrow";
    Audio.pause();
}

nextBtn.addEventListener("click", ()=>{

nextSong();
});
prevtBtn.addEventListener("click", ()=>{
    
  prevSong();
});

function nextSong(){

     index++;
     if(songs.length<index){
        index=1;
     }
     else{   
        index=index;
     }
     loadData(index);
     Audio.play();
}
function prevSong(){

    index--;
    if(index<=0){
     index=songs.length;
    }
    else{
        index=index;
    }
    loadData(index);
    Audio.play();
}

Audio.addEventListener("timeupdate", (e)=>{
   
    const initialTime = e.target.currentTime;
    const finishTime = e.target.duration;
    let Barwidth = (initialTime/finishTime)*100; 
    progressBar.style.width=Barwidth+"%";
    
    progessDetais.addEventListener("click", (e)=>{

        let progressValue = progessDetais.clientWidth;
        let clickedOffsetX=e.offsetX;
        let MusicDuration = Audio.duration;

        Audio.currentTime = (clickedOffsetX/progressValue)*MusicDuration;
    });

    Audio.addEventListener("loadeddata", ()=>{

        let finalTimeData = content.querySelector(".final");

        let AudioDuration = Audio.duration;
        
        let finalMunites = parseInt(AudioDuration/60);
        let finalSeconds =parseInt(AudioDuration%60);
        finalTimeData.innerText = finalMunites+":"+finalSeconds;
        
    });
    let currentTimeData = content.querySelector(".current");
    let CurrentTime=Audio.currentTime;
    let currentMunites = parseInt(CurrentTime/60);
        let currentSeconds = parseInt(CurrentTime%60);
       currentTimeData.innerText =currentMunites+":"+currentSeconds;
    
       repeatBtn.addEventListener("click", ()=>{

        Audio.currentTime=0;
       });
    
});

Shuffle.addEventListener("click", ()=>{

    var randIndex= parseInt(Math.random()*songs.length)+1;
    loadData(randIndex);
    playSong();
});

Audio.addEventListener("ended", ()=>{

    index++;
    if(index>songs.length){
     index=1;
    }
    loadData(index);
    playSong();
});