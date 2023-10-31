import "./App.scss";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [memes, setMemes] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeme, setCurrentMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.memegen.link/templates")
      .then((data) => data.json())
      .then((res) => {
        setMemes(res);
      });
  }, []);

  const loadMore = () => {
    setDisplayCount((prev) => prev + 10);
  };

  const handleOpenModal = (id, name, blank, lines) => {
    setIsModalOpen(true);
    setCurrentMeme({ id, name, blank, lines });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  console.log(currentMeme);

  return (
    <div className="App">
      <header>
        <h1>Meme Generator</h1>
        <p>Choose a template you want</p>
      </header>

      {isModalOpen && (
          <Modal
            id={currentMeme.id}
            name={currentMeme.name}
            blank={currentMeme.blank}
            lines={currentMeme.lines}
            handleCloseModal={handleCloseModal}
          />
        )}

      <section className="templates">
        {memes?.slice(0, displayCount).map((meme) => (
          <div key={meme.id} className="template">
            <img src={meme.blank} alt={meme.name} loading="lazy" />
            <p>{meme.name}</p>
            <button
              className="btn-gen"
              onClick={() =>
                handleOpenModal(meme.id, meme.name, meme.blank, meme.lines)
              }
            >
              Generate
            </button>
          </div>
        ))}
      </section>

      <button className="btn-load" onClick={loadMore}>
        Load more ...
      </button>

      <footer>
        <div className="divider">M.Meme</div>
        <p>Have fun!</p>
      </footer>
    </div>
  );
}

export default App;
