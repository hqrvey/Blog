let playingMusic = -1;

const music = document.querySelector('#audio');
const chosenMusic = document.querySelectorAll('.music');
const seekBar = document.querySelector('.seek-bar');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist-name');
const album = document.querySelector('.player-photo');
const startTime = document.querySelector('.current-time');
const endTime = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const playerContainer = document.querySelector('.player-container');
const backSide = document.querySelector('.back');
const backTitle = document.querySelector('.back-title');
const backArtist = document.querySelector('.back-artist');
const desc = document.querySelector('.desc');

playBtn.addEventListener('click', () => {
    if (playBtn.className.includes('pause')) {
        music.play();
        album.classList.add('play');
    } else {
        music.pause();
        album.classList.remove('play');
    }

    playBtn.classList.toggle('pause');
    playBtn.classList.toggle('play');
});

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    playingMusic = i;
    music.src = song.path;

    title.innerHTML = song.title;
    artist.innerHTML = song.artist;
    album.style.backgroundImage = `url('${song.cover}')`;

    backTitle.innerHTML = song.title;
    backArtist.innerHTML = song.artist;
    desc.innerHTML = song.desc;

    startTime.innerHTML = '00:00';
    setTimeout(() => {
        seekBar.max = music.duration;
        endTime.innerHTML = formatTime(music.duration);
    }, 300)
}

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);

    if (min < 10) {
        min = `0${min}`;
    }

    if (sec < 10) {
        sec = `0${sec}`;
    }

    return `${min} : ${sec}`;
}

setInterval(() => {
    seekBar.value = music.currentTime;
    startTime.innerHTML = formatTime(music.currentTime);
}, 500);

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
});

chosenMusic.forEach((item, index) => {
    item.addEventListener('click', () => {
        chosenMusic.forEach(item => item.classList.remove('active'));
        item.classList.add('active');

        setMusic(index);
        music.play();

        playBtn.classList.remove('pause');
        playBtn.classList.add('play');
        
        album.classList.remove('play');
        setTimeout(() => {
            album.classList.add('play');
        }, 300); 
    });
});

prevBtn.addEventListener('click', () => {
    if (playingMusic <= 0) {
        playingMusic = songs.length - 1;
    }
    else {
        playingMusic--;
    }

    setMusic(playingMusic);
    music.play();

    playBtn.classList.remove('pause');
    playBtn.classList.add('play');

    album.classList.remove('play');
    setTimeout(() => {
        album.classList.add('play');
    }, 300); 

    chosenMusic.forEach(item => item.classList.remove('active'));
    chosenMusic[playingMusic].classList.add('active');
});

nextBtn.addEventListener('click', () => {
    if (playingMusic >= songs.length - 1 || playingMusic == -1) {
        playingMusic = 0;
    }
    else {
        playingMusic++;
    }

    setMusic(playingMusic);
    music.play();

    playBtn.classList.remove('pause');
    playBtn.classList.add('play');

    album.classList.remove('play');
    setTimeout(() => {
        album.classList.add('play');
    }, 300); 

    chosenMusic.forEach(item => item.classList.remove('active'));
    chosenMusic[playingMusic].classList.add('active');
});

album.addEventListener('click', () => {
    playerContainer.classList.toggle('flip');
});

backSide.addEventListener('click', () => {
    playerContainer.classList.remove('flip');
});