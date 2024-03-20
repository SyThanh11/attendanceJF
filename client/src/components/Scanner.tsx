import { useState } from "react";
import QrReader from "react-qr-reader"; 

const Scanner = () => {
  const [result, setResult] = useState("no result");
  const [error, setError] = useState(null);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <QrReader
        delay={300}
        onError={(error) => {
          setError(error.message);
        }}
        onScan={(data) => {
          if (data) {
            setResult(data);
            setError(null);
          }
        }}
        style={{ width: "100%" }}
      />
      <p>{result}</p>
    </div>
  );
};

export default Scanner;
