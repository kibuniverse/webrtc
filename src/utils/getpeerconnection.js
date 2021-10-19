export default function getPeerConnection() {
  return window.RTCPeerConnection
    || window.mozRTCPeerConnection
    || window.webkitRTCPeerConnection
}