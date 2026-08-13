import app from './app';
import db from './config/database';
const PORT = process.env.PORT || 8000;

// Start server
app.listen(PORT, () => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;

  console.log(`Server is running on ${baseUrl}`);
  console.log(`Database connection: ${db.readyState === 1 ? 'Connected' : 'Connecting...'}`);
});

export default app;
