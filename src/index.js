import createStream from './utils/createmedia'
import getPeerConnection from './utils/getpeerconnection'
import { iceServers } from './config/iceservers'

const pc1Video = document.querySelector('#pc1')
const pc2Video = document.querySelector('#pc2')

const PeerConnection = getPeerConnection()
// 打开本地摄像头
async function nativeMedia() {
  const localStream = await createStream()
  // 旧的浏览器可能没有srcObject
  if ("srcObject" in pc1Video) {
    pc1Video.srcObject = localStream;
  } else {
    pc1Video.src = window.URL.createObjectURL(localStream)
  }
  pc1Video.onloadedmetadata = function (e) {
    pc1Video.play();
  };
  const pc1 = new PeerConnection(iceServers);
  const pc2 = new PeerConnection(iceServers);
  pc2.onaddstream = function (e) {
    console.log("pc2 receive stream", e)
    if ("srcObject" in pc2Video) {
      pc2Video.srcObject = localStream;
    } else {
      pc2Video.src = window.URL.createObjectURL(e.stream)
    }
    pc2Video.onloadedmetadata = function (e) {
      console.log('pc2 loadmetadata', e)
      pc2Video.play()
    }
  }
  pc1.addStream(localStream)
  pc1.onicecandidate = function (e) {
    console.log("pc1 icecandidate", e);
    if (e.candidate) {
      pc2.addIceCandidate(e.candidate.toJSON())
    }
  }
  
  // 创建传呼
  const offerTep = await pc1.createOffer({});
  console.log("offerTep", offerTep)
  await pc1.setLocalDescription(offerTep)
  await pc2.setRemoteDescription(offerTep)
  const answer = await pc2.createAnswer()
  await pc2.setLocalDescription(answer)
  await pc1.setRemoteDescription(answer);
}

async function createOffer() {
  
}

nativeMedia()
