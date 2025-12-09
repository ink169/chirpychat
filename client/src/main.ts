import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskType
} from "@heygen/streaming-avatar";

// Add these imports at the top of your file
import { AudioRecorder } from './audio-handler';

// DOM elements
const videoElement = document.getElementById("avatarVideo") as HTMLVideoElement;
const startButton = document.getElementById(
  "startSession"
) as HTMLButtonElement;
const endButton = document.getElementById("endSession") as HTMLButtonElement;
const speakButton = document.getElementById("speakButton") as HTMLButtonElement;
const userInput = document.getElementById("userInput") as HTMLInputElement;
const recordButton = document.getElementById("recordButton") as HTMLButtonElement;
const recordingStatus = document.getElementById("recordingStatus") as HTMLParagraphElement;

// voice elements
const textModeBtn = document.getElementById("textModeBtn") as HTMLButtonElement;
const voiceModeBtn = document.getElementById("voiceModeBtn") as HTMLButtonElement;
const textModeControls = document.getElementById("textModeControls") as HTMLElement;
const voiceModeControls = document.getElementById("voiceModeControls") as HTMLElement;
const voiceStatus = document.getElementById("voiceStatus") as HTMLElement;



let avatar: StreamingAvatar | null = null;
let sessionData: any = null;
let audioRecorder: AudioRecorder | null = null;
let isRecording = false;
// mode tracking
let currentMode: "text" | "voice" = "text";

// Helper function to fetch access token
async function fetchAccessToken(): Promise<string> {
  const apiKey = import.meta.env.VITE_HEYGEN_API_KEY;
  const response = await fetch(
    "https://api.heygen.com/v1/streaming.create_token",
    {
      method: "POST",
      headers: { "x-api-key": apiKey },
    }
  );

  const { data } = await response.json();
  return data.token;
}

// Initialize streaming avatar session
async function initializeAvatarSession() {
  const token = await fetchAccessToken();
  avatar = new StreamingAvatar({ token });

  avatar.on(StreamingEvents.STREAM_READY, handleStreamReady);
  avatar.on(StreamingEvents.STREAM_DISCONNECTED, handleStreamDisconnected);
  
  sessionData = await avatar.createStartAvatar({
    quality: AvatarQuality.Low,
    //avatarName: "Wayne_20240711",
    disableIdleTimeout: true,
    language: "en",  // Use correct language code
    avatarName: "Ann_Therapist_public",
  });

  console.log("Session data:", sessionData);

  // Enable end button and disable start button
  endButton.disabled = false;
  startButton.disabled = true;

// Add voice chat event listeners
  avatar.on(StreamingEvents.USER_START, () => {
    voiceStatus.textContent = "Listening...";
  });
  avatar.on(StreamingEvents.USER_STOP, () => {
    voiceStatus.textContent = "Processing...";
  });
  avatar.on(StreamingEvents.AVATAR_START_TALKING, () => {
    voiceStatus.textContent = "Avatar is speaking...";
  });
  avatar.on(StreamingEvents.AVATAR_STOP_TALKING, () => {
    voiceStatus.textContent = "Waiting for you to speak...";
  });
}

// Handle when avatar stream is ready
function handleStreamReady(event: any) {
  if (event.detail && videoElement) {
    videoElement.srcObject = event.detail;
    videoElement.onloadedmetadata = () => {
      videoElement.play().catch(console.error);
      voiceModeBtn.disabled = false;  // Enable voice mode after stream is ready
    };
  } else {
    console.error("Stream is not available");
  }
}

// Handle stream disconnection
function handleStreamDisconnected() {
  console.log("Stream disconnected");
  if (videoElement) {
    videoElement.srcObject = null;
  }

  // Enable start button and disable end button
  startButton.disabled = false;
  endButton.disabled = true;
}

// End the avatar session
async function terminateAvatarSession() {
  if (!avatar || !sessionData) return;

  await avatar.stopAvatar();
  videoElement.srcObject = null;
  avatar = null;
}

// Handle speaking event
async function handleSpeak() {
  if (avatar && userInput.value) {
    await avatar.speak({
      text: userInput.value,
    });
    userInput.value = ""; // Clear input after speaking
  }
}

// Speech-to-text integration

// Add this function to handle speaking text
async function speakText(text: string) {
    if (avatar && text) {
        await avatar.speak({
            text: text,
        });
    }
}

// Add these functions for audio recording
function initializeAudioRecorder() {
    audioRecorder = new AudioRecorder(
        (status) => {
            recordingStatus.textContent = status;
        },
        (text) => {
            speakText(text);
        }
    );
}

async function toggleRecording() {
    if (!audioRecorder) {
        initializeAudioRecorder();
    }

    if (!isRecording) {
        recordButton.textContent = "Stop Recording";
        await audioRecorder?.startRecording();
        isRecording = true;
    } else {
        recordButton.textContent = "Start Recording";
        audioRecorder?.stopRecording();
        isRecording = false;
    }
  }

async function startVoiceChat() {
  if (!avatar) return;
  
  try {
    await avatar.startVoiceChat();
    voiceStatus.textContent = "Waiting for you to speak...";
  } catch (error) {
    console.error("Error starting voice chat:", error);
    voiceStatus.textContent = "Error starting voice chat";
  }
}

async function switchMode(mode: "text" | "voice") {
  if (currentMode === mode) return;  
  currentMode = mode;
  
  if (mode == "text") {
    console.log("attempting text switch");
    textModeBtn.classList.remove("active");
    voiceModeBtn.classList.add("active");
    //textModeControls.style.display = "block";
    //voiceModeControls.style.display = "none";
    if (avatar) {
      await avatar.closeVoiceChat();
    }
  } else {
    textModeBtn.classList.add("active");
    voiceModeBtn.classList.remove("active");
    //textModeControls.style.display = "none";
    //voiceModeControls.style.display = "block";
    if (avatar) {
      await startVoiceChat();
    }
  }
}

// Event listeners for buttons
startButton.addEventListener("click", initializeAvatarSession);
endButton.addEventListener("click", terminateAvatarSession);
speakButton.addEventListener("click", handleSpeak);
recordButton.addEventListener("click", toggleRecording);
textModeBtn.addEventListener("click", () => switchMode("text"));
voiceModeBtn.addEventListener("click", () => switchMode("voice"));

