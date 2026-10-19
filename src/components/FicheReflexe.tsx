export function FicheReflexe(props: { titre: string; items: string[] }) {
  const imprimer = () => {
    document.body.classList.add('printing-fiche');
    window.addEventListener('afterprint', () => document.body.classList.remove('printing-fiche'), { once: true });
    window.print();
  };
  return (
    <section id="reflexe" className="fiche-reflexe card" data-testid="fiche-reflexe" aria-labelledby="reflexe-t">
      <h2 id="reflexe-t">{props.titre}</h2>
      <ol>{props.items.map((it, i) => <li key={i}>{it}</li>)}</ol>
      <button type="button" className="btn secondary no-print" onClick={imprimer}>Imprimer la fiche</button>
    </section>
  );
}
