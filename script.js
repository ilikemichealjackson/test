const songs = [
    { id: 1, title: "Forever v2", artist: "Kanye", cover: "51rhnW+7YXL._AC_.jpg", audio: "Forever_V2.mp3" },
    { id: 2, title: "On god act III", artist: "Kanye", cover: "51rhnW+7YXL._AC_.jpg", audio: "4batz_act_iii_on_god_she_like_Remix_V1.mp3" },
    { id: 3, title: "B****es_Do_Voodoo", artist: "Kanye", cover: "51rhnW+7YXL._AC_.jpg", audio: "Bitches_Do_Voodoo.mp3" },
    { id: 4, title: "Law of atraction v8", artist: "Kanye", cover: "51rhnW+7YXL._AC_.jpg", audio: "Law_Of_Attraction_V8.mp3" },
    { id: 5, title: "Preacher Man run it / running", artist: "Kanye", cover: "51rhnW+7YXL._AC_.jpg", audio: "Preacher_Man.mp3" }
    { id: 6, title: "Gimme a sec", artist: "Kanye", cover: "51rhnW+7YXL._AC_.jpg", audio: "Rich_The_Kid_Gimme_A_Second_2.mp3" },
    { id: 7, title: "Slide v7", artist: "Kanye", cover: "51rhnW+7YXL._AC_.jpg", audio: "Slide_V7.mp3" },
    { id: 8, title: "alien v18", artist: "Kanye", cover: "51rhnW+7YXL._AC_.jpg", audio: "Space_X_Alien_V18.mp3" },
    { id: 9, title: "The storm v15", artist: "Kanye", cover: "51rhnW+7YXL._AC_.jpg", audio: "XXX_The_Storm_V15.mp3" },
    { id: 10, title: "The storm v16", artist: "Kanye", cover: "51rhnW+7YXL._AC_.jpg", audio: "XXX_V16.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;
let rotation = 0;
let animationId;
let timestamps = [11, 37, 60, 90, 120];

const record = document.getElementById('record');
const albumCover = document.getElementById('albumCover');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const playBtn = document.getElementById('playBtn');
const playBtnIcon = document.getElementById('playBtnIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const discoverBtn = document.getElementById('discoverBtn');
const discovery = document.getElementById('discovery');
const discoveryContent = document.getElementById('discoveryContent');
const discoverySongTitle = document.getElementById('discoverySongTitle');
const discoveryArtistName = document.getElementById('discoveryArtistName');
const likeBtn = document.getElementById('likeBtn');
const closeDiscoveryBtn = document.getElementById('closeDiscoveryBtn');
const audioPlayer = document.getElementById('audioPlayer');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const saveTimestampsBtn = document.getElementById('saveTimestampsBtn');

function updatePlayerInfo() {
    const currentSong = songs[currentSongIndex];
    albumCover.src = currentSong.cover;
    songTitle.textContent = currentSong.title;
    artistName.textContent = currentSong.artist;
    audioPlayer.src = currentSong.audio;
}

function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        audioPlayer.play();
        playBtnIcon.src = "https://api.iconify.design/lucide:pause.svg?color=white";
        startRotation();
    } else {
        audioPlayer.pause();
        playBtnIcon.src = "https://api.iconify.design/lucide:play.svg?color=white";
        stopRotation();
    }
}

function startRotation() {
    function animate() {
        rotation += 1;
        record.style.transform = `rotate(${rotation}deg)`;
        animationId = requestAnimationFrame(animate);
    }
    animate();
}

function stopRotation() {
    cancelAnimationFrame(animationId);
}

function changeSong(direction)

 {
    currentSongIndex = (currentSongIndex + direction + songs.length) % songs.length;
    updatePlayerInfo();
    if (isPlaying) {
        audioPlayer.play();
    }
}

function showDiscovery() {
    discovery.style.display = 'block';
    loadRandomSong();
}

function hideDiscovery() {
    discovery.style.display = 'none';
}

function loadRandomSong() {
    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];
    discoveryContent.style.backgroundImage = `url(${randomSong.cover})`;
    discoverySongTitle.textContent = randomSong.title;
    discoveryArtistName.textContent = randomSong.artist;
}

let isDragging = false;
let lastMouseY;
let scratchSpeed = 1;

record.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseY = e.clientY;
    if (!isPlaying) {
        audioPlayer.play();
        startRotation();
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
        isDragging = false;
        scratchSpeed = 1;
        audioPlayer.playbackRate = 1;
        document.removeEventListener('mousemove', handleMouseMove);
    });
});

function handleMouseMove(e) {
    if (isDragging) {
        const deltaY = e.clientY - lastMouseY;
        rotation += deltaY * 0.5;
        record.style.transform = `rotate(${rotation}deg)`;
        lastMouseY = e.clientY;

        // Simulate audio scratching
        scratchSpeed = 1 - (deltaY * 0.01);
        scratchSpeed = Math.max(0.1, Math.min(scratchSpeed, 2)); // Limit speed between 0.1x and 2x
        audioPlayer.playbackRate = scratchSpeed;
    }
}

function jumpToTimestamp(index) {
    audioPlayer.currentTime = timestamps[index];
    if (!isPlaying) {
        togglePlay();
    }
}

function toggleSettings() {
    settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
}

function saveTimestamps() {
    for (let i = 1; i <= 5; i++) {
        const input = document.getElementById(`timestamp${i}`);
        const time = input.value.split(':');
        timestamps[i-1] = parseInt(time[0]) * 60 + parseInt(time[1]);
    }
    alert('Timestamps saved!');
}

// Make discovery phone draggable
let isDraggingPhone = false;
let phoneStartX, phoneStartY;

discovery.addEventListener('mousedown', (e) => {
    if (e.target === discovery) {
        isDraggingPhone = true;
        phoneStartX = e.clientX - discovery.offsetLeft;
        phoneStartY = e.clientY - discovery.offsetTop;
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingPhone) {
        discovery.style.left = `${e.clientX - phoneStartX}px`;
        discovery.style.top = `${e.clientY - phoneStartY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingPhone = false;
});

// Swipe functionality for discovery
let startY;
discoveryContent.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

discoveryContent.addEventListener('touchmove', (e) => {
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;
    if (Math.abs(deltaY) > 50) {
        loadRandomSong();
        startY = currentY;
    }
});

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeSong(-1));
nextBtn.addEventListener('click', () => changeSong(1));
discoverBtn.addEventListener('click', showDiscovery);
closeDiscoveryBtn.addEventListener('click', hideDiscovery);
likeBtn.addEventListener('click', () => {
    alert('Song added to liked!');
    addToLikedSongs(songs[currentSongIndex]);
});
settingsBtn.addEventListener('click', toggleSettings);
saveTimestampsBtn.addEventListener('click', saveTimestamps);

document.querySelectorAll('.timestamp-btn').forEach(btn => {
    btn.addEventListener('click', () => jumpToTimestamp(parseInt(btn.dataset.index)));
});

shuffleBtn.addEventListener('click', () => {
    alert('Shuffle functionality not implemented in this demo.');
});

repeatBtn.addEventListener('click', () => {
    alert('Repeat functionality not implemented in this demo.');
});

updatePlayerInfo();
