import React, { useEffect, useState } from "react";
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
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../redux/actions";

const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is not a valid email address")
    .required("Email is required to login"),
  password: Yup.string().required("Password is required to login"),
});

/**
 * TODO: Add Documentation
 */
function Login() {
  const isLoggingIn = useSelector(state => state.auth.login.inflight);
  const loginErr = useSelector(state => state.auth.login.err);
  const [loginErrMsg, setLoginErrMsg] = useState("");

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
    validationSchema: loginFormSchema,

    onSubmit(payload, submission) {
      dispatch(auth.loginStart(payload));
      submission.setSubmitting(false);
    },
  });

  useEffect(() => {
    if (loginErr) {
      setLoginErrMsg("We're sorry, we encountered some sort of error!");
    }
  }, [loginErr]);

  return (
    <Center w="100vw" h="100vh" bg="gray.100">
      <form onSubmit={handleSubmit}>
        <Stack
          bg="gray.50"
          borderRadius="20px"
          border="1px solid"
          borderColor="gray.200"
          minW="20ch"
          maxW="60ch"
          spacing="12px"
          p="24px"
        >
          <Heading size="lg" pb="7px">
            Login
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
          {loginErr && loginErrMsg && (
            <Text fontSize="sm" color="red.500">
              {loginErrMsg}
            </Text>
          )}
          <Stack direction="row">
            <Button
              colorScheme="blue"
              variant="ghost"
              onClick={() => navigate("/signup")}
            >
              Create an account
            </Button>
            <Button
              type="submit"
              minW="10ch"
              colorScheme="blue"
              disabled={isSubmitting || isLoggingIn}
              isLoading={isSubmitting || isLoggingIn}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </form>
    </Center>
  );
}

export default withTokenCheck(Login);
