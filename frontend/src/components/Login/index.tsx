import React from "react";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useLoginMutation } from "../../services/user-api";
import { useAppDispatch } from "../../store/store";
import { setLoading } from "../../store/reducers/authReducer";
import { motion } from "framer-motion"; // Import framer-motion for animations (commented out until fixed)
import {toast} from "react-toastify"; // Import toast from react-toastify
import {  useNavigate } from "react-router-dom";
interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginFormInputs>();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      dispatch(setLoading({ loading: true })); // Set loading state
      const response = await login(data).unwrap(); // Call login mutation
      toast.success("Login successful!");
      navigate('/')
    } catch (err) {
      toast.error("Login failed!");
    } finally {
      dispatch(setLoading({ loading: false })); // Reset loading state
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }} // Start offscreen and invisible
        animate={{ opacity: 1, y: 0 }} // Fade in and slide up
        transition={{ duration: 0.8 }} // 0.8 second animation duration
      >
        <Card sx={{ maxWidth: 400, p: 3, boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Login
            </Typography>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field, fieldState }) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  </motion.div>
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: "Password is required" }}
                render={({ field, fieldState }) => (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <TextField
                      {...field}
                      label="Password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="password"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  </motion.div>
                )}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  sx={{ mt: 2 }}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </motion.div>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login;
