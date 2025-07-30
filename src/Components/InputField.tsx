import { useState } from "react";
import "./style.css";
function InputField() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [Submitted, setSubmitted] = useState(false);

  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState<string[]>([]);
  const [continent, setContinent] = useState("");

  const genders = ["Male", "Female"];
  const languages = ["Hindi", "English", "Nepali"];
  const continents = [
    "Asia",
    "Europe",
    "Australia",
    "Africa",
    "North America",
    "Antarctica",
    "South America",
  ];

  const nameregx = /^[a-zA-Z]{1,10}$/;
  const emailregx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const numberregx = /^(98|97|96)\d{8}$/;
  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    if (!nameregx.test(input))
      setNameError("name cannot ne more than 10 characters");
    else {
      setNameError("");
    }
    if (input.length <= 10) setName(input);
  }

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setEmail(input);
    if (!emailregx.test(input)) setEmailError("Email address invalid");
    else setEmailError("");
  }
  function handleNumber(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    if (!numberregx.test(input)) setNumberError("Number is invalid");
    else setNumberError("");
    setNumber(input);
  }

  const handleGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };

  const handleContinent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setContinent(e.target.value);
  };

  const handleLanguage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    console.log({ value, checked });

    if (checked) {
      setLanguage((prev) => [...prev, value]);
    } else {
      setLanguage((prev) => prev.filter((lang) => lang !== value));
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  console.log({ language });
  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-input-wrapper">
          <input
            required
            value={name}
            placeholder="Name"
            onChange={handleName}
            className="form-input-wrapper-input form-input-wrapper-input-name"
          ></input>
          {nameError && <p>{nameError}</p>}
        </div>

        <div>
          <input
            required
            type="email"
            value={email}
            onChange={handleEmail}
            placeholder="Email"
          />
          {emailError && <p>{emailError}</p>}
        </div>

        <div>
          <input value={number} onChange={handleNumber} placeholder="Number" />
          {numberError && <p>{numberError}</p>}
        </div>
        <div>
          <p className="form-desc">Gender</p>
          {genders.map((gender) => (
            <div key={gender}>
              <input
                type="radio"
                value={gender}
                id={gender.toLowerCase()}
                name="gender"
                onChange={handleGender}
              />
              <label htmlFor={gender.toLowerCase()}>{gender}</label>
            </div>
          ))}
        </div>

        <div>
          <p className="form-desc">Languages you know</p>
          {languages.map((lang, idx) => (
            <div key={lang}>
              <input
                type="checkbox"
                name="Language"
                value={lang}
                onChange={handleLanguage}
                id={lang.toLowerCase()}
              />
              <label htmlFor={lang.toLowerCase()}>{lang} </label>
            </div>
          ))}
        </div>
        {/* TODO: remove key ehst does key do on map */}
        <div>
          <label className="form-desc" htmlFor="continent">
            Select your continent
          </label>
          <br />
          <select
            required
            name="continents"
            id="continents"
            value={continent}
            onChange={handleContinent}
          >
            <option value="">-- Select --</option>
            {continents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" id="formsummit" className="form-desc">
          Submit
        </button>
        {Submitted && (
          <div>
            {name && <p>Name: {name}</p>}
            {email && <p>Email: {email}</p>}
            {number && <p>Number {number}</p>}
            {gender && <p>Gender: {gender}</p>}
            {language && <p>Language: {language.join(", ")}</p>}
            {continent && <p>Continent: {continent}</p>}
          </div>
        )}
      </form>
    </>
  );
}
export default InputField;
