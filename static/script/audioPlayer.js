const videoIds = ['O7K6gMwWuks', 'im6tbN9SZXs', 'npOxbkubyEA'];

var currentIndex = 0;
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: videoIds[currentIndex],
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        allow: 'autoplay'
    });
}

function onPlayerReady(event) {
    // Play the first video when the player is ready
    var playButton = document.getElementById('playButton');
    playButton.addEventListener('click', function() {
        var playerState = event.target.getPlayerState();
        var isMuted = event.target.isMuted();
        // console.log(playerState);
        // if (playerState === YT.PlayerState.PLAYING) {
        //     event.target.mute();
        // }
        // else if (playerState === YT.PlayerState.BUFFERING) {
        //     setTimeout(function() {
        //         event.target.playVideo();
        //     }, 3000);
        // }
        if (playerState === YT.PlayerState.CUED) {
            event.target.playVideo();
        }
        else if (isMuted) {
            event.target.unMute();
        }
        else {
            event.target.mute();
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        // Play the next video when the current video ends
        playNextVideo();
    }
}

function playNextVideo() {
    // Increment the index to play the next video in the array
    currentIndex = (currentIndex + 1) % videoIds.length;

    // Set the source of the iframe to play the next video
    player.loadVideoById(videoIds[currentIndex]);
}