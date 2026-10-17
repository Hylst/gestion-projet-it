import { useProgress } from '../lib/progress';

export function ModuleEnd(props: { id: string }) {
  const p = useProgress();
  const fait = p.moduleDone.includes(props.id);
  return (
    <section id="fin" className="module-end">
      {fait
        ? <p className="ok" role="status">Module termine. Badge ajoute ({p.moduleDone.length}/6).</p>
        : <button type="button" className="btn" onClick={() => p.dispatch({ type: 'module', id: props.id })}>Marquer le module comme termine (+20 XP)</button>}
    </section>
  );
}
