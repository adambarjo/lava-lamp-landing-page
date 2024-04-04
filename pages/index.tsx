import Lava from "../components/Lava"
import Layout from "../components/Layout"

const Home = () => {
  return (
    <Layout title="Home">
      <div className="relative h-full w-full">
        <Lava
          height="100vh"
          blobColour="blue"
          background="white"
          opacity={85}
        />
      </div>
    </Layout>
  )
}

export default Home
