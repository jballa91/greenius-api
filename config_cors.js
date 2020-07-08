module.exports = {
  frontend:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://master.dlrsjc6carcc2.amplifyapp.com/",
};
