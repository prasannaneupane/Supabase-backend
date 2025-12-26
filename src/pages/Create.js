import { useState } from "react";
import supabase from "../config/supabaseCLient";

const Create = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [rating, setRating] = useState('');
  const [formError, setFormError] = useState(null);

  // Make handleSubmit async because you are using await inside
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    // Validate fields first
    if (!title || !method || !rating) {
      setFormError("Please fill in all fields");
      return;
    }

    // Validate rating range before sending data
    if (rating < 1 || rating > 10) {
      setFormError("Rating must be between 1 and 10");
      return;
    }

    setFormError(null); // Clear previous errors

    // Insert data into Supabase

    const { data, error } = await supabase
      .from("smoothies")
      .insert([{ title, method, rating }]); // Convert rating to number 

    if (error) {
      console.error(error);
      setFormError("Failed to create smoothie recipe.");
      return;
    }

    if (data) {
      console.log("Smoothie created:", data);
      setTitle('');
      setMethod('');
      setRating('');
      setFormError(null);
    }
  };

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="10"
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
