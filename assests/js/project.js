import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyC1oRcJ7eAQaAO4kBqTJMt2w-ekoOCfj-I"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);

document.getElementById("projectRecommendationBtn").addEventListener("click", getProjectRecommendations);

async function getProjectRecommendations() {
    const skills = getSkills();
    const projectRecommendations = await generateProjectRecommendations(skills);
    displayProjectRecommendations(projectRecommendations);
}

async function generateProjectRecommendations(skills) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const results = await Promise.all(skills.map(skill => model.generateContent(skill + " projects and github repos links")));
    const projectRecommendations = results.flatMap(result => {
        const response = result.response;
        return response.text().split("\n\n");
    });
    return projectRecommendations;
}

function displayProjectRecommendations(projectRecommendations) {
    const popupWindow = window.open("", "Project Recommendations", "width=600,height=400,scrollbars=yes,resizable=yes");


    const convertedHTML = convertMarkdownToHtml(projectRecommendations.join("\n\n"));
    popupWindow.document.body.innerHTML = convertedHTML;
}

function convertMarkdownToHtml(markdownText) {
    const md = window.markdownit();
    return md.render(markdownText);
}

function getSkills() {
    const skillsInputs = document.querySelectorAll(".skill");
    const skills = [];
    skillsInputs.forEach(input => {
        const skill = input.value.trim();
        if (skill) {
            skills.push(skill);
        }
    });
    return skills;
}