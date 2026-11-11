import { useRef, useState } from 'react';

const BASE_TYPES = ['Branding & Identity', 'UI/UX Design', 'Shooting photo', 'Shooting produit IA'];
const BUDGETS = ['À REMPLIR (ex. « Moins de 1 000 € / 1 000 – 3 000 € / Plus de 3 000 € »)'];
const DELAYS = ["Moins d'un mois", '1 à 3 mois', 'Plus de 3 mois'];

const twoCols = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '24px' };

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export function ProjectForm({ variant = 'short', className, style }) {
  const full = variant === 'full';
  const projectTypes = full ? [...BASE_TYPES, 'Autre'] : BASE_TYPES;
  const req = full ? ' *' : '';
  const fieldClass = full ? 'field field--glass' : 'field';

  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', budget: '', deadline: '', message: '' });
  const [types, setTypes] = useState([]);
  const firstTypeRef = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const toggleType = (type) => {
    firstTypeRef.current?.setCustomValidity('');
    setTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (full && types.length === 0) {
      firstTypeRef.current.setCustomValidity('Choisissez au moins un type de projet.');
      firstTypeRef.current.reportValidity();
      return;
    }
    const typeLabel = types.join(', ');
    const subject = `Nouvelle demande de projet : ${typeLabel}`;
    const lines = full
      ? [`Nom: ${form.name}`, `Entreprise: ${form.company}`, `Email: ${form.email}`, `Téléphone: ${form.phone}`]
      : [`Nom: ${form.name}`, `Email: ${form.email}`];
    const body = [...lines, `Type de projet: ${typeLabel}`, `Budget: ${form.budget}`, `Délai: ${form.deadline}`, '', 'Message:', form.message].join('\n');
    window.location.href = `mailto:helloarisidstudio@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: '28px', minWidth: 0, ...style }}
    >
      <div style={twoCols}>
        <label className="field-label">
          {full ? 'Nom complet *' : 'Nom'}
          <input className={fieldClass} type="text" name="name" autoComplete="name" required value={form.name} onChange={handleChange} />
        </label>
        {full && (
          <label className="field-label">
            Entreprise *
            <input className={fieldClass} type="text" name="company" autoComplete="organization" required value={form.company} onChange={handleChange} />
          </label>
        )}
        <label className="field-label">
          {`Email${req}`}
          <input className={fieldClass} type="email" name="email" autoComplete="email" required value={form.email} onChange={handleChange} />
        </label>
        {full && (
          <label className="field-label">
            Téléphone
            <input className={fieldClass} type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={handleChange} />
          </label>
        )}
      </div>

      <fieldset style={{ margin: 0, padding: 0, border: 0, minWidth: 0 }}>
        <legend style={{ padding: 0, marginBottom: '12px', fontSize: '14px', color: 'var(--text-2)' }}>{`Type de projet${req}`}</legend>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {projectTypes.map((type, i) => {
            const checked = types.includes(type);
            return (
              <label key={type} className={`choice${checked ? ' is-checked' : ''}`}>
                <input
                  ref={i === 0 ? firstTypeRef : undefined}
                  type="checkbox"
                  name="type"
                  value={type}
                  checked={checked}
                  onChange={() => toggleType(type)}
                />
                {type}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div style={twoCols}>
        <label className="field-label">
          {`Budget${req}`}
          <select className={fieldClass} name="budget" required={full} value={form.budget} onChange={handleChange}>
            <option value="">Choisir une fourchette</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>
        <label className="field-label">
          {`Délai souhaité${req}`}
          <select className={fieldClass} name="deadline" required={full} value={form.deadline} onChange={handleChange}>
            <option value="">Choisir un délai</option>
            {DELAYS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
      </div>

      <label className="field-label">
        {full ? 'Décrivez votre projet *' : 'Votre projet en quelques lignes'}
        <textarea
          className={fieldClass}
          name="message"
          rows={full ? 6 : 5}
          required={full}
          placeholder={full ? 'Votre marque, votre objectif, ce que vous avez déjà…' : undefined}
          value={form.message}
          onChange={handleChange}
        />
      </label>

      {full ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-3)' }}>* Champs obligatoires</span>
          <button type="submit" className="btn">Envoyer la demande <ArrowRight /></button>
        </div>
      ) : (
        <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }}>Envoyer le brief <ArrowRight /></button>
      )}
    </form>
  );
}
