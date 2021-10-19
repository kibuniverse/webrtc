import createStream from './utils/createmedia'
import getPeerConnection from './utils/getpeerconnection'

// 打开本地摄像头
async function nativeMedia() {
  let localStream = await createStream()
  const video = document.querySelector('#play-video')
  // 旧的浏览器可能没有srcObject
  if ("srcObject" in video) {
    video.srcObject = localStream;
  } else {
    video.src = window.URL.createObjectURL(localStream)
  }
  video.onloadedmetadata = function (e) {
    video.play();
  };
}

nativeMedia()
