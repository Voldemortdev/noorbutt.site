# demo.noorbutt.site — Private Client Portal

A secure, static client portal designed for project previews. Built to match the aesthetic of `noorbutt.site` and `dev.noorbutt.site`.

---

## 1. How to Add a New Client

Open `clients.js` and add an object to the `window.CLIENTS` array:

```javascript
window.CLIENTS = [
  // Existing clients...
  {
    id: "brand-name",                    // Case-insensitive login identifier
    passwordHash: "paste_sha256_hash_here", // Lowercase SHA-256 hash
    redirect: "/brand-name"              // Relative path to client's preview
  }
];
```

### Fields:
- **`id`**: The Client ID the client enters on sign-in (e.g. `acme`, `nike`, `studio-alpha`). It is compared case-insensitively.
- **`passwordHash`**: 64-character lowercase SHA-256 hex string of the client's password.
- **`redirect`**: The target preview directory (e.g. `/brand-name`).

---

## 2. How to Generate a Password Hash (SHA-256)

Choose any of the following quick methods to generate a SHA-256 hash for your client's password:

### Method A: Browser Console (Fastest)
Open DevTools (`F12` or `Cmd+Option+I`), paste into the Console, replacing `"YourPasswordHere"`:
```javascript
crypto.subtle.digest("SHA-256", new TextEncoder().encode("YourPasswordHere")).then(buf => console.log(Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("")));
```

### Method B: Terminal (Linux / macOS)
```bash
# Linux
echo -n "YourPasswordHere" | sha256sum | awk '{print $1}'

# macOS
echo -n "YourPasswordHere" | shasum -a 256 | awk '{print $1}'
```

### Method C: Node.js
```bash
node -e 'console.log(require("crypto").createHash("sha256").update("YourPasswordHere").digest("hex"))'
```

### Method D: Python 3
```bash
python3 -c 'import hashlib; print(hashlib.sha256(b"YourPasswordHere").hexdigest())'
```

---

## 3. Protecting Client Project Pages (Guard Script)

To prevent direct unauthenticated access to `/brand-slug/index.html`, paste this guard script at the very top of `<head>` (before any stylesheets or content) in each `/brand-slug/index.html`:

```html
<!-- Client Portal Access Guard -->
<script>
(function() {
  try {
    var raw = sessionStorage.getItem('client_session');
    if (!raw) { window.location.replace('/'); return; }
    var sess = JSON.parse(raw);
    if (!sess || !sess.authenticated || !sess.token) { window.location.replace('/'); }
  } catch (e) {
    window.location.replace('/');
  }
})();
</script>
```

Alternatively, link the included `guard.js` file:
```html
<script src="/guard.js"></script>
```

If a visitor visits `/brand-slug/` without having signed in, they are immediately redirected back to `/` without flashing page content.

---

## 4. File Structure

```
demo.noorbutt.site/
├── index.html       # Client sign-in portal & contact modal
├── 404.html         # Custom 404 page ("This page isn't available.")
├── robots.txt       # Disallows all crawlers (Disallow: /)
├── clients.js       # Client registry and SHA-256 hashes
├── guard.js         # Reusable redirect guard for client subfolders
├── favicon.svg      # Matching dark portal favicon
├── README.md        # Documentation and operational guide
└── [brand-slug]/    # Your client preview folders
    └── index.html   # Client preview page (protected with guard script)
```

---

## 5. Security & Privacy Features

- **No Indexing**: `robots.txt` disallows all user agents; `<meta name="robots" content="noindex, nofollow" />` is set across all pages.
- **No Open Graph Previews**: Omitted to keep links private in messaging apps.
- **Client-Side Hashing**: Passwords are never sent or stored in plaintext; comparison is performed using `crypto.subtle` SHA-256.
- **Rate Limiting**: The form locks for 30 seconds after 5 failed authentication attempts, preventing brute-force attempts.
- **Access Support**: Visitors who lose access can submit an inquiry directly via the integrated Web3Forms modal to `contact@noorbutt.site`.
