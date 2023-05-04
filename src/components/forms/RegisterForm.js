import React, { useState } from "react";
import * as Yup from "yup";
import { useRegisterMutation } from "../../state/api/api";
import { ButtonSolidDark } from "../../styles/GlobalStyles";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
    .matches(
      /(@stud\.noroff\.no|@noroff\.no)$/,
      "Email must be a @stud.noroff.no or @noroff.no address"
    ),
  avatar: Yup.string()
    .url("Invalid URL")
    .test("is-image-url", "Avatar must be a valid image URL", (value) => {
      if (!value) {
        return true; // allow empty value
      }
      return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(value);
    }),
  venueManager: Yup.boolean(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

const RegisterForm = () => {
  const [registerCredentials, setRegisterCredentials] = useState({
    name: "",
    email: "",
    avatar: "",
    venueManager: false,
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [register] = useRegisterMutation();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setRegisterCredentials((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await RegisterSchema.validate(registerCredentials, { abortEarly: false });
      const response = await register(registerCredentials);
      console.log(response);
      window.location.href = "/sign-in";
      // handle success
    } catch (error) {
      console.error(error);
      if (error.inner) {
        const formErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(formErrors);
      }
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start">
      <label htmlFor="name" className="mb-1">
        Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={handleChange}
        value={registerCredentials.name}
        placeholder="user_name"
        className="mb-4"
      />
      {errors.name && <div>{errors.name}</div>}

      <label htmlFor="email" className="mb-1">
        Email Address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={handleChange}
        value={registerCredentials.email}
        placeholder="example@noroff.no"
        className="mb-4"
      />
      {errors.email && <div>{errors.email}</div>}

      <label htmlFor="avatar" className="mb-1">
        Avatar URL
      </label>
      <input
        id="avatar"
        name="avatar"
        type="text"
        onChange={handleChange}
        value={registerCredentials.avatar}
        placeholder="example.url.gif"
        className="mb-4"
      />
      {errors.avatar && <div>{errors.avatar}</div>}

      <label htmlFor="password" className="mb-1">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={handleChange}
        value={registerCredentials.password}
        placeholder="********"
        className="mb-6"
      />
      {errors.password && <div>{errors.password}</div>}

      <div className="flex flex-row items-center mb-6">
        <input
          id="venueManager"
          name="venueManager"
          type="checkbox"
          onChange={handleChange}
          checked={registerCredentials.venueManager}
          className="check"
        />
        <label htmlFor="venueManager">
          Do you want to register as venue manager?
        </label>
      </div>

      <ButtonSolidDark type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "sign up"}
      </ButtonSolidDark>
    </form>
  );
};

export default RegisterForm;
