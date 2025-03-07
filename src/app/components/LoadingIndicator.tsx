export const LoadingIndicator = () => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <video id="banner-video" autoPlay muted playsInline loop>
      <source src="/animations/paw.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  </div>
);
