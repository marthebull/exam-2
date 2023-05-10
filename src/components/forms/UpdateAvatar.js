import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { usePutAvatarMutation } from "../../state/api/api";
import {
  ButtonOutlineDark,
  ButtonSolidDark,
  DashAvatar,
} from "../../styles/GlobalStyles";
import { useSelector } from "react-redux";

const UpdateAvatarSchema = Yup.object().shape({
  avatar: Yup.string().url("Must be a valid url"),
});

const UpdateAvatar = ({ username, showModal, setShowModal }) => {
  //   const {
  //     data: user,
  //     isLoading: isUserLoading,
  //     isError: isUserError,
  //   } = useGetAvatarByNameQuery(username);

  const currentAvatar = useSelector((state) => state.persisted.auth.avatar);

  const [avatarUrl, setAvatarUrl] = useState({ avatar: currentAvatar });
  console.log(username);
  console.log(currentAvatar);

  //   useEffect(() => {
  //     if (user && user.avatar) {
  //       setAvatarUrl(user.avatar);
  //     }
  //   }, [user]);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [updateAvatar] = usePutAvatarMutation();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAvatarUrl((prevState) => ({
      ...prevState,
      [name]: value || null,
    }));
  };

  useEffect(() => {
    console.log(avatarUrl);
  }, [avatarUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      // handle success
      await UpdateAvatarSchema.validate(avatarUrl, { abortEarly: false });
      const response = await updateAvatar({ username, avatar: avatarUrl });
      console.log(response);
      window.location.reload();
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
      setShowModal(!showModal);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col ">
      <div className="gap-2 mb-6 items-start">
        <DashAvatar
          src={
            avatarUrl.avatar
              ? avatarUrl.avatar
              : currentAvatar || "/images/placeholder-avatar.svg"
          }
          className="mx-auto"
        />

        {avatarUrl.avatar > 0 && (
          <img
            src={avatarUrl.avatar}
            className="mb-3 rounded-sm"
            alt={avatarUrl.name}
          ></img>
        )}

        <label htmlFor="avatar" className="mb-1">
          new avatar URL
        </label>
        <input
          id="avatar"
          name="avatar"
          type="text"
          onChange={handleChange}
          //   value={avatarUrl.avatar}
          placeholder="example.url.gif"
          className="mb-2"
        />
        {errors.avatar && <div>{errors.avatar}</div>}
      </div>

      <ButtonSolidDark type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "update"}
      </ButtonSolidDark>
    </form>
  );
};

export default UpdateAvatar;
