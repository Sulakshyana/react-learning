import { useRef, useState } from "react";
import "./InputField.css";

type TFormData = {
  name: string;
  email: string;
  number: string;
  gender: string;
  language: string[];
  continent: string;
};

type TErrors = {
  nameError: string;
  emailError: string;
  numberError: string;
};

const patterns = {
  // name: /^[a-zA-Z]{1,10}$/,
  name: /^[a-zA-Z]{3,10}$/,
  number: /^(98|97|96)\d{8}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

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

function InputFieldUseRef() {
  const formDataRef = useRef<TFormData>({
    name: "",
    email: "",
    number: "",
    gender: "",
    language: [],
    continent: "",
  });

  const errorsRef = useRef<TErrors>({
    nameError: "",
    emailError: "",
    numberError: "",
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<TFormData | null>(null);
  //force re-render
  //the state is empty object which never gets read
  const [, forceRerender] = useState({});
  //calls forceRerender function with new empty object so that react re-renders the component thinking the object is changed
  const triggerRerender = () => forceRerender({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    // if (name === "name" && value.length > 10) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     nameError: "Name cannot be more than 10 characters",
    //   }));
    //   return;
    // }

    if (name === "language") {
      const currentLanguages = formDataRef.current.language;
      formDataRef.current.language = checked
        ? [...currentLanguages, value]
        : currentLanguages.filter((lang) => lang !== value);
    } else {
      formDataRef.current[name as keyof TFormData] = value as any;
    }

    // Validation
    if (patterns[name as keyof typeof patterns]) {
      const regex = patterns[name as keyof typeof patterns];
      // {     nameError: "",     emailError: "",     numberError: ""   }
      errorsRef.current[(name + "Error") as keyof TErrors] = regex.test(value)
        ? ""
        : "Invalid " + name + " Error";

      // setErrors((prev) => ({
      //   // {     nameError: "",     emailError: "",     numberError: ""   }
      //   ...prev,
      //   [`${name}Error`]: regex.test(value) ? "" : `Invalid ${name}`,
      // }));
    }
    // if (name === "name" && value.length < 4) {
    //   setErrors((prev) => {
    //     return { ...prev, nameError: "Name must be more than 3 characters" };
    //   });
    // }
    triggerRerender();
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target; //e.target.name & e.target.value (destructuring)
    formDataRef.current[name as keyof TFormData] = value as any;
    triggerRerender();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setSubmittedData({ ...formDataRef.current });
  };

  const handleEdit = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  const { nameError, emailError, numberError } = errorsRef.current;
  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            required
            name="name"
            value={formDataRef.current.name}
            placeholder="Name"
            onChange={handleChange}
            disabled={isSubmitted}
            className="form-input"
          />
          {nameError && <p className="error">{nameError}</p>}
        </div>

        <div className="form-group">
          <input
            required
            name="email"
            type="email"
            className="form-input"
            value={formDataRef.current.email}
            onChange={handleChange}
            placeholder="Email"
            disabled={isSubmitted}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>

        <div className="form-group">
          <input
            name="number"
            value={formDataRef.current.number}
            onChange={handleChange}
            placeholder="Number"
            className="form-input"
            disabled={isSubmitted}
          />
          {numberError && <p className="error">{numberError}</p>}
        </div>
        <div className="form-group">
          <p className="form-label">Gender</p>
          {genders.map((g) => (
            <label key={g} className="form-inline">
              <input
                value={g}
                type="radio"
                name="gender"
                id={g.toLowerCase()}
                checked={formDataRef.current.gender === g}
                onChange={handleChange}
                disabled={isSubmitted}
              />
              {g}
            </label>
          ))}
        </div>

        <div className="form-group">
          <p className="form-label">Languages you know</p>
          {languages.map((lang, idx) => (
            <label key={lang + "-" + idx} className="form-inline">
              <input
                value={lang}
                type="checkbox"
                name="language"
                id={`${lang}-${idx}`}
                onChange={handleChange}
                disabled={isSubmitted}
                checked={formDataRef.current.language.includes(lang)}
              />
              {lang}{" "}
            </label>
          ))}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="continent">
            Select your continent
          </label>
          <br />
          <select
            required
            name="continent"
            id="continents"
            value={formDataRef.current.continent}
            disabled={isSubmitted}
            className="form-input"
            onChange={handleSelectChange}
          >
            <option value="">-- Select --</option>
            {continents.map((cont) => (
              <option key={cont} value={cont}>
                {cont}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          id="formSubmit"
          className="form-button form-submit-btn"
        >
          Submit
        </button>
        <button
          type="button"
          id="formEdit"
          className="form-button form-edit-btn"
          onClick={handleEdit}
          disabled={!isSubmitted}
        >
          Edit
        </button>
        {isSubmitted && submittedData && (
          <div className="submitted">
            {submittedData.name && <p>Name: {submittedData.name}</p>}
            {submittedData.email && <p>Email: {submittedData.email}</p>}
            {submittedData.number && <p>Number {submittedData.number}</p>}
            {submittedData.gender && <p>Gender: {submittedData.gender}</p>}
            {submittedData.language && (
              <p>Language: {submittedData.language.join(", ")}</p>
            )}
            {submittedData.continent && (
              <p>Continent: {submittedData.continent}</p>
            )}
          </div>
        )}
      </form>
    </>
  );
}
export default InputFieldUseRef;
