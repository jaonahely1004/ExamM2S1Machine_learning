import React, { useState } from 'react';

const CoPilotChat = ({ quillRef }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Salama! Azonao atao ny manontany: "synonyme [mot]" na "conjugaison [verbe]"' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    const response = getBotResponse(input);
    setMessages([...newMessages, { from: 'bot', text: response }]);
  };

  const getBotResponse = (text) => {
    const lower = text.toLowerCase().trim();

    // Synonyme simulé
    if (lower.startsWith('synonyme ')) {
      const word = lower.split(' ')[1];
      return `Synonyme simulé pour "${word}": ${word}a, ${word}y, ${word}o`;
    }

    // Conjugaison m/n/h corrigée
    if (lower.startsWith('conjugaison ')) {
      let verb = lower.split(' ')[1];
      if (!verb) return 'Azafady, omeo ny matoanteny';
      verb = verb.replace(/^[mnh]/, ''); // supprime préfixe existant
      const subjects = ['aho', 'ianao', 'izy', 'isika', 'ianareo', 'izy ireo'];
      const present = subjects.map(s => `m${verb} ${s}`);
      const past = subjects.map(s => `n${verb} ${s}`);
      const future = subjects.map(s => `h${verb} ${s}`);
      return `Présent: ${present.join(', ')}\nPassé: ${past.join(', ')}\nFutur: ${future.join(', ')}`;
    }

    return "Azafady, tsy azoko ilay fanontaniana. Miresaha momba ny 'synonyme [mot]' na 'conjugaison [verbe]'.";
  };

  const insertWord = (word) => {
    if (!quillRef || !quillRef.current) return;
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection(true);
    quill.insertText(range.index, word + ' ');
    quill.setSelection(range.index + word.length + 1);
  };

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginTop: '25px' }}>
      <h3 style={{ color: '#1f2937', marginBottom: '15px' }}>🤖 Co-Pilote Chat (Malagasy)</h3>

      <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '10px', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#f9fafb' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: '8px', lineHeight: '1.5' }}>
            <b style={{ color: m.from === 'bot' ? '#2563eb' : '#1f2937' }}>{m.from === 'bot' ? 'Bot' : 'Vous'}:</b>{' '}
            {m.text.split(' ').map((w, idx) => (
              m.from === 'bot'
                ? <span key={idx} style={{ cursor: 'pointer', color: '#2563eb', marginRight: '3px' }} onClick={() => insertWord(w)}>{w}</span>
                : w + ' '
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ex: conjugaison mihinana"
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e0', marginRight: '8px' }}
        />
        <button
          onClick={handleSend}
          style={{ padding: '10px 15px', borderRadius: '8px', border: 'none', backgroundColor: '#2563eb', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default CoPilotChat;