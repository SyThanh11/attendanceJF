import cln from "classnames";

export const Footer = () => {
  return (
    <footer className={cln({
      'footer': true,
      'h-[20vh]': true,
      'relative': true,
      'z-0': true
    })}>
        <img src="/image/sun.png" alt="sun" style={{
              position: "absolute",
              bottom: -220,
              left: -67,  
              width: "28%",
              zIndex: 0
        }}/>
        <img src="/image/wave.png" alt="wave" style={{
            position: "absolute",
            bottom: -90,
            width: "100%",
            zIndex: 0
        }}/>
    </footer>
  )
}

export default Footer