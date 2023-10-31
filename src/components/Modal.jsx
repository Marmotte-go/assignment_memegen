import "./Modal.scss";
import { useState } from "react";

const Modal = ({ id, name, blank, lines, handleCloseModal }) => {
  const arrayLines = Array.from(Array(lines).keys());

  const [text, setText] = useState({}); //this will be an object with the index of the input as key and the value of the input as value
  const [newImg, setNewImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false); //this will be used to show a loading spinner while the image is being generated

  const handleChange = (e) => {
    const currentInput = e.target.attributes.getNamedItem("data-index")?.value; //it is the index of the input
    if (currentInput) {
      setText((prev) => ({ ...prev, [currentInput]: e.target.value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    let memeImg = `https://api.memegen.link/images/${id}/`;
    const layers = Object.values(text);

    layers.forEach((layer, i) => {
      if (i === layers.length - 1) {
        memeImg += encodeURIComponent(`${layer}.png`);
        return;
      }
      memeImg += encodeURIComponent(`${layer}/`);
    });

    setNewImg(memeImg);
  };

  const handleDownload = () => {
    //create blob to solve the cross origin download problem
    fetch(newImg || blank)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${name}.png`;
        a.click();
      });
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          {arrayLines.map((line, i) => (
            <input
              key={line}
              data-index={i}
              type="text"
              placeholder="Add your text on meme"
              onChange={handleChange}
            />
          ))}
          {isLoading && <div className="loading">Generating ...</div>}
          <div className="img-container" onClick={handleDownload}>
            <img
              src={newImg || blank}
              alt={name}
              className="memeImg"
              onLoad={() => setIsLoading(false)}
            />
            <span className="tooltip">Click to download</span>
          </div>

          <div className="btn-group">
            <button type="submit">Generate</button>
            <button className="close-btn" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
