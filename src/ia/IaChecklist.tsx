export function IaChecklist({ titre = 'Checklist', items }: { titre?: string; items: readonly string[] }) {
  return (
    <section className="ia-checklist" aria-labelledby="ia-checklist-titre">
      <h2 id="ia-checklist-titre">{titre}</h2>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}
