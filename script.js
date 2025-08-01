// --- DOM Element Selection ---
const video = document.getElementById('video');
const audioPlayer = document.getElementById('audio-player');
const mp3Upload = document.getElementById('mp3-upload');
const loadingModal = document.getElementById('loading-modal');
const loadingText = document.getElementById('loading-text');
const statusText = document.getElementById('status-text');
const visualizer = document.getElementById('visualizer');
const albumArt = document.getElementById('album-art');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const geminiButton = document.getElementById('gemini-button');
const geminiResponseContainer = document.getElementById('gemini-response-container');
const geminiResponse = document.getElementById('gemini-response');
const geminiLoading = document.getElementById('gemini-loading');

// --- State Management ---
let musicReady = false;
let faceModelsReady = false;
let musicIsPlaying = false;
let detectionInterval;

// --- 1. Load Face Detection Models ---
async function loadModels() {
    const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights';
    try {
        loadingText.innerText = "Loading Tiny Face Detector...";
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        faceModelsReady = true;
        console.log("Face models loaded successfully.");
        updateLoadingState();
    } catch (error) {
        console.error("Error loading face models:", error);
        loadingText.innerText = "Error loading models. Please refresh the page.";
    }
}

// --- 2. Start Webcam ---
async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        video.srcObject = stream;
        console.log("Webcam started successfully.");
    } catch (err) {
        console.error("Error accessing webcam:", err);
        loadingText.innerText = "Could not access webcam. Please grant permission and refresh.";
    }
}

// --- 3. Handle Music Upload ---
mp3Upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'audio/mpeg') {
        const fileURL = URL.createObjectURL(file);
        audioPlayer.src = fileURL;
        musicReady = true;
        
        // Clean up the filename to be a better prompt
        songTitle.textContent = file.name.replace(/\.mp3$/i, '').replace(/_/g, ' ');
        songArtist.textContent = "Your Uploaded Song";
        
        albumArt.src = 'https://placehold.co/400x400/1f2937/818cf8?text=Ready!';
        albumArt.classList.add('border-indigo-500');
        
        geminiButton.classList.remove('hidden');
        geminiResponseContainer.classList.add('hidden');
        geminiResponse.textContent = '';
        
        console.log("Music is ready to play.");
        updateLoadingState();
    } else {
        console.error("Invalid file type. Please select an MP3 file.");
        musicReady = false;
    }
});

// --- 4. Core Face Detection Logic ---
function startFaceDetection() {
    if (detectionInterval) clearInterval(detectionInterval);
    detectionInterval = setInterval(async () => {
        if (video.readyState < 3 || !faceModelsReady) return;
        
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());

        if (detections.length > 0) {
            if (musicReady && !musicIsPlaying) playMusic();
        } else {
            if (musicIsPlaying) pauseMusic();
        }
    }, 500);
}

// --- 5. Gemini API Call ---
geminiButton.addEventListener('click', getSongInfo);

async function getSongInfo() {
    const currentSongTitle = songTitle.textContent;
    if (!currentSongTitle || currentSongTitle === 'No Song Selected') return;

    geminiResponseContainer.classList.remove('hidden');
    geminiResponse.textContent = '';
    geminiLoading.style.display = 'flex';
    
    const prompt = `Tell me a short, interesting fact or a mini-bio about the song or artist for "${currentSongTitle}". Keep it concise and engaging, around 2-3 sentences.`;
    
    const apiKey = "AIzaSyAniKDwfqh8K_QDQ3tr7T15fAc-22dcD7E"; // IMPORTANT: Paste your API key here!
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    
    const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }]
    };

    try {
        const response = await fetchWithBackoff(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const result = await response.json();
        
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
            // Check if the response indicates it couldn't find the song
            if (text.toLowerCase().includes("i don't have any information") || text.toLowerCase().includes("rather than the name of a specific song")) {
                 geminiResponse.textContent = "I couldn't find any info for that title. Try renaming the file to something more specific, like 'Artist - Song Title'.";
            } else {
                geminiResponse.textContent = text;
            }
        } else {
            throw new Error("No content found in API response.");
        }

    } catch (error) {
        console.error("Gemini API Error:", error);
        geminiResponse.textContent = "Sorry, I couldn't fetch info for this song right now. Check the console for errors.";
    } finally {
        geminiLoading.style.display = 'none';
    }
}

// Utility for fetch with exponential backoff
async function fetchWithBackoff(url, options, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.status !== 429 && response.status < 500) {
                return response;
            }
            throw new Error(`Server error or rate limited: ${response.status}`);
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
        }
    }
}

// --- Music Control Functions ---
function playMusic() {
    audioPlayer.play().catch(e => console.error("Audio play failed:", e));
    musicIsPlaying = true;
    statusText.textContent = "FACE DETECTED";
    statusText.classList.remove('text-amber-400');
    statusText.classList.add('text-green-400');
    visualizer.classList.add('pulse-animation', 'opacity-70');
}

function pauseMusic() {
    audioPlayer.pause();
    musicIsPlaying = false;
    statusText.textContent = "LOOK AT THE CAMERA TO PLAY";
    statusText.classList.remove('text-green-400');
    statusText.classList.add('text-amber-400');
    visualizer.classList.remove('pulse-animation', 'opacity-70');
}

// --- UI Update Functions ---
function updateLoadingState() {
    if (faceModelsReady && video.srcObject) {
        loadingModal.style.opacity = '0';
        setTimeout(() => { loadingModal.style.display = 'none'; }, 500);
        startFaceDetection();
    }
}

// --- Initializer ---
async function initialize() {
    await loadModels();
    await startWebcam();
    video.addEventListener('loadeddata', updateLoadingState);
}

// Start the application
initialize();
