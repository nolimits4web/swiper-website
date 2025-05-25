export const HomeVideos = () => {
  const videos = [
    '/images/home/videos/ferrari.mp4',
    '/images/home/videos/byd.mp4',
    '/images/home/videos/msi.mp4',
    '/images/home/videos/one-plus.mp4',
    '/images/home/videos/nike.mp4',
    '/images/home/videos/lambo.mp4',
    '/images/home/videos/homedepot.mp4',
    '/images/home/videos/samsung.mp4',
    '/images/home/videos/coca-cola.mp4',
    '/images/home/videos/epic.mp4',
  ];
  return (
    <div className="relative flex flex-col gap-8 w-screen overflow-hidden left-1/2 -translate-x-1/2">
      <div className="relative flex gap-8 home-videos-row-top">
        {videos.slice(0, 5).map((video) => (
          <video
            key={video}
            src={video}
            autoPlay
            muted
            loop
            playsInline
            loading="lazy"
            className="bg-surface-1   w-full md:w-1/2 shrink-0 lg:grayscale-100 hover:grayscale-0 lg:opacity-50 hover:opacity-100 transition-all duration-300"
          />
        ))}
      </div>
      <div className="relative flex gap-8 ml-[30%] w-full shrink-0 home-videos-row-bottom">
        {videos.slice(5, 10).map((video) => (
          <video
            key={video}
            src={video}
            autoPlay
            muted
            loop
            playsInline
            loading="lazy"
            className="bg-surface-1   w-full md:w-1/2 shrink-0 lg:grayscale-100 hover:grayscale-0 lg:opacity-50 hover:opacity-100 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
};
