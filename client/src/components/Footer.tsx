import cln from "classnames";

export const Footer = () => {
  return (
    <footer className={cln({
      'footer': true,
      'h-[20vh]': true,
      'relative': true,
    })}>
        <img src="/image/sun.png" alt="sun" style={{
              position: "absolute",
              bottom: -220,
              left: -67,  
              width: "28%",
        }}/>
        <img src="/image/wave.png" alt="wave" style={{
            position: "absolute",
            bottom: -90,
            width: "100%",
        }}/>
    </footer>
  )
}

export default Footer