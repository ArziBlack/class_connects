import React, { useEffect } from "react";
import {
  StreamVideo,
  StreamVideoClient,
  User,
  StreamCall,
  LivestreamPlayer,
  ParticipantView,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1F1aS1Hb25fSmlubiIsInVzZXJfaWQiOiJRdWktR29uX0ppbm4iLCJ2YWxpZGl0eV9pbl9zZWNvbmRzIjo2MDQ4MDAsImlhdCI6MTc0Nzk4NDY3NSwiZXhwIjoxNzQ4NTg5NDc1fQ.G5CMMtJrc8ZUmpPtFqWP0FlWgJa4jz5ln3_P9GROPPQ";
const userId = "Qui-Gon_Jinn";
const callId = "qUcwV6FykF6b";

const user: User = { id: userId, name: "Tutorial" };
const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("livestream", callId);
// call.getOrCreate();

export const StreamPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const joinCall = async () => {
      try {
        await call.join({ create: true });
      } catch (error) {
        console.error("Failed to join call:", error);
      }
    };
    joinCall();
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <div className="p-6 flex-1 overflow-auto">
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <LivestreamView />
            </StreamCall>
          </StreamVideo>
        </div>
        <div className="mt-6">
          <Button variant="primary" onClick={() => navigate(-1)}>
            Back to Class
          </Button>
        </div>
      </div>
    </div>
  );
};

const LivestreamView = () => {
  const {
    useCameraState,
    useMicrophoneState,
    useParticipantCount,
    useIsCallLive,
    useParticipants,
  } = useCallStateHooks();

  const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
  const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();

  const participantCount = useParticipantCount();
  const isLive = useIsCallLive();

  const [firstParticipant] = useParticipants();
  cam.enable();
  
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <div>{isLive ? `Live: ${participantCount}` : `In Backstage`}</div>
      {firstParticipant ? (
        <ParticipantView participant={firstParticipant} />
      ) : (
        <div>The host hasn't joined yet</div>
      )}
      <div style={{ display: "flex", gap: "4px" }}>
        <button onClick={() => (isLive ? call.stopLive() : call.goLive())}>
          {isLive ? "Stop Live" : "Go Live"}
        </button>
        <button onClick={() => cam.toggle()}>
          {isCamEnabled ? "Disable camera" : "Enable camera"}
        </button>
        <button onClick={() => mic.toggle()}>
          {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
        </button>
      </div>
    </div>
  );
};
