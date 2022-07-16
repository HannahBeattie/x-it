// error

export default function Video() {
  return (
    <video
      as="video"
      alt="promo video"
      rounded="2xl"
      h="100%"
      muted
      // autoplay="true"
      controls
      preload="auto"
      paused="false"
      poster="https://x-5pqeaazlb-x-it.vercel.app/still.png"
    >
      <source src="/x-it.mp4" type="video/mp4" poster="/X-it.png" />
      {`Your browser doesn't support HTML5 video tag.`}
    </video>
  )
}
