import { useState } from "react";
import "./Interface.css";
import { useNavigate } from "react-router-dom";
function Interface() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const handleSubmit =(e)=> {
    e.preventDefault();  
    if(name === ""){
    setError("Veuillez saisir votre nom");
    return;
    }
    if (email === "" || password === "") {
      setError("Veuillez remplir tous les champs");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
   
     setError("");
      localStorage.setItem("user", email);
      localStorage.setItem("password", password);
      localStorage.setItem("name", name);
    navigate("/Tableau"); 
  };
  
  return (
    <div className="style">
      <h1>Gestion des Tâches</h1>
      <form onSubmit={handleSubmit}>
        <h2>Connectez-vous pour gérer vos tâches</h2>
        <h3>Nom   </h3><input id="input" type="text" placeholder="Saisir votre nom" value={name} onChange={(e) => setName(e.target.value)}/><br></br>
        <h3>Email   </h3> <input id="input" type="email" placeholder="Votre Email ID" value={email} onChange={(e) => setEmail(e.target.value)}/><br />
        <h3>Mot de passe   </h3><input  id="input" type="password" placeholder="Votre Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="error-message">{error}</p>}
        <p>Utilisez n'importe quel email et mot de passe (min. 6 caractères)</p>
        <button id="connect" type="submit" >Se connecter</button>
      </form>
    </div>
  );
}
export default Interface;
