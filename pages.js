const pageContent = document.getElementById('pageContent');

const pages = {
    home: `
        <h1>Welcome to frevr unrlsd</h1>
        <p>Discover new music and enjoy your favorite tracks.</p>
    `,
    search: `
        <h1>Search</h1>
        <input type="text" placeholder="Search for songs, artists, or albums">
        <button>Search</button>
    `,
    library: `
        <h1>Your Library</h1>
        <div id="playlistContainer"></div>
    `,
    liked: `
        <h1>Liked Songs</h1>
        <div id="likedSongsContainer"></div>
    `,
    playlists: `
        <h1>Your Playlists</h1>
        <div id="userPlaylistsContainer"></div>
        <button id="createPlaylistBtn">Create New Playlist</button>
    `
};

let likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
let userPlaylists = JSON.parse(localStorage.getItem('userPlaylists')) || [];

function renderPage(pageName) {
    pageContent.innerHTML = pages[pageName];
    if (pageName === 'library') {
        renderLibrary();
    } else if (pageName === 'liked') {
        renderLikedSongs();
    } else if (pageName === 'playlists') {
        renderUserPlaylists();
    }
}

function renderLibrary() {
    const playlistContainer = document.getElementById('playlistContainer');
    playlistContainer.innerHTML = '';
    userPlaylists.forEach(playlist => {
        const playlistElement = document.createElement('div');
        playlistElement.classList.add('playlist-item');
        playlistElement.innerHTML = `
            <img src="${playlist.cover || 'https://picsum.photos/50'}" alt="${playlist.name}">
            <span>${playlist.name}</span>
        `;
        playlistElement.addEventListener('click', () => viewPlaylist(playlist));
        playlistContainer.appendChild(playlistElement);
    });
}

function renderLikedSongs() {
    const likedSongsContainer = document.getElementById('likedSongsContainer');
    likedSongsContainer.innerHTML = '';
    likedSongs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.classList.add('playlist-item');
        songElement.innerHTML = `
            <img src="${song.cover}" alt="${song.title}">
            <span>${song.title} - ${song.artist}</span>
        `;
        likedSongsContainer.appendChild(songElement);
    });
}

function renderUserPlaylists() {
    const userPlaylistsContainer = document.getElementById('userPlaylistsContainer');
    userPlaylistsContainer.innerHTML = '';
    userPlaylists.forEach(playlist => {
        const playlistElement = document.createElement('div');
        playlistElement.classList.add('playlist-item');
        playlistElement.innerHTML = `
            <img src="${playlist.cover || 'https://picsum.photos/50'}" alt="${playlist.name}">
            <span>${playlist.name}</span>
        `;
        playlistElement.addEventListener('click', () => viewPlaylist(playlist));
        userPlaylistsContainer.appendChild(playlistElement);
    });

    const createPlaylistBtn = document.getElementById('createPlaylistBtn');
    createPlaylistBtn.addEventListener('click', createNewPlaylist);
}

function viewPlaylist(playlist) {
    pageContent.innerHTML = `
        <h1>${playlist.name}</h1>
        <div id="playlistSongs"></div>
    `;
    const playlistSongs = document.getElementById('playlistSongs');
    playlist.songs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.classList.add('playlist-item');
        songElement.innerHTML = `
            <img src="${song.cover}" alt="${song.title}">
            <span>${song.title} - ${song.artist}</span>
        `;
        playlistSongs.appendChild(songElement);
    });
}

function createNewPlaylist() {
    const playlistName = prompt('Enter a name for your new playlist:');
    if (playlistName) {
        const newPlaylist = {
            id: Date.now(),
            name: playlistName,
            songs: []
        };
        userPlaylists.push(newPlaylist);
        saveUserPlaylists();
        renderUserPlaylists();
    }
}

function addToLikedSongs(song) {
    if (!likedSongs.some(s => s.id === song.id)) {
        likedSongs.push(song);
        saveLikedSongs();
    }
}

function saveLikedSongs() {
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
}

function saveUserPlaylists() {
    localStorage.setItem('userPlaylists', JSON.stringify(userPlaylists));
}

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => renderPage(item.dataset.page));
});

// Initial page render
renderPage('home');