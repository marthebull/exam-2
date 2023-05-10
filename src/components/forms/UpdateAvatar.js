import React, { useState } from "react";
import * as Yup from "yup";
import { usePutAvatarMutation } from "../../state/api/api";
import { ButtonSolidDark, DashAvatar } from "../../styles/GlobalStyles";
import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../state/features/authSlice";

const UpdateAvatarSchema = Yup.object().shape({
  avatar: Yup.string().url("Must be a valid url"),
});

const UpdateAvatar = ({ username, showModal, setShowModal }) => {
  const currentAvatar = useSelector((state) => state.persisted.auth.avatar);

  const dispatch = useDispatch();

  const [avatarUrl, setAvatarUrl] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [updateNewAvatar] = usePutAvatarMutation();

  const handleChange = (event) => {
    setAvatarUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // handle success
      await UpdateAvatarSchema.validate(
        { avatar: avatarUrl },
        { abortEarly: false }
      );
      const response = await updateNewAvatar({
        username,
        avatar: { avatar: avatarUrl },
      });
      dispatch(setAvatar(avatarUrl));
      //console.log({ avatar: avatarUrl });
      console.log(response);
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
            avatarUrl
              ? avatarUrl
              : currentAvatar || "/images/placeholder-avatar.svg"
          }
          className="mx-auto"
        />

        <label htmlFor="avatar" className="mb-1">
          new avatar URL
        </label>
        <input
          id="avatar"
          name="avatar"
          type="text"
          onChange={handleChange}
          value={avatarUrl}
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
