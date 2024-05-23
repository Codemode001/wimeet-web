"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import { MeetingProvider } from "@videosdk.live/react-sdk";
import { authToken } from "../utils/API";
// import MeetingView from "@/pages/example";
import dynamic from "next/dynamic";

const MeetingProvider = dynamic(
  () =>
    import("@videosdk.live/react-sdk").then((module) => module.MeetingProvider),
  { ssr: false }
);
const MeetingView = dynamic(() => import("@/pages/example"), { ssr: false });

const Room = () => {
  const name = useSearchParams();
  const meetingId = name?.get("meetingID");
  const router = useRouter();
  const userName = name?.get("name");

  const onMeetingLeave = () => {
    console.log("leave");
    router.push("/home");
  };

  useEffect(() => {
    console.log(router);
    console.log(name?.get("meetingID"));
    console.log(name?.get("name"));
  });

  return (
    <MeetingProvider
      config={{
        meetingId: meetingId || "",
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
        debugMode: false,
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId || ""} userName={userName || ""} />
    </MeetingProvider>
  );
};

export default Room;
