import { FButton } from "@/components/atoms/FButton/FButton";
import { FInput } from "@/components/atoms/FInput/FInput";
import { AuthController } from "@/presentation/controllers/AuthController";
import { AlertColor, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

interface FLoginFormProps {
  handleAlertMessageChange: (text: string) => void;
  handleOpenAlert: (state: boolean) => void;
  handleAlertColor: (color: AlertColor) => void;
}

export default function FLoginForm(props: FLoginFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const authController = new AuthController();

  const handleValidateForm = () => {
    let message = "";

    if (!email || !password) {
      message = "Atenção! Preencha todos os campos.";
    } else if (password.length < 6) {
      message = "Atenção! A senha deve ter pelo menos 6 caracteres.";
    } else if (!email.includes("@") || !email.includes(".")) {
      message = "Atenção! Informe um email válido.";
    }

    return message;
  };

  const handleSubmit = async () => {
    props.handleAlertMessageChange("");

    const validationMessage = handleValidateForm();

    if (validationMessage) {
      props.handleAlertMessageChange(validationMessage);
      props.handleOpenAlert(true);
      props.handleAlertColor("info");
      return;
    }

    try {
      await authController.login(email, password);

      props.handleAlertMessageChange("Login realizado com sucesso!");
      props.handleAlertColor("success");
      props.handleOpenAlert(true);

      router.push("/dashboard");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const backendMessage = error.message || "Erro ao realizar login.";

      props.handleAlertMessageChange(backendMessage);
      props.handleAlertColor("error");
      props.handleOpenAlert(true);
    }
  };

  return (
    <Stack spacing={4}>
      <FInput
        options={{
          id: "email",
          label: "E-mail",
          placeholder: "E-mail",
          name: "email",
          autoFocus: true,
          value: email,
        }}
        textposition="left"
        onChange={(e) => setEmail(e.target.value)}
      />
      <FInput
        options={{
          name: "password",
          label: "Senha",
          placeholder: "Senha",
          type: "password",
          id: "password",
          value: password,
        }}
        textposition="left"
        onChange={(e) => setPassword(e.target.value)}
      />
      <FButton
        innerText="Acessar"
        options={{
          fullWidth: true,
          variant: "contained",
        }}
        onClick={handleSubmit}
      />
    </Stack>
  );
}
