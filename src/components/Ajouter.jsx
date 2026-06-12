import "./Ajouter.css";
import { useRef, useState, useEffect } from "react";

export function Ajouter({ setShowAjouter, ajouterTache, tacheEnCours }) {
  const formRef = useRef(null);

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("Travail");
  const [priorite, setPriorite] = useState("Haute");
  const [statut, setStatut] = useState("A faire");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (tacheEnCours) {
      setTitre(tacheEnCours.titre);
      setDescription(tacheEnCours.description);
      setCategorie(tacheEnCours.categorie);
      setPriorite(tacheEnCours.priorite);
      setStatut(tacheEnCours.statut);
      setDate(tacheEnCours.date);
    }
  }, [tacheEnCours]);

  const handleSubmit = (e) => {
    e.preventDefault();
    ajouterTache({ titre, description, categorie, priorite, statut, date });
  };

  return (
    <div className="style2">
      <fieldset>
        <legend>
          <h1 id="h1">
            {tacheEnCours ? "Modifier une Tâche" : "Ajouter une Tâche"}
          </h1>
        </legend>

        <form id="form2" ref={formRef} onSubmit={handleSubmit}>
          <label>Titre:</label>
          <input value={titre} onChange={(e) => setTitre(e.target.value)} /><br></br>

          <label>Description:</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} /><br></br>

          <label>Catégorie:</label>
          <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
            <option>Travail</option>
            <option>Personnel</option>
            <option>Autre</option>
          </select><br></br>

          <label>Priorité:</label>
          <select value={priorite} onChange={(e) => setPriorite(e.target.value)}>
            <option value="Haute" id="haute">Haute</option>
              <option value="Moyenne"id="moyenne">Moyenne</option>
              <option value="Basse"id="basse">Basse</option>
          </select><br></br>

          <label>Statut:</label>
          <select value={statut} onChange={(e) => setStatut(e.target.value)}>
            <option value="A faire" id="faire">A faire</option>
              <option value="En cours" id="cours">En cours</option>
              <option value="Terminé" id="termine">Terminé</option>
              <option value="Annuler" id="annule">Annuler</option>
          </select><br></br>

          <label>Date Limite:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /><br></br>

          <button id="enregister" type="submit">
            {tacheEnCours ? "Modifier" : "Enregistrer"}
          </button>

          <button id="annuler" type="button" onClick={() => setShowAjouter(false)}>
            Annuler
          </button>
        </form>
      </fieldset>
    </div>
  );
}
