type Props = {
  src: string
  title: string
  height?: number
}

export default function Iframe({ src, title, height = 500 }: Props) {
  return (
    <div className="w-full border rounded overflow-hidden my-6">
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        className="border-none"
        allowFullScreen
      />
    </div>
  )
}
