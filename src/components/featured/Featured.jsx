import useFetch from "../../hooks/useFetch"
import "./featured.css"

const Featured = () => {
  const { data, loading, error } = useFetch(
    "https://bookingapp-server.vercel.app/api/hotels/countByCity?cities=bangalore,mumbai,chennai"
  );
  console.log(data);

  return (
    <div className="featured">
        {loading ? "Loading please wait": <><div className="featuredItem">
            <img src="https://t-cf.bstatic.com/xdata/images/city/max500/684534.webp?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o=" alt="" className="featuredImg" />
        <div className="featuredTitles">
            <h1>
                Bangalore
            </h1>
            <h2>{data[0]}properties</h2>
        </div>
        </div>
        <div className="featuredItem">
            <img src="https://t-cf.bstatic.com/xdata/images/city/max500/971346.webp?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=" alt="" className="featuredImg" />
        <div className="featuredTitles">
            <h1>
              Mumbai
            </h1>
            <h2>{data[1]} properties</h2>
        </div>
        </div>
        <div className="featuredItem">
            <img src="https://t-cf.bstatic.com/xdata/images/city/max500/684730.webp?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o=" alt="" className="featuredImg" />
        <div className="featuredTitles">
            <h1>
              Chennai
            </h1>
            <h2>{data[2] }properties</h2>
        </div>
        </div></>}
    </div>
  )
}

export default Featured
