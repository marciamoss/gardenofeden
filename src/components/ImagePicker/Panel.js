const Panel = ({ panelSide }) => {
  return (
    <div className="flex flex-col place-content-center ml-7 mr-7">
      {panelSide.map((btn) => (
        <button
          type="button"
          key={btn.tooltip}
          className={`self-center p-2 rounded-full mt-2 bg-blue-400 ${
            btn.disableBtn ? "opacity-10" : "hover:bg-blue-600 opacity-100"
          }`}
          onClick={btn.cb}
          disabled={btn.disableBtn}
        >
          <div className="relative group">
            {btn.icon}
            <div className="rounded-2xl bg-black w-16 opacity-0 group-hover:opacity-100 duration-300 absolute flex justify-center items-end text-sm text-white font-semibold">
              {btn.tooltip}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
export default Panel;
