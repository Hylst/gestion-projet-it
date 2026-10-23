import React from 'react';
import { useProgress } from '../lib/progress';

export interface QuizQuestion { question: string; choix: [string, string, string]; bonne: 0 | 1 | 2; motif: string }
export interface QuizData { id: string; questions: QuizQuestion[] }

export function QuizBlock(props: { data: QuizData }) {
  const p = useProgress();
  const [repondu, setRepondu] = React.useState<Array<number | null>>(() => props.data.questions.map(() => null));
  const deja = p.quizDone.includes(props.data.id);
  const bonnes = props.data.questions.filter((q, i) => repondu[i] === q.bonne).length;
  const total = props.data.questions.length;
  const seuil = Math.ceil((total * 2) / 3);
  const complet = repondu.every((r) => r !== null);
  const [verdict, setVerdict] = React.useState<null | string>(null);
  const [gagne, setGagne] = React.useState(false);

  React.useEffect(() => {
    if (complet) {
      const s = `${bonnes} sur ${total} bonnes réponses. ${deja ? 'Gain déjà reçu pour ce quiz.' : bonnes >= seuil ? '+10 XP' : `Moins de ${seuil} sur ${total}\u00A0: pas de gain, tu peux recommencer.`}`;
      setVerdict(s);
      if (bonnes >= seuil && !deja) {
        p.dispatch({ type: 'quiz', id: props.data.id, correctes: bonnes, total });
        setGagne(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complet]);

  const reset = () => { setRepondu(props.data.questions.map(() => null)); setVerdict(null); setGagne(false); };

  return (
    <section id="quiz" className="quiz" aria-labelledby="quiz-t">
      <h2 id="quiz-t">Quiz courant ({total} questions)</h2>
      {props.data.questions.map((q: QuizQuestion, i: number) => (
        <fieldset key={i} disabled={repondu[i] !== null}>
          <legend>{`Q${i + 1}.${q.question}`}</legend>
          {q.choix.map((c, j) => (
            <div key={j} className="choix">
              <input type="radio" name={`q-${i}`} id={`q-${i}-${j}`} value={j} checked={repondu[i] === j} onChange={() => setRepondu((r) => r.map((v, k) => (k === i ? j : v)))} />
              <label htmlFor={`q-${i}-${j}`}>{c}</label>
            </div>
          ))}
          {repondu[i] !== null && (
            <p className={repondu[i] === q.bonne ? 'ok' : 'err'} role="note">
              {repondu[i] === q.bonne ? 'Correct. ' : 'Pas cette fois. '} Motif&nbsp;: {q.motif}
            </p>
          )}
        </fieldset>
      ))}
      <p role="status">{verdict}{gagne && <strong> +10 XP ajoutés.</strong>}</p>
      {complet && <button type="button" className="btn secondary" onClick={reset}>Recommencer sans XP</button>}
    </section>
  );
}
