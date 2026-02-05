import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  component: React.FC;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={() =>
        user ? <Component /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
