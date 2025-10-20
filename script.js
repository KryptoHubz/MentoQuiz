const quizData = [
    {
        question: "Why is Mento considered “special” compared to most crypto projects?",
        options: [
            "NFTs for every fiat currency",
            "Multichain on-chain FX liquidity & interoperability",
            "Only issues USD-backed stablecoins",
            "Focuses on high-frequency trading"
        ],
        answer: "Multichain on-chain FX liquidity & interoperability"
    },
    {
        question: "What’s a key goal of Mento’s stablecoin system?",
        options: [
            "Replace all national currencies",
            "Seamless cross-border payments & local currency adoption",
            "Only benefit big institutions",
            "Mint NFTs for each currency"
        ],
        answer: "Seamless cross-border payments & local currency adoption"
    },
    {
        question: "Which tech partner is critical for Mento’s interoperability?",
        options: [
            "Ethereum only",
            "Wormhole protocol",
            "Centralized bank consortium",
            "NFT marketplaces"
        ],
        answer: "Wormhole protocol"
    },
    {
        question: "Long-term vision of Mento?",
        options: [
            "Dominate stablecoin trading",
            "Enable currencies to “go on-chain” & interoperate",
            "Issue NFTs for all digital transactions",
            "Replace Bitcoin"
        ],
        answer: "Enable currencies to “go on-chain” & interoperate"
    },
    {
        question: "What challenge does on-chain FX aim to solve?",
        options: [
            "More complex NFT systems",
            "Reduce friction in cross-border payments & currency exchange",
            "Make each blockchain a separate payment network",
            "Centralize stablecoin control"
        ],
        answer: "Reduce friction in cross-border payments & currency exchange"
    },
    {
        question: "Which is NOT a focus of Mento?",
        options: [
            "Multichain FX liquidity",
            "Cross-border payments",
            "Issuing only a single fiat-backed stablecoin",
            "On-chain local currencies"
        ],
        answer: "Issuing only a single fiat-backed stablecoin"
    },
    {
        question: "What could Mento enable in the future if successful?",
        options: [
            "Seamless multi-currency, cross-chain transactions",
            "Monopoly on global currency",
            "Exclusive NFTs for banks",
            "Replace all blockchains with one"
        ],
        answer: "Seamless multi-currency, cross-chain transactions"
    }
];

const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const progressEl = document.getElementById("progress");

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
    answered = false;
    const currentQuiz = quizData[currentQuestion];
    questionEl.innerText = currentQuiz.question;
    optionsContainer.innerHTML = "";

    currentQuiz.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(button, option));
        optionsContainer.appendChild(button);
    });

    nextBtn.classList.add("hidden");
    updateProgress();
}

function selectOption(button, selected) {
    if (answered) return;
    answered = true;

    const correct = quizData[currentQuestion].answer;
    if (selected === correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        // Highlight the correct answer
        Array.from(optionsContainer.children).forEach(btn => {
            if (btn.innerText === correct) btn.classList.add("correct");
        });
    }
    nextBtn.classList.remove("hidden");
}

function updateProgress() {
    const progressPercent = ((currentQuestion) / quizData.length) * 100;
    progressEl.style.width = `${progressPercent}%`;
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById("quiz-container").classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreEl.innerText = `${score} / ${quizData.length}`;
    progressEl.style.width = `100%`;
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    loadQuestion();
});

// Load first question on page load
loadQuestion();
