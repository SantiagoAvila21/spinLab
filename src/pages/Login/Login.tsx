import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonInput,
  IonButton,
  IonIcon,
  IonItem,
  useIonToast,
} from "@ionic/react";
import {
  tennisballOutline,
  logInOutline,
  mailOutline,
  lockClosedOutline,
  closeOutline,
} from "ionicons/icons";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordInputRef = useRef<HTMLIonInputElement>(null);
  const [presentToast] = useIonToast();
  const history = useHistory();
  const { login } = useAuth();

  // Regex simple de email
  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!email || !password) {
      presentToast({
        message: "Completa todos los campos",
        duration: 2000,
        color: "warning",
        position: "top",
      });
      return;
    }

    if (!validateEmail(email)) {
      presentToast({
        message: "Email no válido",
        duration: 2000,
        color: "danger",
        position: "top",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Login (context)
      await login(email, password);

      presentToast({
        message: "Bienvenido a SpinLab 🏓",
        duration: 1500,
        color: "success",
        position: "top",
      });

      history.replace("/");
    } catch (error) {
      console.error(error);
      presentToast({
        message: "Error al iniciar sesión",
        duration: 2500,
        color: "danger",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        {/* Botón cerrar */}
        <IonButton
          fill="clear"
          className="close-button"
          onClick={() => history.push("/")}
        >
          <IonIcon icon={closeOutline} />
        </IonButton>

        <IonGrid className="login-container ion-height-full">
          <IonRow className="login-row ion-justify-content-center ion-align-items-center">
            <IonCol size="12" size-md="5" size-lg="4">
              <div className="login-card">
                {/* Header */}
                <div className="login-header">
                  <div className="ball-container">
                    <div className="pingpong-ball-animated">
                      <IonIcon icon={tennisballOutline} className="ball-icon" />
                    </div>
                    <div className="ball-shadow" />
                  </div>

                  <IonText>
                    <h1>Login</h1>
                    <p className="login-subtitle">
                      Accede a tu cuenta de SpinLab
                    </p>
                  </IonText>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                  <IonItem lines="none" className="input-item with-icon">
                    <IonIcon
                      icon={mailOutline}
                      slot="start"
                      className="input-icon"
                    />
                    <IonInput
                      type="email"
                      label="Email"
                      labelPlacement="floating"
                      value={email}
                      onIonChange={(e) => setEmail(e.detail.value ?? "")}
                    />
                  </IonItem>

                  <IonItem lines="none" className="input-item with-icon">
                    <IonIcon
                      icon={lockClosedOutline}
                      slot="start"
                      className="input-icon"
                    />
                    <IonInput
                      ref={passwordInputRef}
                      type="password"
                      label="Contraseña"
                      labelPlacement="floating"
                      value={password}
                      onIonChange={(e) => setPassword(e.detail.value ?? "")}
                    />
                  </IonItem>

                  <IonButton
                    type="submit"
                    expand="block"
                    className="login-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Cargando..."
                    ) : (
                      <>
                        <IonIcon icon={logInOutline} slot="start" />
                        Entrar
                      </>
                    )}
                  </IonButton>

                  <div className="ion-text-center ion-margin-top">
                    <IonButton
                      fill="clear"
                      size="small"
                      routerLink="/register"
                    >
                      ¿No tienes cuenta? Regístrate
                    </IonButton>
                  </div>
                </form>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
