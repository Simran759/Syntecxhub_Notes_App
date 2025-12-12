// Simple hash function (NOT cryptographic, for educational purposes)
// In production, use bcrypt or similar on backend
export function simpleHash(password) {
  let hash = 0;
  if (password.length === 0) return hash.toString();
  
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash).toString(16);
}

export function verifyPassword(password, hashedPassword) {
  return simpleHash(password) === hashedPassword;
}
