import React, { useEffect } from "react";
import { useRef } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function App() {

  const userID = "user" + Math.floor(Math.random() * 1000);
  const userName = "react_" + userID;
  const appID = 2101111360;
  const serverSecret = "47a7005e12186d082e58677489b87e85";
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userID, userName);
  const zpRef = useRef(null)

  useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zpRef.current = zp;
    zp.addPlugins({ ZIM });
  }, [TOKEN]);

  function invite(callType) {
    const targetUser = {
      userID: prompt('Enter calle"s id '),
      userName: prompt('Enter calle"s user name ')
    };
    zpRef.current.sendCallInvitation({
      callees: [targetUser],
      callType: callType,
      timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
    }).then((res) => {
      console.warn(res);
    })
      .catch((err) => {
        console.warn(err);

      });
  }
  return (
    <div className='w-full h-screen  bg-linear-to-tl to-gray-600 flex'>
      <div className='w-100 h-100 bg-amber-500 border-2  m-auto flex flex-col justify-center items-center font-bold '>
        <h1>User Id : <span className='font-semibold '>{userID}</span></h1>
        <h1>User Name : <span className='font-semibold '>{userName}</span></h1>

        <div className='flex gap-3 mt-5'>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-400 transition" onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}>
            Voice Call
          </button>
          <button className="px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-blue-600 transition" onClick={() => { invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall) }}>
            Video Call
          </button>
        </div>
      </div>
    </div>
  )
}

export default App