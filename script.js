// Valentine's Day Proposal 
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const imageContainer = document.getElementById('imageContainer');
    const imageInput = document.getElementById('imageInput');
    const previewImage = document.getElementById('previewImage');
    const placeholderText = document.querySelector('.placeholder-text');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const celebrationOverlay = document.getElementById('celebrationOverlay');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const fallingHearts = document.getElementById('fallingHearts');
    
    // Configuration
    const ESCAPE_SPEED = 3;
    const ESCAPE_DISTANCE = 100;
    
    // Initialize falling hearts
    createFallingHearts();
    
    // Image Upload Functionality
    imageContainer.addEventListener('click', function() {
        imageInput.click();
    });
    
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImage.src = event.target.result;
                previewImage.style.display = 'block';
                placeholderText.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Drag and drop for image
    imageContainer.addEventListener('dragover', function(e) {
        e.preventDefault();
        imageContainer.style.borderColor = '#c9184a';
    });
    
    imageContainer.addEventListener('dragleave', function(e) {
        e.preventDefault();
        imageContainer.style.borderColor = '#ff6b9d';
    });
    
    imageContainer.addEventListener('drop', function(e) {
        e.preventDefault();
        imageContainer.style.borderColor = '#ff6b9d';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImage.src = event.target.result;
                previewImage.style.display = 'block';
                placeholderText.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Escaping "No" Button
    noBtn.addEventListener('mouseover', function() {
        escapeNoButton();
    });
    
    noBtn.addEventListener('click', function() {
        escapeNoButton();
    });
    
    function escapeNoButton() {
        const container = document.querySelector('.buttons-section');
        const containerRect = container.getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();
        
        // Get random direction
        const directions = [
            { x: -1, y: -1 }, // top-left
            { x: 1, y: -1 },  // top-right
            { x: -1, y: 1 },  // bottom-left
            { x: 1, y: 1 },   // bottom-right
            { x: 0, y: -1 },  // top
            { x: 0, y: 1 },   // bottom
            { x: -1, y: 0 },  // left
            { x: 1, y: 0 }    // right
        ];
        
        const randomDir = directions[Math.floor(Math.random() * directions.length)];
        const distance = ESCAPE_DISTANCE + Math.random() * 50;
        
        let newX = btnRect.left + (randomDir.x * distance);
        let newY = btnRect.top + (randomDir.y * distance);
        
        // Keep within viewport bounds
        newX = Math.max(10, Math.min(window.innerWidth - btnRect.width - 10, newX));
        newY = Math.max(10, Math.min(window.innerHeight - btnRect.height - 10, newY));
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        noBtn.style.zIndex = '100';
        
        // Add escape animation
        noBtn.style.transition = 'all 0.2s ease-out';
        noBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            noBtn.style.transform = 'scale(1)';
        }, 200);
    }
    
    // "Yes" Button - Celebration
    yesBtn.addEventListener('click', function() {
        celebrate();
    });
    
    function celebrate() {
        // Show celebration overlay
        celebrationOverlay.classList.add('show');
        
        // Add extra celebration hearts
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createCelebrationHeart();
            }, i * 50);
        }
        
        // Stop music or change to celebration music
        //if (!bgMusic.paused) {
            //bgMusic.pause();
            //musicToggle.textContent = '🎵';
            //musicToggle.classList.remove('playing');
        //}
    }
    
    function createCelebrationHeart() {
        const heart = document.createElement('div');
        heart.className = 'celebration-heart';
        heart.innerHTML = ['💖', '💕', '💗', '💓', '💘', '❤️'][Math.floor(Math.random() * 6)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-50px';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.animation = `celebrateFall ${Math.random() * 2 + 2}s linear forwards`;
        heart.style.zIndex = '1001';
        heart.style.pointerEvents = 'none';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
    
    // Add celebration animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebrateFall {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(110vh) rotate(720deg) scale(0.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Music Toggle
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play().catch(e => {
                console.log('Audio playback requires user interaction first');
                alert('Please click anywhere on the page first to enable audio!');
            });
            musicToggle.textContent = '🎵';
            musicToggle.classList.add('playing');
        } else {
            bgMusic.pause();
            musicToggle.textContent = '🎵';
            musicToggle.classList.remove('playing');
        }
    });
    
    // Auto-play music on first click 
    document.body.addEventListener('click', function() {
        if (bgMusic.paused && !musicToggle.classList.contains('playing')) {
            // Auto-play
            bgMusic.play().catch(() => {});
        }
    }, { once: true });
    
    // Create Falling Hearts Background
    function createFallingHearts() {
        const heartSymbols = ['💖', '💕', '💗', '💓', '💘', '❤️'];
        
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
            heart.style.animationDelay = (Math.random() * 10) + 's';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.opacity = Math.random() * 0.5 + 0.3;
            fallingHearts.appendChild(heart);
        }
    }
    
    // Click anywhere to close celebration overlay
    celebrationOverlay.addEventListener('click', function() {
        this.classList.remove('show');
    });
    
    // Add romantic surprise on "Yes" button hover
    yesBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    yesBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Console welcome message
    console.log('💕 Happy Valentine\'s Day, my love! 💕');
    console.log('Made with love ❤️');
});

