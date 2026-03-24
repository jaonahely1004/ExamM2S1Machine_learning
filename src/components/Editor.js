import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { checkPhonotactics } from '../utils/malagasyRules';
import CoPilotChat from './CoPilotChat';

const Editor = () => {
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const quillRef = useRef(null);

  // 🔍 Analyse phonotactique
  useEffect(() => {
    const handler = setTimeout(() => {
      const plainText = content.replace(/<[^>]*>/g, ' ');
      setErrors(checkPhonotactics(plainText));
    }, 300);
    return () => clearTimeout(handler);
  }, [content]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  // 🎤 TTS
  const speakSakalava = () => {
    const plainText = content.replace(/<[^>]*>/g, ' ');
    if (!plainText) return;

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(plainText);

    const voices = synth.getVoices();
    utterance.voice = voices.find(v => v.lang === 'fr-FR') || voices[0];

    synth.speak(utterance);
  };

  // 🤖 Analyse IA Flask
  const analyserTexte = async () => {
    const quill = quillRef.current.getEditor();
    const text = quill.getText().trim();

    if (!text) return alert("Soraty aloha ny texte");

    try {
      const response = await fetch('http://127.0.0.1:5000/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Erreur serveur");

      const data = await response.json();
      setAnalysis(data);

    } catch (error) {
      console.error(error);
      alert("🚨 Backend Python tsy mandeha. Alefaso app.py");
    }
  };

  // ✏️ Correction intelligente
  const corrigerMot = (ancien, nouveau) => {
    const quill = quillRef.current.getEditor();
    const text = quill.getText();

    const index = text.indexOf(ancien);

    if (index !== -1) {
      quill.deleteText(index, ancien.length);
      quill.insertText(index, nouveau);
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>
        Soratra - Éditeur Malagasy IA
      </h1>

      <div style={layout}>

        {/* ✏️ EDITEUR */}
        <div style={card}>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Andika eto..."
            style={{ height: '300px', marginBottom: '20px' }}
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={speakSakalava} style={btn}>
              🔊 Lire
            </button>

            <button onClick={analyserTexte} style={btnGreen}>
              🤖 Analyse IA
            </button>
          </div>

          {/* 📊 Analyse phonotactique */}
          <div style={box(errors.length > 0)}>
            <h3>Analyse phonotactique</h3>
            {errors.length > 0 ? (
              <ul>
                {errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            ) : <p>✅ Aucun problème</p>}
          </div>

          {/* 🤖 Résultat IA */}
          {analysis.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Résultat IA</h3>

              {analysis.map((item, i) => (
                <div key={i} style={{
                  padding: '12px',
                  marginBottom: '10px',
                  borderRadius: '10px',
                  background: item.correct ? '#ecfdf5' : '#fee2e2',
                  border: '1px solid #ddd'
                }}>
                  <strong>{item.mot}</strong>

                  {/* ⚠️ Phonétique */}
                  {item.phonetique_ko && (
                    <div style={{ color: '#f59e0b' }}>
                      ⚠️ Combinaison interdite
                    </div>
                  )}

                  {/* ❌ Mot incorrect */}
                  {!item.correct && (
                    <>
                      <div style={{ color: '#dc2626' }}>
                        Mot inconnu
                      </div>

                      {item.suggestions_multiples?.length > 0 ? (
                        <div style={{ marginTop: '5px' }}>
                          {item.suggestions_multiples.map((s, j) => (
                            <button
                              key={j}
                              onClick={() => corrigerMot(item.mot, s.suggestion)}
                              style={suggestionBtn}
                            >
                              {s.suggestion}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <small>Aucune suggestion</small>
                      )}
                    </>
                  )}

                  {/* ✅ Mot correct */}
                  {item.correct && (
                    <div style={{ color: '#16a34a' }}>
                      Racine : {item.racine}
                    </div>
                  )}
                </div>
              ))}

            </div>
          )}
        </div>

        {/* 🤖 CHATBOT */}
        <div style={chatCard}>
          <CoPilotChat quillRef={quillRef} />
        </div>

      </div>
    </div>
  );
};

// 🎨 Styles modernes
const container = {
  minHeight: '100vh',
  backgroundColor: '#f3f4f6',
  padding: '40px 20px',
  fontFamily: 'Inter, sans-serif'
};

const title = {
  textAlign: 'center',
  fontSize: '2.4rem',
  fontWeight: '700',
  marginBottom: '40px'
};

const layout = {
  display: 'flex',
  gap: '30px',
  flexWrap: 'wrap',
  justifyContent: 'center'
};

const card = {
  flex: 1,
  minWidth: '450px',
  backgroundColor: '#fff',
  borderRadius: '16px',
  padding: '25px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.08)'
};

const chatCard = {
  ...card,
  minWidth: '350px'
};

const btn = {
  padding: '10px 20px',
  backgroundColor: '#2563eb',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer'
};

const btnGreen = {
  ...btn,
  backgroundColor: '#16a34a'
};

const suggestionBtn = {
  margin: '4px',
  padding: '5px 10px',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const box = (error) => ({
  marginTop: '20px',
  padding: '15px',
  borderRadius: '10px',
  backgroundColor: error ? '#fee2e2' : '#dcfce7'
});

export default Editor;