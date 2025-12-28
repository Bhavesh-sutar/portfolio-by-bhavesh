// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navbar = document.getElementById("navbar")
const scrollToTopBtn = document.getElementById("scroll-to-top")
const contactForm = document.getElementById("contact-form")

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      status.textContent = "Message sent successfully.";
      form.reset();
    } else {
      status.textContent = "Something went wrong. Try again.";
    }
  });


// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Scroll to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("visible")
  } else {
    scrollToTopBtn.classList.remove("visible")
  }
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Fixed: Improved smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      // Fixed: Better offset calculation to prevent overlapping
      const navbarHeight = navbar.offsetHeight
      const offsetTop = target.offsetTop - navbarHeight - 20 // Added extra 20px buffer
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".section-title, .about-content, .skill-category, .project-card, .contact-content, .education-card, .experience-card, .achievements",
  )
  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// Skill bars animation
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll(".skill-progress")
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width")
          setTimeout(() => {
            bar.style.width = width + "%"
          }, 200)
        })
      }
    })
  },
  { threshold: 0.5 },
)

document.querySelectorAll(".skills-content").forEach((section) => {
  skillObserver.observe(section)
})

let people = []; // an array to hold all users
let uid = 1;

const validateForm = () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;

  // Clear previous errors
  clearErrors();

  // Name validation
  if (name.length < 2) {
    showError("name", "Name must be at least 2 characters long");
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError("email", "Please enter a valid email address");
    isValid = false;
  }

  // Message validation
  if (message.length < 10) {
    showError("message", "Message must be at least 10 characters long");
    isValid = false;
  }

  if (isValid) {
    // Add new person as an object inside the people array
    const person = {
      id: uid,
      name: name,
      email: email,
      message: message,
    };

    people.push(person); // add to array
    uid++; // increment user id

    console.log("Form submitted:", person);
    console.log("All people:", people);
  }

  return isValid;
};


const showError = (fieldName, message) => {
  const field = document.getElementById(fieldName)
  const errorElement = document.getElementById(fieldName + "-error")
  const formGroup = field.closest(".form-group")

  formGroup.classList.add("error")
  errorElement.textContent = message
}

const clearErrors = () => {
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error")
  })
  document.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = ""
  })
}

// Form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  if (validateForm()) {
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    submitBtn.textContent = "Sending..."
    submitBtn.disabled = true

    setTimeout(() => {
      // alert("Thank you for your message! I'll get back to you soon.")
      status.textContent = "";
      contactForm.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  }
})

// Real-time form validation
document.getElementById("name").addEventListener("input", (e) => {
  if (e.target.value.trim().length >= 2) {
    e.target.closest(".form-group").classList.remove("error")
    document.getElementById("name-error").textContent = ""
  }
})

document.getElementById("email").addEventListener("input", (e) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (emailRegex.test(e.target.value.trim())) {
    e.target.closest(".form-group").classList.remove("error")
    document.getElementById("email-error").textContent = ""
  }
})

document.getElementById("message").addEventListener("input", (e) => {
  if (e.target.value.trim().length >= 10) {
    e.target.closest(".form-group").classList.remove("error")
    document.getElementById("message-error").textContent = ""
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
  // Navbar scroll effect
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Scroll to top button
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("visible")
  } else {
    scrollToTopBtn.classList.remove("visible")
  }
}, 10)

window.addEventListener("scroll", debouncedScrollHandler)
