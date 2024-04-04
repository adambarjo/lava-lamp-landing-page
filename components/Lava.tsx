import { useEffect, useRef, useState } from "react"

type Wrapper = {
  $: Element
  width: number
  height: number
  area: number
  rendered: boolean
  blob: {
    minSize: number
    maxSize: number
    num: number
  }
}

type LavaProps = {
  height: string
  background: string
  blobColour: string
  opacity: number
}

const Lava = ({ height, background, blobColour, opacity }: LavaProps) => {
  const [wrapper, setWrapper] = useState<Wrapper>()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const blobMinSize = 120
  const blobMaxSize = 180

  useEffect(() => {
    if (!wrapper?.rendered) {
      const $ = wrapperRef.current as Element
      const styles = window.getComputedStyle($)
      const width = parseInt(styles.width)
      const height = parseInt(styles.height)

      setWrapper({
        $,
        width,
        height,
        area: width * height,
        rendered: true,
        blob: {
          minSize: blobMinSize,
          maxSize: blobMaxSize,
          num: Math.floor((width / blobMaxSize) * 1.25),
        },
      })
    }
  }, [])

  return (
    <div
      className="flex items-center justify-center overflow-hidden"
      style={{
        background,
        opacity: opacity + "%",
      }}
    >
      <div
        ref={wrapperRef}
        className="relative flex w-full scale-[1.28] flex-col items-center justify-between"
        style={{
          height,
          background,
          filter: "blur(40px) contrast(400) hue-rotate(8deg)",
        }}
      >
        <WrapperBarrier background={blobColour} />
        {wrapper?.rendered &&
          [...Array(wrapper.blob.num)].map((_, i) => (
            <Blob
              background={blobColour}
              key={i}
              blobKey={i}
              wrapper={wrapper}
            />
          ))}
        <WrapperBarrier background={blobColour} />
      </div>
    </div>
  )
}

const WrapperBarrier = ({ background }: { background: string }) => (
  <div className="h-[10rem] w-full" style={{ background }}></div>
)

type BlobProps = {
  blobKey: number
  wrapper: Wrapper
  background: string
}

const Blob = ({ blobKey, wrapper, background }: BlobProps) => {
  const columnBoundary = wrapper.width / wrapper.blob.num
  const columnMinPos = columnBoundary * blobKey
  const columnMaxPos = columnMinPos + columnBoundary
  const blobSize = randomNum(wrapper.blob.minSize, wrapper.blob.maxSize)
  const blobRef = useRef<HTMLDivElement>(null)
  const x = randomNum(columnMinPos - blobSize / 2, columnMaxPos - blobSize / 2)
  const y = randomNum(0, wrapper.height - blobSize)
  let travelTime = randomNum(10000, 30000)
  let direction = Math.random() < 0.5

  useEffect(() => {
    setTimeout(() => {
      const blob = blobRef.current as HTMLElement
      const blobCircuit = () => {
        blob.style.top = (direction ? 0 : wrapper.height - blobSize) + "px"
        setTimeout(() => {
          direction = !direction
          travelTime = randomNum(10000, 20000)
          blobCircuit()
        }, travelTime)
      }
      blobCircuit()
    }, 100)
  }, [])

  return (
    <div
      ref={blobRef}
      className="absolute rounded-full"
      style={{
        background,
        top: y,
        left: x,
        width: blobSize,
        height: blobSize,
        transitionDuration: travelTime + "ms",
      }}
    />
  )
}

const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default Lava
