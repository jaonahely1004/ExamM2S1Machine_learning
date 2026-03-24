//condition pour les regle de bases Pour la question 2

export const forbiddenPatterns = [
    { regex: /nb/i, message: "Le 'nb' n'existe pas en Malagasy." },
    { regex: /mk/i, message: "Le 'mk' n'existe pas en Malagasy." },
    { regex: /dt/i, message: "La combinaison 'dt' est interdite." },
    { regex: /bp/i, message: "La combinaison 'bp' est interdite." },
    { regex: /sz/i, message: "La lettre 's' et 'z' ne se suivent pas." },
    { regex: /^nk/i, message: "Le 'nk' est interdit en début de mot." },
  ];
  
  export const checkPhonotactics = (text) => {
    const words = text.split(/\s+/);
    let errors = [];
  
    words.forEach(word => {
      forbiddenPatterns.forEach(pattern => {
        // Recrée la regex pour éviter le problème du flag global
        const regex = new RegExp(pattern.regex.source, pattern.regex.flags.replace('g', ''));
        if (regex.test(word)) {
          errors.push(`Erreur dans "${word}": ${pattern.message}`);
        }
      });
    });
  
    return errors;
  };