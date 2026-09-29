/**
 * Client Portal Configuration
 * 
 * Each record represents a registered client:
 * - id: Unique client ID (matched case-insensitively)
 * - passwordHash: SHA-256 hash of the password (lowercase hex)
 * - redirect: Relative destination path for the client's project
 */
window.CLIENTS = [
  {
    id: "sample-client",
    // SHA-256 hash for password: "password"
    passwordHash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    redirect: "/sample-project"
  },
  {
    id: "acme",
    // SHA-256 hash for password: "password"
    passwordHash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
    redirect: "/acme"
  }
];

// Compatibility export for module systems if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = window.CLIENTS;
}
