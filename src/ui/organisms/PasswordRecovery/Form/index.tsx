import { Button, Input } from '../../../atoms';

const Form = () => {
  return (
    <form className="w-[39.375rem] h-fit justify-center rounded-3xl p-4 bg-black-100 lg:py-7">
      <h1 className="text-center text-5xl text-white">Recupero Password</h1>
      <article className="w-fit flex flex-col items-center m-auto">
        <section className="w-full">
          <Input
            label="Codice di verifica"
            name="passwordCode"
            placeholder="Inserisci il codice di verifica"
          />
        </section>
        <article className="w-full grid grid-cols-1 gap-6 my-8">
          <p className="text-white">
            Ciao &apos;nome_utente&apos;, abbiamo inviato un codice di verifica all’email
            &apos;email_utente&apos;, inseriscilo e poi potrai aggiornare la password.
          </p>
          <a href="/sign-in" className="w-full text-yellow underline">
            Non ti è arrivato il codice? Chiedine un altro.
          </a>
        </article>
        <section className="w-full grid grid-cols-1 gap-7 place-items-center lg:grid-cols-2">
          <Button title="Invia" backgroundColor="bg-yellow" iconName="rightArrow" />
          <Button
            type="reset"
            title="Annulla"
            backgroundColor="bg-gray-100"
            iconName="reset"
            titleSize="text-xs"
          />
        </section>
      </article>
    </form>
  );
};

export default Form;
