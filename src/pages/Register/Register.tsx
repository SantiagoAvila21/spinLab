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
  personOutline,
  mailOutline,
  lockClosedOutline,
  logInOutline,
  closeOutline,
} from "ionicons/icons";
import { useState } from "react";
import "../Login/Login.css";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);

    // Simulación de registro
    setTimeout(() => {
      setIsLoading(false);
      console.log("Usuario registrado:", { name, email, password });
    }, 1200);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        {/* Boton de cerrar */}
        <IonButton fill="clear" routerLink="/" className="close-button">
          <IonIcon icon={closeOutline} />
        </IonButton>

        <IonGrid className="login-container ion-height-full">
          <IonRow className="login-row">
            <IonCol size="12" size-md="5" size-lg="4">
              <div className="login-card">
                {/* Header */}
                <div className="login-header">
                  {/* Bolita animada */}
                  <IonCol size="12" className="ball-container">
                    <div className="pingpong-ball-animated">
                      <IonIcon icon={tennisballOutline} className="ball-icon" />
                    </div>
                    <div className="ball-shadow" />
                  </IonCol>

                  <IonText>
                    <h1>Registro</h1>
                    <p className="login-subtitle">Crea tu cuenta en SpinLab</p>
                  </IonText>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                  {/* Nombre */}
                  <IonItem lines="none" className="input-item with-icon">
                    <IonIcon
                      icon={personOutline}
                      slot="start"
                      className="input-icon"
                    />
                    <IonInput
                      label="Nombre"
                      labelPlacement="floating"
                      value={name}
                      onIonChange={(e) => setName(e.detail.value!)}
                    />
                  </IonItem>

                  {/* Email */}
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
                      onIonChange={(e) => setEmail(e.detail.value!)}
                    />
                  </IonItem>

                  {/* Contraseña */}
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
                      value={password}
                      onIonChange={(e) => setPassword(e.detail.value!)}
                    />
                  </IonItem>

                  {/* Botón */}
                  <IonButton
                    type="submit"
                    expand="block"
                    className="login-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Creando cuenta..."
                    ) : (
                      <>
                        <IonIcon icon={logInOutline} slot="start" />
                        Registrarme
                      </>
                    )}
                  </IonButton>

                  {/* Link a login */}
                  <div className="ion-text-center ion-margin-top">
                    <IonButton fill="clear" size="small" routerLink="/login">
                      ¿Ya tienes cuenta? Inicia sesión
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

export default Register;
