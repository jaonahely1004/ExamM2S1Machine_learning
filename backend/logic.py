# src/components/utils/logic.py

import re
import pandas as pd
from rapidfuzz import process, distance

def charger_donnees(chemin_csv):
    try:
        df = pd.read_csv(chemin_csv, encoding='utf-8-sig', sep=None, engine='python')
        df.columns = [c.strip().lower() for c in df.columns]

        map_lemma = {}
        tous_mots = set()

        col_racine = 'fototeny'
        col_derives = 'sampanteniny'

        for _, row in df.iterrows():
            racine = str(row[col_racine]).lower().strip()

            if racine and racine != 'nan':
                tous_mots.add(racine)
                map_lemma[racine] = racine

                if col_derives in df.columns:
                    derives = str(row[col_derives]).lower()
                    mots = re.split(r'[;, ]+', derives)

                    for d in mots:
                        d = d.strip()
                        if d:
                            tous_mots.add(d)
                            map_lemma[d] = racine

        return list(tous_mots), map_lemma

    except Exception as e:
        print("Erreur:", e)
        return [], {}

LISTE_MOTS, MAP_LEMMA = charger_donnees('tenymalagasy_rootLists_pairs_all_letters.csv')


def verifier_mot(mot):
    mot = mot.lower().strip()

    # 🔥 SIMULATION phonétique simple
    phonetique_ko = bool(re.search(r'(nb|mk|dt|bp|sz)', mot))

    correct = mot in LISTE_MOTS
    suggestions_data = []

    if not correct:
        extraits = process.extract(mot, LISTE_MOTS,
                                  scorer=distance.Levenshtein.distance,
                                  limit=3)

        for mot_proche, score, _ in extraits:
            if score <= 5:
                suggestions_data.append({
                    "suggestion": mot_proche,
                    "racine": MAP_LEMMA.get(mot_proche, "Inconnue")
                })

    racine = MAP_LEMMA.get(mot, "Inconnue") if correct else None

    return {
        "mot": mot,
        "correct": correct,
        "phonetique_ko": phonetique_ko,
        "suggestions_multiples": suggestions_data,
        "racine": racine
    }