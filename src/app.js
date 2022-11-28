const playBtn = document.querySelector('.play'),
    prevBtn = document.querySelector('.prev'),
    nextBtn = document.querySelector('.next'),
    title = document.querySelector('.title'),
    author = document.querySelector('.author'),
    image = document.querySelector('img'),
    progress = document.querySelector('.line-progress'),
    line = document.querySelector('.line'),
    time = document.querySelector('.time'),
    repeat = document.querySelector('.repeat'),
    like = document.querySelector('.like');

const audioTag = document.createElement('audio');

const songs = [{
        author: 'Markul',
        title: 'Худший друг',
        src: '../audio/Markul-Худший друг.mp3',
        image: '../assets/img/markul.jpg',
        likeFlag: false
    },
    {
        author: 'T-Fest',
        title: 'Одно я знал',
        src: '../audio/T-Fest-Одно я знал.mp3',
        image: '../assets/img/t-fest.jpg',
        likeFlag: false
    },
    {
        author: 'Тима Белорусских',
        title: 'Одуванчик',
        src: '../audio/Тима Белорусских-Одуванчик.mp3',
        image: '../assets/img/tima.jpg',
        likeFlag: false
    },
    {
        author: 'Miyagi & Andy Panda',
        title: 'Minor',
        src: '../audio/Miyagi & Andy Panda-Minor.mp3',
        image: '../assets/img/miyagi.jpg',
        likeFlag: false
    },
    {
        author: 'O.G EzzY',
        title: 'Шёлковая простынь',
        src: '../audio/O.G EzzY-Шёлковая простынь.mp3',
        image: '../assets/img/ezzy.jpg',
        likeFlag: false
    },
    {
        author: 'Камбулат',
        title: 'Выпей меня до тла',
        src: '../audio/Камбулат-Выпей меня до тла.mp3',
        image: '../assets/img/kambulat.jpg',
        likeFlag: false
    },
    {
        author: 'Каста',
        title: 'Выходи гулять',
        src: '../audio/Каста-Выходи гулять.mp3',
        image: '../assets/img/kasta.jpg',
        likeFlag: false
    },
    {
        author: '10Age',
        title: 'Мандариновые горы',
        src: '../audio/10AGE-Мандариновые горы.mp3',
        image: '../assets/img/10age.jpg',
        likeFlag: false
    },
    {
        author: 'Xcho',
        title: 'Ты и Я',
        src: '../audio/Xcho-Ты и Я.mp3',
        image: '../assets/img/xcho.jpg',
        likeFlag: false
    },
    {
        author: 'Kizaru',
        title: 'Дежавю',
        src: '../audio/Kizaru-Дежавю.mp3',
        image: '../assets/img/kizaru.jpg',
        likeFlag: false
    },
];

let playFlag = false,
repeatFlag = false,
likeFlag = false,
indexOfSong = 0;

title.innerHTML = songs[indexOfSong].title;
author.innerHTML = songs[indexOfSong].author;
image.src = songs[indexOfSong].image;
audioTag.src = songs[indexOfSong].src;


playBtn.addEventListener('click', () => {
    currentSong();
});

prevBtn.addEventListener('click', () => {
    if (indexOfSong === 0) {
        indexOfSong = songs.length - 1;
    } else {
        indexOfSong--;
    }
    changeSong();
});

nextBtn.addEventListener('click', () => {
    if (indexOfSong === songs.length - 1) {
        indexOfSong = 0;
    } else {
        indexOfSong++;
    }
    changeSong();
});

function changeSong() {
    audioTag.src = songs[indexOfSong].src;
    title.innerHTML = songs[indexOfSong].title;
    author.innerHTML = songs[indexOfSong].author;
    image.src = songs[indexOfSong].image;
    audioTag.play();
    playFlag = true;
    playBtn.style = 'background-image: url(../assets/icons/pause.svg)';
    if (!songs[indexOfSong].likeFlag) {
        like.style = 'background-image: url(../assets/icons/like.svg);';
    } else {
        like.style = 'background-image: url(../assets/icons/like-green.png);';
    }
}

function currentSong() {
    if (!playFlag) {
        playBtn.style = 'background-image: url(../assets/icons/pause.svg)';
        audioTag.play();
        playFlag = true;
    } else {
        playBtn.style = 'background-image: url(../assets/icons/play.svg)';
        audioTag.pause();
        playFlag = false;
    }
}

audioTag.addEventListener('timeupdate', (event) => {
    const duration = event.target.duration;
    const currentTime = event.target.currentTime;
    const progressPercent = (currentTime / duration) * 100;
    line.style.width = `${progressPercent}%`;

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentMin < 10) currentMin = `0${currentMin}`;
    if (currentSec < 10) currentSec = `0${currentSec}`;
    time.innerText = `${currentMin}:${currentSec}`;
});

function setProgress(event) {
    const width = this.clientWidth;
    const clickLineProgress = event.offsetX;
    const duration = audioTag.duration;

    audioTag.currentTime = (clickLineProgress / width) * duration;
}

progress.addEventListener('click', setProgress);

audioTag.addEventListener('ended', () => {
    if (indexOfSong === songs.length - 1) {
        indexOfSong = 0;
    } else {
        indexOfSong++;
    }
    changeSong();
});

repeat.addEventListener('click', () => {
    if (!repeatFlag) {
        repeat.style = `background-image: url(../assets/icons/repeat-green.png);
                        animation: 3s linear 0s normal none infinite running repeat;
                        -webkit-animation: 3s linear 0s normal none infinite running repeat;`;
        audioTag.addEventListener('ended', () => {
            indexOfSong--;
            changeSong();
        });
        repeatFlag = true;
    } else {
        repeat.style = `background-image: url(../assets/icons/repeat.svg); 
                        animation: none;
                        -webkit-animation: none;`;
        repeatFlag = false;
    }
});

like.addEventListener('click', () => {
    if (!songs[indexOfSong].likeFlag) {
        like.style = 'background-image: url(../assets/icons/like-green.png);';
        songs[indexOfSong].likeFlag = true;
    } else {
        like.style = 'background-image: url(../assets/icons/like.svg);';
        songs[indexOfSong].likeFlag = false;
    }
});