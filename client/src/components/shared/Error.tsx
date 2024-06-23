import ButtonLayout from "./ButtonLayout";

const Error = () => {
  // Function to reload page
  const reloadPage = () => window.location.reload();

  return (
    <div className="w-full h-full text-center">
      {/* ERROR IMAGE */}
      <img src="/error.png" className="w-96 mx-auto" />

      {/* HEADING TEXT */}
      <h3 className="text-3xl text-white font-semibold">
        There seems to be some error
      </h3>

      {/* ACTIONS */}
      <section className="mt-4 mb-2">
        <ButtonLayout onClick={reloadPage} className="mx-2 px-4">
          Retry
        </ButtonLayout>
      </section>
    </div>
  );
};

export default Error;
