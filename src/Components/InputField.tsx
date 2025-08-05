import { useState } from "react";
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

function InputFieldRefactor() {
  const [formData, setFormData] = useState<TFormData>({
    name: "",
    email: "",
    number: "",
    gender: "",
    language: [],
    continent: "",
  });

  const [errors, setErrors] = useState<TErrors>({
    nameError: "",
    emailError: "",
    numberError: "",
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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
      setFormData((prev) => ({
        ...prev,
        language: checked
          ? [...prev.language, value]
          : prev.language.filter((lang) => lang !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Validation
    if (patterns[name as keyof typeof patterns]) {
      const regex = patterns[name as keyof typeof patterns];
      setErrors((prev) => ({
        ...prev,
        [`${name}Error`]: regex.test(value) ? "" : `Invalid ${name}`,
      }));
    }
    // if (name === "name" && value.length < 4) {
    //   setErrors((prev) => {
    //     return { ...prev, nameError: "Name must be more than 3 characters" };
    //   });
    // }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target; //e.target.name & e,target.value (destructuring)
    console.log({ name, value });
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            required
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
            disabled={isSubmitted}
            className="form-input"
          />
          {errors.nameError && <p className="error">{errors.nameError}</p>}
        </div>

        <div className="form-group">
          <input
            required
            name="email"
            type="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            disabled={isSubmitted}
          />
          {errors.emailError && <p className="error">{errors.emailError}</p>}
        </div>

        <div className="form-group">
          <input
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="Number"
            className="form-input"
            disabled={isSubmitted}
          />
          {errors.numberError && <p className="error">{errors.numberError}</p>}
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
                checked={formData.gender === g}
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
                checked={formData.language.includes(lang)}
              />
              {lang}{" "}
            </label>
          ))}
        </div>
        {/* TODO: remove key ehst does key do on map */}
        <div className="form-group">
          <label className="form-label" htmlFor="continent">
            Select your continent
          </label>
          <br />
          <select
            required
            name="continent"
            id="continents"
            value={formData.continent}
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
        {isSubmitted && (
          <div className="submitted">
            {formData.name && <p>Name: {formData.name}</p>}
            {formData.email && <p>Email: {formData.email}</p>}
            {formData.number && <p>Number {formData.number}</p>}
            {formData.gender && <p>Gender: {formData.gender}</p>}
            {formData.language && (
              <p>Language: {formData.language.join(", ")}</p>
            )}
            {formData.continent && <p>Continent: {formData.continent}</p>}
          </div>
        )}
      </form>
    </>
  );
}
export default InputFieldRefactor;
