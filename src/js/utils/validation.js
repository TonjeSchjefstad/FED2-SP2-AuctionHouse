export function validateEmail(email) {
  if (!email || email.trim() === "") {
    return { valid: false, error: "Email is required" };
  }

  if (!email.endsWith("@stud.noroff.no")) {
    return { valid: false, error: "Email must end with @stud.noroff.no" };
  }

  const emailRegex = /^[^\s@]+@stud\.noroff\.no$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  return { valid: true };
}

export function validatePassword(password) {
  if (!password) {
    return { valid: false, error: "Password is required" };
  }

  if (password.length < 8) {
    return { valid: false, error: "Password must be at least 8 characters" };
  }

  return { valid: true };
}

export function validateUsername(username) {
  if (!username || username.trim() === "") {
    return { valid: false, error: "Username is required" };
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return {
      valid: false,
      error: "Username can only contain letters, numbers, and underscores",
    };
  }

  return { valid: true };
}

export function validateUrl(url, fieldName = "URL") {
  if (!url || url.trim() === "") {
    return { valid: true };
  }

  try {
    new URL(url);

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return {
        valid: false,
        error: `${fieldName} must start with http:// or https://`,
      };
    }

    return { valid: true };
  } catch {
    return { valid: false, error: `Invalid ${fieldName} format` };
  }
}

export function validateTitle(title) {
  if (!title || title.trim() === "") {
    return { valid: false, error: "Title is required" };
  }

  if (title.length < 3) {
    return { valid: false, error: "Title must be at least 3 characters" };
  }

  if (title.length > 100) {
    return { valid: false, error: "Title must be less than 100 characters" };
  }

  return { valid: true };
}

export function validateEndDate(dateString) {
  if (!dateString) {
    return { valid: false, error: "End date is required" };
  }

  const endDate = new Date(dateString);
  const now = new Date();

  if (isNaN(endDate.getTime())) {
    return { valid: false, error: "Invalid date format" };
  }

  if (endDate <= now) {
    return { valid: false, error: "End date must be in the future" };
  }

  return { valid: true };
}

export function validateBio(bio) {
  if (!bio || bio.trim() === "") {
    return { valid: true };
  }

  if (bio.length > 160) {
    return { valid: false, error: "Bio must be 160 characters or less" };
  }

  return { valid: true };
}

export function validateBid(amount, currentBid, userCredits) {
  if (!amount || isNaN(amount) || amount <= 0) {
    return { valid: false, error: "Please enter a valid bid amount" };
  }

  if (amount <= currentBid) {
    return {
      valid: false,
      error: `Bid must be higher than $${currentBid.toLocaleString()}`,
    };
  }

  if (userCredits && amount > userCredits) {
    return {
      valid: false,
      error: `You don't have enough credits. Your balance: $${userCredits.toLocaleString()}`,
    };
  }

  return { valid: true };
}

export function showError(errorElement, message) {
  if (!errorElement) return;

  const messageElement = errorElement.querySelector("p") || errorElement;
  messageElement.textContent = message;
  errorElement.classList.remove("hidden");
}

export function hideError(errorElement) {
  if (!errorElement) return;
  errorElement.classList.add("hidden");
}
