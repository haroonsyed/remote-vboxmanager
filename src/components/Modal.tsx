import React from "react";

type props = {
  text: string;
};

const Modal: React.FC<props> = (props) => {
  const [shouldDisplay, setShouldDisplay] = React.useState(false);
  const { text } = props;

  React.useEffect(() => {
    if (text) {
      setShouldDisplay(true);
    }

    const timeout = setTimeout(() => {
      setShouldDisplay(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [text]);

  if (!shouldDisplay) {
    return <></>;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-lg">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-green-500 outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Response Info</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-white text-lg leading-relaxed">{text}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
