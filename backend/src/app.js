const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const path = require("path");
const { errorHandler } = require("./middleware/error");

// Import routes
const authRoutes = require("./routes/authRoutes");
const suggestionRoutes = require("./routes/suggestionRoutes");
const aiRoutes = require("./routes/aiRoutes");
const hotspotRoutes = require("./routes/hotspotRoutes");
const datasetRoutes = require("./routes/datasetRoutes");
const projectRoutes = require("./routes/projectRoutes");
const priorityRoutes = require("./routes/priorityRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const mpRoutes = require("./routes/mpRoutes");
const adminRoutes = require("./routes/adminRoutes");
const searchRoutes = require("./routes/searchRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

// Set security headers
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Allow images/audio to be loaded on frontend
  }),
);

// HTTP Request logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Static folder for local file uploads (fallback)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
  },
});
app.use("/api", limiter);

// Mount API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/suggestions", suggestionRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/hotspots", hotspotRoutes);
app.use("/api/v1/datasets", datasetRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/priority", priorityRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/mp", mpRoutes);
app.use("/api/v1/mp", mpRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/notifications", notificationRoutes);

// Base route health check
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running smoothly" });
});

// Centralized error handler
app.use(errorHandler);

module.exports = app;
