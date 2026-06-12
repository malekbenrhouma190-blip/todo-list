import "./Tableau.css";
import { Ajouter } from "./Ajouter";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Tableau() {
  const user = localStorage.getItem("user"); 
  const [showAjouter, setShowAjouter] = useState(false);
  const [tacheEnCours, setTacheEnCours] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [filtreCategorie, setFiltreCategorie] = useState("Touts");
  const [filtrePriorite, setFiltrePriorite] = useState("Touts");
  const [filtreStatut, setFiltreStatut] = useState("Touts");
  const [taches, setTaches] = useState(() => {
  const saved = localStorage.getItem("tasks_" + user);
  return saved ? JSON.parse(saved) : [];
  })
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("tasks_" + user, JSON.stringify(taches));
    }
  }, [taches, user]);

  const ajouterTache = (tache) => {
    if (tacheEnCours) {
      setTaches(
        taches.map((t) =>
          t.id === tacheEnCours.id ? { ...tache, id: t.id } : t
        )
      );
      setTacheEnCours(null);
    } else {
      setTaches([...taches, { ...tache, id: Date.now() }]);
    }
    setShowAjouter(false);
  };
  const supprimerTache = (id) => {
    setTaches(taches.filter((t) => t.id !== id));
  };

  const supprimerTout = () => {
    if (window.confirm("Voulez-vous supprimer toutes les tâches ?")) {
      setTaches([]);
    }
  };

  const modifierTache = (id) => {
    const tache = taches.find((t) => t.id === id);
    if (!tache) return;
    setTacheEnCours(tache);
    setShowAjouter(true);
  };

  const tachesFiltrees = taches.filter((t) => {
    return (
      (filtreCategorie === "Touts" || t.categorie === filtreCategorie) &&
      (filtrePriorite === "Touts" || t.priorite === filtrePriorite) &&
      (filtreStatut === "Touts" || t.statut === filtreStatut) &&
      t.titre.toLowerCase().includes(recherche.toLowerCase())
    );
  });


  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [darkMode]);

  const today = new Date();
  const estEnRetard = (date, statut) => {
    return new Date(date) < today && statut !== "Terminé";
  };
  const rappelProche = (date, statut) => {
    const diff = (new Date(date) - today) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 3 && statut !== "Terminé";
  };
  return(
    
    <div className={`style3 ${darkMode ? "dark" : "light"}`}>
      {showAjouter ? (
        <Ajouter
          setShowAjouter={setShowAjouter}
          ajouterTache={ajouterTache}
          tacheEnCours={tacheEnCours}
        />
      ) : (
        <>
          <button id="sorter" type="button"onClick={handleLogout}>Quitter</button>
          <h1 id="titretab">Gestion des Tâches</h1>
          <button type="button"onClick={() => setDarkMode(!darkMode)}className="theme">{darkMode ? "🌞 Mode clair " : "🌙 Mode sombre"}</button>
          <form className="form1">
            <input id="search"type="search" placeholder="Reachercher par titre..."value={recherche}onChange={(e) => setRecherche(e.target.value)}/>
            <label>Catégorie :</label>
            <select value={filtreCategorie} onChange={(e) => setFiltreCategorie(e.target.value)}>
              <option value="Touts">Touts</option>
              <option value="Travail">Travail</option>
              <option value="Personnel">Personnel</option>
              <option value="Autre">Autre</option>
            </select>

            <label>Priorité :</label>
            <select value={filtrePriorite} onChange={(e) => setFiltrePriorite(e.target.value)}>
              <option value="Touts"id="Touts">Touts</option>
              <option value="Haute" id="haute">Haute</option>
              <option value="Moyenne"id="moyenne">Moyenne</option>
              <option value="Basse"id="basse">Basse</option>
            </select>

            <label>Statut :</label>
            <select value={filtreStatut} onChange={(e) => setFiltreStatut(e.target.value)}>
              <option value="Touts" id="Touts">Touts</option>
              <option value="A faire" id="faire">A faire</option>
              <option value="En cours" id="cours">En cours</option>
              <option value="Terminé" id="termine">Terminé</option>
              <option value="Annuler" id="annule">Annuler</option>
            </select>
          </form>

<button type="button" className="Tout" onClick={() => setFiltreStatut("Touts")}>Touts</button>
<button type="button" className="Tout" onClick={() => setFiltreStatut("A faire")}>A faire</button>
<button type="button" className="Tout" onClick={() => setFiltreStatut("En cours")}>En cours</button>
<button type="button" className="Tout" onClick={() => setFiltreStatut("Terminé")}>Terminé</button>
<button type="button" className="Tout" onClick={() => setFiltreStatut("Annuler")}>Annuler</button>

          <table border="1">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Catégorie</th>
                <th>Statut</th>
                <th>Proprité</th>
                <th>Date limite</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tachesFiltrees.map((t) => (
                <tr>
                  <td>{t.titre}</td>
                  <td>{t.description}</td>
                 <td className={t.categorie === "Travail" ? "categorie-travail" :t.categorie === "Personnel" ? "categorie-personnel" :"categorie-autre"}> {t.categorie}</td> 
                 <td className={t.statut === "A faire" ? "statut-faire" :t.statut === "En cours" ? "statut-cours" : t.statut === "Terminé" ? "statut-termine" : "statut-annule"}> {t.statut} </td>
                  <td className={t.priorite === "Haute" ? "priorite-haute" :t.priorite === "Moyenne" ? "priorite-moyenne" :"priorite-basse"}> {t.priorite} </td>
                  <td>
                      {t.date}
                          {rappelProche(t.date, t.statut) && (<div className="rappel-text">Bientôt échéance!</div>)}
                          {estEnRetard(t.date, t.statut) &&(<div className="acheve">Date dépassée!</div>)}
                  </td>

                  <td>
                    <button type="button" id="m" onClick={() => modifierTache(t.id)}>✏️</button>
                    <button type="button" id="s" onClick={() => supprimerTache(t.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button type="button" className="modif" onClick={() => setShowAjouter(true)}>
            Ajouter Tâche
          </button>

          <button type="button" className="supp" onClick={supprimerTout}>
            Supprimer
          </button>
        </>
      )}
    </div>
  );
}

export default Tableau;
