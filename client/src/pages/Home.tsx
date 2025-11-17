import copy from "copy-to-clipboard";

const Home = () => {
  return (
    <div>
      <button>Generate Api key</button>
      <h1>
        key
        <button
          onClick={() => {
            copy("Text", {
              debug: true,
              message: "Press #{key} to copy",
            });
          }}
        >
          copy to clipboard
        </button>
      </h1>
      <h1></h1>
    </div>
  );
};

export default Home;
