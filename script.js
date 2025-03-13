async function formSubmit(event) {
  event.preventDefault();
  let form = event.srcElement;
  fetch("https://eolbnzhkd7q6gwy.m.pipedream.net", {
    method: "post",
    body: JSON.stringify({
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    }),
  });
  alert("Thanks for reaching out! I'll get back to you soon");
}

(async function run() {
  let projects = await fetch(
    "https://api.github.com/users/vinod-kumar1/repos",
    {
      headers: {
        Authorization: "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",
      },
    }
  );
  let res = await projects.json();
  let pinnedProjects = res.filter((project) =>
    project.description?.includes("pinThisProject")
  );

  function createProjectCard({ name, html_url, homepage, description }) {
    // Ensure the description is a maximum of 15 words
    const shortDescription =
      description.split(" ").slice(0, 15).join(" ") +
      (description.split(" ").length > 15 ? "..." : "");

    // Create the main div
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    // Create project name (h2)
    const projectName = document.createElement("h2");
    projectName.classList.add("project-name");
    projectName.innerText = name;
    projectCard.appendChild(projectName);

    // Create project description (p)
    const projectDescription = document.createElement("p");
    projectDescription.classList.add("project-description");
    projectDescription.innerText = shortDescription;
    projectCard.appendChild(projectDescription);

    // Create the project links container (div)
    const projectLinks = document.createElement("div");
    projectLinks.classList.add("project-links");

    // Create GitHub link
    const githubLink = document.createElement("a");
    githubLink.href = html_url;
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";
    githubLink.classList.add("github-link");
    githubLink.innerText = "GitHub Repository";

    // Create Project Website link
    const projectLink = document.createElement("a");
    projectLink.href = homepage;
    projectLink.target = "_blank";
    projectLink.rel = "noopener noreferrer";
    projectLink.classList.add("project-link");
    projectLink.innerText = "Site ↗";

    // Add the links to the project links div
    projectLinks.appendChild(githubLink);
    projectLinks.appendChild(document.createTextNode(" | ")); // separator
    projectLinks.appendChild(projectLink);

    // Add the links section to the project card
    projectCard.appendChild(projectLinks);

    // Append the project card to the container
    document.getElementById("projects").appendChild(projectCard);
  }

  for (let i = 0; i < pinnedProjects.length; i++) {
    createProjectCard(pinnedProjects[i]);
  }
})();
