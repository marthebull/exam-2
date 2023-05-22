import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --dark-grey: #424242;
  --dark-grey-transparent: rgba(66,66,66,0.10);
  --white: #ffffff;
  --white-transparent: rgba(255,255,255,0.30);
  --light-grey: #d3d3d3;
}

.white {
    color: var(--white);
}

.bg-dark {
    background-color: rgba(10,10,10,0.40);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  color: var(--dark-grey);
  background-color: var(--white);
  
}

main {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    
}

.h1 {
  font-size: 2.1rem;
  font-weight: 600;
  line-height: 120%;
}

.h2 {
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 130%;
}

.h3 {
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 130%;
}

.h4 {
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 130%;
}

.link, button, .h5 {
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 150%;
  text-decoration: none;
  color: var(--dark-grey);
  letter-spacing: 0.05rem;
}

.nav-link {
    font-weight: 500;
}

.nav-link:hover, .medium-icon:hover {
    opacity: 0.6;
}

.link-white {
font-size: 1rem;
  font-weight: 400;
  line-height: 150%;
  text-decoration: underline;
  color: var(--white);
  letter-spacing: 0.05rem;
}

h5, label, input {
  font-size: 1.20rem;
  font-weight: 400;
  line-height: 150%;
  display: block;
  text-align: start;
  letter-spacing: normal;
}

.label {
  font-size: 1.20rem;
  font-weight: 400;
}

a, .a {
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: 0;
}

.p {
  font-size: 1.1rem;
  font-weight: 300;
  line-height: 170%;
  letter-spacing: 0;
}

small {
  font-size: .9rem;
  font-weight: 400;
  line-height: 160%;
  
}

button {
  font-family: 'Outfit', sans-serif;
  display: block;
  width: 240px;
  height: 50px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  text-decoration: none;
  margin: 10px auto;
}


input[type=text],input[type=date], input[type=number], input[type=textarea], input[type=email], input[type=password], input {
  height: 50px;
  width: 100%;
  max-width: 500px;
  padding: 12px;
  border-radius: 2px;
  border: 2px solid var(--dark-grey);
  cursor: pointer;
}


form {
  width: 100%;
  max-width: 500px;
}

textarea {
  width: 100%;
  min-height: 70px;
  min-width: 100%;
  max-width: 500px;
  padding: 12px;
  border-radius: 2px;
  border: 2px solid var(--dark-grey);
  cursor: pointer;
}

input::placeholder, textarea::placeholder {
  color: var(--light-grey);
  letter-spacing: 0.03rem;
  font-size: 18px;
  font-weight: 400;
  line-height: 150%;
}

input[type=checkbox].check {
  width: 22px;
  height: 22px;
  margin-right: 20px;
  accent-color: var(--dark-grey);
  border: 2px solid var(--dark-grey);}

.icon {
  height: auto;
  width: 22px;
  margin-right: 10px;
}

.icon-row {
  height: 17px;
  width: auto;

}

.medium-icon {
    height: 56px;
  width: auto;
}


.big-icon {
height: 80px;
  width: auto;
  margin: 30px 0;
}

.flex-h {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.flex-v {
  display: flex;
  flex-direction: column;
}

.modal {
  z-index: 1200;
}

.modal-bg {
  z-index: 1100;
}

// todo: style cal
#calendar {
  margin: 30px 0;
  padding: 20px;
  border: 2px solid var(--dark-grey);
  border-radius: 2px;
}

#calendar button.rdrDayPassive {
  opacity: 0;
}

#calendar .rdrDateDisplayWrapper{
  display: none;
}

 #calendar .rdrCalendarWrapper, .rdrMonth {
  width: 100% !important;
}

 .rdrNextPrevButton, .rdrPprevButton {
  background: none;
}

.rdrDayToday .rdrDayNumber span:after {
  background-color: #424242;
}

@media screen and (max-width: 900px){
  #calendar {
  padding: 20px 0;
}

}


@media screen and (max-width: 600px){

  .h1 {
    font-size: 1.8rem;
    line-height: 130%;
  }
  
  .h2 {
    font-size: 1.63rem;
  }
  
  .h3 {
    font-size: 1.4rem;
  }
  
  .h4  {
    font-size: 1.2rem;
    line-height: 150%;
  }
  
  a {
    font-size: 1rem;
  }
  
  .p {
    font-size: 1rem;
  
  }
  
  small {
    font-size: 0.8rem;
  }

  input[type=text], input[type=number], input[type=email], input[type=password], textarea {
  width: 100%;
}
  
}

@media screen and (max-width: 350px){
  .medium-icon {
    height: 40px;
}

}`;

export const Logo = styled.img`
  height: 48px;
  width: auto;

  @media screen and (max-width: 900px) {
    height: 35px;
  }
`;

export const Container = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;

export const CenterContainer = styled.div`
  max-width: 90%;
  height: 100%;
  margin: auto auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const InfoContainer = styled.div`
  border-right: 1px solid #d3d3d3;

  @media screen and (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid #d3d3d3;
  }
`;

export const Avatar = styled.img`
  border-radius: 50%;
  height: 42px;
  width: 42px;
  margin-right: 10px;
  object-fit: cover;
`;

export const DashAvatar = styled.img`
  border-radius: 50%;
  height: 180px;
  width: 180px;
  object-fit: cover;
  margin-bottom: 10px;
`;

export const DashAvatarLoading = styled.div`
  height: 180px;
  width: 180px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

export const FormImg = styled.img`
  width: 100%;
`;

export const ButtonSolidDark = styled.button`
  background-color: var(--dark-grey);
  border: 2px solid var(--dark-grey);
  color: var(--white);

  &:hover {
    background-color: var(--dark-grey-transparent);
    border: 2px solid var(--dark-grey);
    color: var(--dark-grey);
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0);
    color: var(--dark-grey);
  }
`;

export const ButtonSolidWhite = styled.button`
  background-color: var(--white);
  border: 2px solid var(--white);
  color: var(--dark-grey);

  &:hover {
    background-color: var(--white-transparent);
    color: var(--white);
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0);
  }
`;

export const ButtonOutlineDark = styled.button`
  background-color: rgba(66, 66, 66, 0.01);
  border: 2px solid var(--dark-grey);
  color: var(--dark-grey);

  &:hover {
    background-color: var(--dark-grey-transparent);
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0);
  }
`;

export const ButtonOutlineWhite = styled.button`
  background-color: rgba(255, 255, 255, 0.01);
  border: 2px solid var(--white);
  color: var(--white);

  &:hover {
    background-color: var(--white-transparent);
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0);
  }
`;

export const AmountInput = styled.input`
  width: 20px;
`;

export default GlobalStyles;
