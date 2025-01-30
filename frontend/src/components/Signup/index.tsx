import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography, Grid, Paper } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User } from "../../types";
import { useSignupMutation } from "../../services/user-api";
import { toast } from "react-toastify";
import { useSpring, animated } from "@react-spring/web"; // Import from react-spring
import { useNavigate } from "react-router-dom";
// Validation schema using Yup
const signUpSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
}).required();

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(signUpSchema),
  });
  const [signup] = useSignupMutation();

  const onSubmit = (data: User) => {
    console.log("Form Data:", data);
    signup(data)
      .unwrap()
      .then(() => {
        toast.success("Sign up successful!");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message || "Sign up failed");
      });
  };

  // Animation spring for the form container
  const fadeIn = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
  });

  // Animation for individual input fields
  const inputAnimation = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(-20px)" },
    delay: 200,
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f3f4f6" }}>
      <animated.div style={fadeIn}>
        <Paper sx={{ padding: 3, width: "100%", maxWidth: 400, borderRadius: 4, boxShadow: 10 }}>
          <Typography variant="h5" align="center" gutterBottom color="primary">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Name Field */}
              <Grid item xs={12}>
                <animated.div style={inputAnimation}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                          },
                        }}
                      />
                    )}
                  />
                </animated.div>
              </Grid>

              {/* Email Field */}
              <Grid item xs={12}>
                <animated.div style={inputAnimation}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                          },
                        }}
                      />
                    )}
                  />
                </animated.div>
              </Grid>

              {/* Password Field */}
              <Grid item xs={12}>
                <animated.div style={inputAnimation}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                          },
                        }}
                      />
                    )}
                  />
                </animated.div>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    borderRadius: 3,
                    padding: "12px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#1976d2", // Customize hover color
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </animated.div>
    </Box>
  );
};

export default SignUpPage;
