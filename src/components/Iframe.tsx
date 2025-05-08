type IframeProps = {
  src: string;
  title: string;
  height?: number;
};

export default function Iframe({ src, title, height = 600 }: IframeProps) {
  return (
    <div className="w-full max-w-5xl mx-auto my-8">
      <iframe
        src={src}
        title={title}
        className="w-full"
        height={height}
        allowFullScreen
        style={{ border: 'none' }}
      />
    </div>
  );
}
