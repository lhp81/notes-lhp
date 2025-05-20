function toggleNote(button) {
  const noteContent = button.parentElement;
  const fullText = noteContent.querySelector(".full");
  const previewText = noteContent.querySelector(".preview");

  if (fullText.style.display === "none") {
    fullText.style.display = "block";
    previewText.style.display = "none";
    button.innerText = "Less";
  } else {
    fullText.style.display = "none";
    previewText.style.display = "block";
    button.innerText = "More";
  }
}

function searchNotes() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const notes = document.getElementsByClassName("note");

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const text = note.innerText.toLowerCase();

    if (input === "") {
      // Reset to only show last 5 if input is cleared
      note.style.display = i >= notes.length - 5 ? "" : "none";
    } else {
      // Show note only if it matches search
      if (text.includes(input)) {
        note.style.display = "";
      } else {
        note.style.display = "none";
      }
    }
  }
}

// Render Markdown & handle preview
document.addEventListener("DOMContentLoaded", () => {
  const notes = Array.from(document.querySelectorAll('.note'));
  const total = notes.length;

  notes.forEach((note, index) => {
    const source = note.querySelector('.markdown-source');
    const preview = note.querySelector('.markdown-preview');
    const full = note.querySelector('.markdown-full');

    if (source && preview && full) {
      const rawMarkdown = source.textContent.trim();
      const splitIndex = rawMarkdown.indexOf('\n\n');
      const previewMarkdown = splitIndex !== -1 ? rawMarkdown.slice(0, splitIndex) : rawMarkdown;
      const fullMarkdown = rawMarkdown;

      preview.innerHTML = marked.parse(previewMarkdown);
      full.innerHTML = marked.parse(fullMarkdown);
    }

    // Hide all except last 5 by default
    if (index < total - 5) {
      note.style.display = "none";
    }
  });
});

function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.toggle("dark-mode");

  // Optional: Save user preference to localStorage
  localStorage.setItem("preferredTheme", isDark ? "dark" : "light");
}

// Load theme from localStorage if it exists
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("preferredTheme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeSwitch").checked = true;
  }
});
