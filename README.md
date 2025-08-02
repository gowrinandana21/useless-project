<img width="3188" height="1202" alt="frame (3)" src="https://github.com/user-attachments/assets/517ad8e9-ad22-457d-9538-a9e62d137cd7" />


# Sun Lo Na 🎯


## Basic Details
### Team Name: Halfbaked


### Team Members
- Team Lead: Aneena Cherian - Model Engineering College
- Member 2: Gowri Nandana - Model Engineering College

### Project Description
"Sun Lo Na" is an intelligent music listener that plays your uploaded track only when you look directly at the camera. If you turn away, the music pauses — because this player wants your full attention. It also judges your music taste with playful feedback using AI.

### The Problem (that doesn't exist)
People dare to play music… and not even look at it. Music feels ignored, unseen, unloved. It wants attention. Your Spotify never cared if you were present — but we do.

### The Solution (that nobody asked for)
Introducing Sun Lo Na — a music listener that demands eye contact. Look away? The music stops. Look straight? It vibes with you. As a bonus, it even throws shade (or praise) at your music taste using AI. Because your playlist deserves to be judged.

## Technical Details
### Technologies/Components Used
For Software:
- **Languages used:** HTML, CSS, JavaScript  
- **Frameworks used:** None  
- **Libraries used:**  
  - [Face-api.js](https://github.com/justadudewhohacks/face-api.js) – for real-time face detection  
  - Tone.js – for managing audio playback  
- **Tools used:**  
  - VS Code  
  - Git & GitHub  
For Hardware:
- **Main components:**  
  - Laptop/PC with webcam  
- **Specifications:**
 - Internet connection (for loading face-api models)  
- **Tools required:**  
  - Webcam (built-in or external)  
  - No additional hardware needed  

### Implementation
For Software:

#### 🎯 Core Logic
- The website uses your webcam to detect your face using **Face API.js**, a browser-based face detection library.
- When your face is visible and you're looking straight at the camera, the music starts playing.
- If you look away or your face is no longer detected, the music automatically pauses.
- It also playfully "judges" your music by displaying funny messages based on the song name.

#### 🖥️ How It Works
- A simple HTML interface lets you upload and play your favorite MP3 file.
- JavaScript controls the audio and runs face detection using your webcam.
- The logic continuously checks for face presence in real-time.

# Installation
No installation required!

Just **download or clone the repository** and open the HTML file in your browser.

#### ▶️ How to Run

1. Open the project folder.
2. Double-click on `index.html`.
3. **Allow camera access** when prompted.
4. Upload your favorite song and make eye contact to play. Look away and it pauses.

> 💡 Tip: If the webcam doesn't work, use **Live Server** in VS Code or run it on localhost

# Screenshots (Add at least 3)
### 🟢 Initial Phase – App Interface Before Upload
![Screenshot1 - Initial Phase](https://github.com/user-attachments/assets/b83e8312-402b-462e-9308-431f8186e5b8)
*The main interface before uploading a music file or accessing the webcam.*

### 🟢 Face Detected – Music Plays and Judgement Begins
![Screenshot2 - Face Detected](https://github.com/user-attachments/assets/3c7933cf-229c-440b-ace2-38fa5431648f)
*When the user looks directly at the camera, face detection is successful and music starts playing.  
It also judges the music you picked and gives a playful comment on your taste.*

### 🔴 Face Not Detected – Music Pauses
![Screenshot3 - Face Not Detected](https://github.com/user-attachments/assets/3828083d-f489-45a4-90cb-57edf9e29f41)
*When the user looks away from the camera or face is not visible, the music automatically pauses.*

### Project Demo
# Video
https://drive.google.com/file/d/17ei25ozZ8hYVaRICkzFi59cCptqO7fQU/view?usp=sharing
The video demonstrates the working of our website Sun Lo Na.

## Team Contributions
- Aneena Cherian: Handled frontend and development.
- Gowri Nandana: Integrated Gemini API and planned overall structure.


---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--25-25?link=https%3A%2F%2Fwww.tinkerhub.org%2Fevents%2FQ2Q1TQKX6Q%2FUseless%2520Projects)


