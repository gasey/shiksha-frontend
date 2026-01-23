import { useAuth } from "../contexts/AuthContext";

const AuthLoader = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.spinner} />
      </div>
    );
  }

  return children;
};

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: 40,
    height: 40,
    border: "4px solid #ddd",
    borderTop: "4px solid #333",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default AuthLoader;
