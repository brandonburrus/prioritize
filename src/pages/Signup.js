import React, { useState, useEffect } from "react";
import withTokenCheck from "../hocs/withTokenCheck";
import {
  Button,
  Center,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import * as actions from "../redux/actions";
import routes from "../config/routes.json";

const signupFormSignup = Yup.object().shape({
  email: Yup.string()
    .email("Email is not a valid email address")
    .required("Email may not be empty"),
  password: Yup.string()
    .matches(/[a-z]/, "Password needs to have at least one lowercase character")
    .matches(/[A-Z]/, "Password needs to have at least one uppercase character")
    .matches(/[0-9]/, "Password needs to have at least one number")
    .matches(
      /[#?!@$ %^&*-]/,
      "Password needs to have at least one special character"
    )
    .min(6, "Password needs to be at least 6 characters")
    .required("Password may not be empty"),
});

/**
 * Sign up page for users to create a new account on
 */
function Signup() {
  const isSigningUp = useSelector(state => state.auth.signup.inflight);
  const signupErr = useSelector(state => state.auth.signup.err);
  const [signupErrMsg, setSignupErrMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    errors,
    values,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signupFormSignup,

    onSubmit(payload, submission) {
      dispatch(actions.auth.signupStart(payload));
      submission.setSubmitting(false);
    },
  });

  useEffect(() => {
    if (signupErr) {
      const errCode = signupErr?.response?.err?.code;
      switch (errCode) {
        case "auth/email-already-in-use":
          setSignupErrMsg("This email already has an account");
          break;
        default:
          setSignupErrMsg("We're sorry, we encountered some sort of error!");
      }
    }
  }, [signupErr]);

  return (
    <Center w="100vw" h="100vh" bg="gray.100">
      <form onSubmit={handleSubmit}>
        <Stack
          bg="gray.50"
          borderRadius="20px"
          border="1px solid"
          borderColor="gray.200"
          minW="40ch"
          spacing="12px"
          p="24px"
        >
          <Heading size="lg" pb="7px">
            Sign up
          </Heading>
          <Divider />
          <FormControl isInvalid={errors.email && touched.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              autoComplete="username"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password && touched.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          {signupErr && signupErrMsg && (
            <Text fontSize="sm" color="red.500">
              {signupErrMsg}
            </Text>
          )}
          <Stack direction="row" justify="flex-end">
            <Button
              colorScheme="blue"
              variant="ghost"
              onClick={() => navigate(routes.LOGIN)}
            >
              Login to your account
            </Button>
            <Button
              type="submit"
              minW="10ch"
              colorScheme="blue"
              disabled={isSubmitting || isSigningUp}
              isLoading={isSubmitting || isSigningUp}
            >
              Sign up
            </Button>
          </Stack>
        </Stack>
      </form>
    </Center>
  );
}

export default withTokenCheck(Signup);
