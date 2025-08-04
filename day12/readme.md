# 🔐 Authentication

---

## 📘 What is Authentication?

Authentication is the process of verifying the identity of a user or system. It ensures that someone trying to access a system **is actually who they claim to be**.

---

## 🎯 Why It Matters

- Keeps **data and systems secure**
- Blocks **unauthorized access**
- Essential for **user-specific access and customization**

---

## 🛠️ Common Types of Authentication

| Type                  | Description                                 | Example                              |
|-----------------------|---------------------------------------------|--------------------------------------|
| **Password-based**    | User provides a secret password             | Email or social media login          |
| **OTP (One-Time Pin)**| Temporary code sent via SMS/email           | Logging into a bank app              |
| **Biometric**         | Based on physical characteristics            | Face ID or fingerprint scanner       |
| **Token-based**       | Uses a generated token after login          | JWT in web APIs                      |
| **OAuth**             | Third-party authentication provider         | “Login with Google” or GitHub        |

---

## 🔄 Authentication vs Authorization

| Feature         | Authentication                      | Authorization                        |
|-----------------|--------------------------------------|--------------------------------------|
| Purpose         | Confirms **identity**                | Grants **permissions**               |
| Happens When?   | **First** step                       | **After** authentication             |
| Example         | Logging into a system                | Accessing an admin-only feature      |

---

## 🧪 Token-Based Authentication (JWT Flow)

1. User logs in with credentials.
2. Server verifies and returns a signed **JWT token**.
3. Client stores token (usually in localStorage or cookies).
4. Client sends token with every request (usually via headers).
5. Server validates token → grants or denies access.

---

## 💡 Pro Tips

- Always **hash passwords** on the server (e.g., using `bcrypt`)
- Use **HTTPS** to keep credentials secure in transit
- **Never store raw passwords** or tokens insecurely

