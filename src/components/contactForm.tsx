import { useState } from "react";
import style from "./ContactForm.module.scss";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  comment: string;
  preferredContact: "telefon" | "email";
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    comment: "",
    preferredContact: "email",
  });

  const [phoneError, setPhoneError] = useState<string>(""); // fejlmeddelelse til telefon
  const [sentMessage, setSentMessage] = useState<string>(""); // besked ved send

  // håndter inputændringer
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // valider telefonfelt
    if (name === "phone") {
      const isNumberOnly = /^[0-9]*$/.test(value);
      if (!isNumberOnly) {
        setPhoneError("Telefonnummer må kun indeholde tal");
      } else {
        setPhoneError("");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // send formular
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phoneError) {
      alert("Ret fejlene i formularen før du sender!");
      return;
    }

    setSentMessage("Formularen er sendt! ✅");
    console.log("Form Data:", formData);
  };

  // nulstil formular
  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      comment: "",
      preferredContact: "email",
    });
    setPhoneError("");
    setSentMessage("");
  };

  return (
    <div className={style.formContainer}>
      <form className={style.contactForm} onSubmit={handleSubmit}>
        <h2 className={style.heading}>Kontaktformular</h2>

        <label className={style.label}>
          Fulde navn:
          <input
            className={style.input}
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label className={style.label}>
          Telefonnummer:
          <input
            className={style.input}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {phoneError && <span className={style.error}>{phoneError}</span>}
        </label>

        <label className={style.label}>
          Email:
          <input
            className={style.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className={style.label}>
          Kommentar:
          <textarea
            className={style.textarea}
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={4}
          />
        </label>

        <fieldset className={style.fieldset}>
          <legend className={style.legend}>Foretrukken kontaktmetode:</legend>
          <label className={style.radioLabel}>
            <input
              className={style.radioInput}
              type="radio"
              name="preferredContact"
              value="telefon"
              checked={formData.preferredContact === "telefon"}//hvis begge matcher
              onChange={handleChange}
            />
            Telefon
          </label>
          <label className={style.radioLabel}>
            <input
              className={style.radioInput}
              type="radio"
              name="preferredContact"
              value="email"
              checked={formData.preferredContact === "email"}
              onChange={handleChange}
            />
            Email
          </label>
        </fieldset>

        <div className={style.buttons}>
          <button type="submit" className={style.button}>Send</button>
          <button type="button" className={style.button} onClick={handleReset}>Reset</button>
        </div>

        {sentMessage && <p className={style.sentMessage}>{sentMessage}</p>}
      </form>

      {/* Sidefelt der viser inputværdier */}
      <div className={style.preview}>
        <h3>Du har indtastet</h3>
        <p><strong>Fulde navn:</strong> {formData.fullName}</p>
        <p><strong>Telefon:</strong> {formData.phone}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Kommentar:</strong> {formData.comment}</p>
        <p><strong>Foretrukken kontakt:</strong> {formData.preferredContact}</p>
      </div>
    </div>
  );
}
