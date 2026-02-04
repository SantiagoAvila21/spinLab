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
} from "@ionic/react";
import {
  tennisballOutline,
  logInOutline,
  mailOutline,
  lockClosedOutline,
  closeOutline,
} from "ionicons/icons";
import { useState, useRef } from "react";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const passwordInputRef = useRef<HTMLIonInputElement>(null);

  // Validador de email usando regex simple
  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        {/* Boton de cerrar */}
        <IonButton fill="clear" routerLink="/" className="close-button">
          <IonIcon icon={closeOutline} />
        </IonButton>

        
        <IonGrid className="login-container ion-height-full">
          <IonRow className="login-row">
            {/* Card de login */}
            <IonCol size="12" size-md="5" size-lg="4">
              <div className="login-card">
                {/* Header */}
                <div className="login-header">
                  {/* Bolita animada */}
                  <IonCol size="12" size-md="1" className="ball-container">
                    <div className="pingpong-ball-animated">
                      <IonIcon icon={tennisballOutline} className="ball-icon" />
                    </div>
                    <div className="ball-shadow" />
                  </IonCol>

                  <IonText>
                    <h1>Login</h1>
                    <p className="login-subtitle">
                      Accede a tu cuenta de SpinLab
                    </p>
                  </IonText>
                </div>

                {/* Formulario */}
                <form>
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
                    />
                  </IonItem>

                  <IonItem lines="none" className="input-item with-icon">
                    <IonIcon
                      icon={lockClosedOutline}
                      slot="start"
                      className="input-icon"
                    />

                    <IonInput
                      type="password"
                      label="Contraseña"
                      labelPlacement="floating"
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
                    <IonButton fill="clear" size="small" routerLink="/register">
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
