import React from "react";
import withTokenCheck from "../hocs/withTokenCheck";
import {
  Button,
  Center,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
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
  const isLoggingIn = useSelector(state => state.auth.loginInflight);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitLoginForm = (payload, submission) => {
    dispatch(auth.loginStart(payload));
    submission.setSubmitting(false);
  };

  return (
    <Center w="100vw" h="100vh" bg="gray.100">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginFormSchema}
        onSubmit={submitLoginForm}
      >
        {({
          onSubmit,
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          touched,
          values,
        }) => (
          <Form>
            <Stack
              bg="gray.50"
              borderRadius="20px"
              border="1px solid"
              borderColor="gray.200"
              minW="20ch"
              maxW="60ch"
              spacing="7px"
              p="14px"
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
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Stack direction="row" pt="7px">
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
                  onSubmit={onSubmit}
                  disabled={isSubmitting || isLoggingIn}
                  isLoading={isSubmitting || isLoggingIn}
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Center>
  );
}

export default withTokenCheck(Login);
