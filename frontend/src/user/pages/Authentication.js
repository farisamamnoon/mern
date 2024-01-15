import React, { useState, useContext } from "react";

import { useForm } from "../../shared/hooks/form-hooks";
import Input from "../../shared/components/FormElements/Input";
import "./Authentication.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";

const Authentication = () => {
  const auth = useContext(AuthContext);
  auth.logout();
  const [isLogin, setIsLogin] = useState(true);
  const [formState, inputChangeHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }

    setIsLogin((prev) => !prev);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    auth.login();
    console.log(formState.inputs);
    console.log("LOGGING IN......");
  };

  return (
    <Card className="authentication">
      <h2>Login</h2>
      <hr />
      {!isLogin && (
        <Input
          id="name"
          label="Name"
          element="input"
          type="text"
          onInput={inputChangeHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name"
        />
      )}
      <form onSubmit={formSubmitHandler}>
        <Input
          id="email"
          label="E-Mail"
          element="input"
          type="email"
          onInput={inputChangeHandler}
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid E-Mail"
        />
        <Input
          id="password"
          label="Password"
          element="input"
          type="password"
          onInput={inputChangeHandler}
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText="Please enter a valid password ( min. 8 characters)"
        />
        <Button type="submit" disabled={!formState.isValid} >
          {isLogin ? "LOGIN" : "REGISTER"}
        </Button>
      </form>
      <Button onClick={authModeHandler} inverse>
        SWITCH TO {isLogin ? "REGISTER" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Authentication;
