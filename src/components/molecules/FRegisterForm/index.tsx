import { FButton } from "@/components/atoms/FButton/FButton";
import { FInput } from "@/components/atoms/FInput/FInput";
import { AuthController } from "@/presentation/controllers/AuthController";
import { AlertColor, Stack } from "@mui/material";
import { useState } from "react";

interface FLoginPageProps {
  handleAlertMessageChange: (text: string) => void;
  handleOpenAlert: (state: boolean) => void;
  handleAlertColor: (color: AlertColor) => void;
  handleSucessRegister: (state: boolean) => void;
}

export default function FRegisterForm(props: FLoginPageProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const authController = new AuthController();

  const handleValidateForm = () => {
    let message = "";

    if (!email || !password) {
      message = "Atenção! Preencha todos os campos.";
    } else if (password.length < 6) {
      message = "Atenção! A senha deve ter pelo menos 6 caracteres.";
    } else if (!email.includes("@") || !email.includes(".")) {
      message = "Atenção! Informe um email válido.";
    } else if (!name) {
      message = "Atenção! Informe seu nome.";
    } else if (name.length < 3) {
      message = "Atenção! O nome deve ter pelo menos 3 caracteres.";
    } else if (!/[A-Z]/.test(password)) {
      message = "Atenção! A senha deve conter pelo menos uma letra maiúscula.";
    } else if (!/[a-z]/.test(password)) {
      message = "Atenção! A senha deve conter pelo menos uma letra minúscula.";
    } else if (!/[0-9]/.test(password)) {
      message = "Atenção! A senha deve conter pelo menos um número.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      message =
        "Atenção! A senha deve conter pelo menos um caractere especial.";
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
      const respRegister = await authController.register(name, email, password);

      if (respRegister) {
        props.handleAlertMessageChange("Conta criada com sucesso!");
        props.handleAlertColor("success");
        props.handleOpenAlert(true);

        props.handleSucessRegister(true);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const backendMessage = error.message || "Erro ao cadastrar conta.";

      props.handleAlertMessageChange(backendMessage);
      props.handleAlertColor("error");
      props.handleOpenAlert(true);
    }
  };

  return (
    <Stack spacing={4}>
      <FInput
        options={{
          id: "name",
          label: "Nome",
          name: "name",
          placeholder: "Digite seu nome",
          autoFocus: true,
          value: name,
        }}
        textposition="left"
        onChange={(e) => setName(e.target.value)}
      />
      <FInput
        options={{
          id: "email",
          label: "E-mail",
          name: "email",
          placeholder: "Digite seu e-mail",
          value: email,
        }}
        textposition="left"
        onChange={(e) => setEmail(e.target.value)}
      />
      <FInput
        options={{
          name: "password",
          label: "Senha",
          type: "password",
          id: "password",
          placeholder: "Digite sua senha",
          value: password,
        }}
        textposition="left"
        onChange={(e) => setPassword(e.target.value)}
      />
      <FButton
        innerText="Criar conta"
        options={{
          fullWidth: true,
          variant: "contained",
          sx: { m: 2 },
        }}
        onClick={handleSubmit}
      />
    </Stack>
  );
}
