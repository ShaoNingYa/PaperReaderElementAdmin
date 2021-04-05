<template>
  <div class="main_bg">
    <video
      class="background_pic"
      loop="loop"
      autoplay="autoplay"
      muted="muted"
      src="https://video-previews.elements.envatousercontent.com/files/809a0750-4148-494a-8b06-b4487f252ed1/video_preview_h264.mp4"
    />
    <!--    "https://video-previews.elements.envatousercontent.com/files/acb638bc-63bd-4381-8bf2-a053d022ac58/video_preview_h264.mp4"-->
    <!--    "https://video-previews.elements.envatousercontent.com/h264-video-previews/74967ca9-a65e-4352-ae1a-ff7e176a7ea8/20248967.mp4"-->
    <!--    "https://video-previews.elements.envatousercontent.com/files/809a0750-4148-494a-8b06-b4487f252ed1/video_preview_h264.mp4"-->
    <!--    "https://video-previews.elements.envatousercontent.com/files/4278b6ac-3a37-466c-b574-0eccf134ebaf/video_preview_h264.mp4"-->
    <!--    "https://jjying.com/assets/code.mp4"-->
    <div class="main_content">
      <div class="text_show">
        <span style="--i:1">欢</span>
        <span style="--i:2">迎</span>
        <span style="--i:3">页</span>
        <span style="--i:4">面</span>
      </div>

      <div class="container">
        <router-link to="/index">
          <div class="box">
            <div class="content">
              进入
            </div>
          </div>
        </router-link>
      </div>

    </div>
    <svg>
      <filter id="wavy">
        <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="2">
          <animate attributeName="baseFrequency" dur="60s" values="0.02;0.05;0.02" repeatCount="indefinite"/>
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" scale="30"/>
      </filter>
    </svg>
  </div>
</template>

<script>

export default {
  name: 'Index'
}
</script>

<style lang="scss" scoped>

h1 {
  line-height: 100px;
  font-size: 1000vm;

}

.main_content {
  text-align: center;
  position: relative;
  top: 15%;
  margin: 0 auto;
}

.background_pic {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 300%;
  z-index: -1;
  opacity: 0.8;
  object-fit: cover;
}

.main_bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 1;
  transition: all .2s ease-out;
  background-color: #ccc;
  background-image: linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black),
  linear-gradient(-45deg, black 25%, transparent 25%, transparent 75%, black 75%, black);
  background-size: 2px 2px;
}

.text_show {
  font-size: 10vw;
  font-weight: bolder;
  color: #808080;
  text-shadow: 0 0 10px #fff;
  cursor: pointer;
}

.text_show span {
  transition: .5s;
  transition-delay: calc(var(--i) * .1s);
}

.text_show:hover span {
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 10px #fff,
  0 0 20px rgba(229, 224, 224, 0.6),
  0 0 30px rgba(229, 224, 224, 0.6),
  0 0 50px rgba(229, 224, 224, 0.6),
  0 0 80px rgba(229, 224, 224, 0.6);
}

.container {
  margin-top: 50px;
  position: relative;
  font-size: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container .box {
  position: relative;
  color: #5e5e5e;
  width: 80vw;
  height: 20vw;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-reflect: below 15px linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.2));
  margin: 0 30px;
}

.container .box:hover {
  color: #000;
}

.container .box::before {
  content: '';
  position: absolute;
  left: -10px;
  top: -10px;
  width: 100%;
  height: 100%;
  border: 4px solid #fff;
  background: #000;
  //background: rgba(255, 255, 255, 0.5);
  filter: url(#wavy);
  transition: 1s;
}

.container .box:hover:before {
  background: #8e8e8e;
  transition: 0.5s;
}

.container .box::after {
  content: '';
  position: absolute;
  left: -10px;
  top: -10px;
  width: 50%;
  height: 100%;
  border: 4px solid #fff;
  border-right: none;
  background: rgba(255, 255, 255, 0.1);
  filter: url(#wavy);
}

.container .box .content {
  position: absolute;
  padding: 20px;
  font-weight: bolder;
  //font-size: 120px;
  letter-spacing: 25px;
  text-align: center;
  text-shadow: 0 0 10px #fff;
  transition: 0.5s;
}
</style>
