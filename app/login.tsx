import { Image, StyleSheet, Platform } from "react-native";

import {
  useForm,
  Controller,
  FieldValues,
  Control,
  RegisterOptions,
} from "react-hook-form";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TextInput, Text, Button, HelperText } from "react-native-paper";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailErrorMessages: Omit<RegisterOptions<FieldValues>, string> = {
    required: { value: true, message: "El correo electrónico es obligatorio" },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "El correo electrónico no es válido",
    },
  } as const;

  const passwordErrorMessages: Omit<RegisterOptions<FieldValues>, string> = {
    required: { value: true, message: "La contraseña es obligatoria" },
    minLength: {
      value: 5,
      message: "La contraseña debe tener al menos 5 caracteres",
    },
    maxLength: {
      value: 50,
      message: "La contraseña debe tener menos de 50 caracteres",
    },
    validate: (value: string) => {
      const hasUpperOrLowerCase = /[A-Za-z]/.test(value);
      const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

      if (hasUpperOrLowerCase && hasSymbols) {
        return true;
      }
      return "La contraseña debe tener al menos una mayúscula, una minúscula y un símbolo";
    },
  } as const;

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/logo-login.png")}
          style={styles.logoLogin}
        />
      }
    >
      <ThemedView style={styles.containerInput}>
        <ThemedText type="title" style={styles.titleContainer}>
          Iniciar Sesión!
        </ThemedText>
        <Controller
          control={control as unknown as Control<FieldValues>}
          rules={emailErrorMessages}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Correo Electrónico"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name={"email"}
        />
        <HelperText type="error" visible={hasErrors}>
          {errors.email?.message}
        </HelperText>

        <Controller
          control={control as unknown as Control<FieldValues>}
          rules={passwordErrorMessages}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Contraseña"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name={"password"}
        />
        <HelperText type="error" visible={hasErrors}>
          {errors.password?.message}
        </HelperText>
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Iniciar Sesión
        </Button>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  containerInput: { width: "100%", marginTop: 20, padding: 20, gap: 8 },
  titleContainer: {
    marginBottom: 20,
  },
  logoLogin: {
    height: "80%",
    width: 200,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
  },
});
