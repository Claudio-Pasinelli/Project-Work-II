const Contacts = () => {
  return (
    <article className="size-full h-fit max-h-fit min-h-[42.662rem] flex flex-col justify-center items-center m-0 p-8 sm:py-16 sm:px-11">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold break-words">Contattami</h1>
      </header>

      <section className="mb-8 w-full max-w-3xl flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4">Informazioni di contatto</h2>
        <p className="mb-2">
          <strong>Telefono:</strong> +39 349 407 1365
        </p>
        <p className="mb-2">
          <strong>Indirizzo:</strong> Via S. Caternia n° 7
        </p>
        <p className="mb-2">
          <strong>Ore di lavoro:</strong> Lun-Ven, 8:00 - 13:00 | 14:00 - 17:00
        </p>
      </section>

      <section className="mb-8 w-full max-w-3xl flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4">Mi trovate ad Angolo Terme:</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.937000373431!2d10.142498315542824!3d45.89177807910852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDUuODkxNzc4MSwxMC4xNDQ2ODc=!5e0!3m2!1sen!2sus!4v1620693962627!5m2!1sen!2sus"
          width="600"
          height="450"
          className="w-full h-96 border border-gray-200 shadow-xl rounded-3xl"
          allowFullScreen={true}
          loading="lazy"></iframe>
      </section>
    </article>
  );
};

export default Contacts;
