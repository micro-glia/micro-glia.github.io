const imaginedConversations = [
  {
    id: "steve-jobs", name: "Steve Jobs", initials: "SJ", accent: "graphite",
    messages: [
      { side: "gray", text: "If the story needs a paragraph to explain the product, the product probably still needs editing." },
      { side: "blue", text: "That is what I keep returning to: make the idea precise enough that the experience explains it." },
      { side: "gray", text: "Good. Simplicity is the result of the work, not the absence of it." },
      { side: "blue", text: "Simplicity takes more editing than adding." }
    ]
  },
  {
    id: "ben-horowitz", name: "Ben Horowitz", initials: "BH", accent: "navy",
    messages: [
      { side: "blue", text: "How do you tell whether a founder is genuinely resilient or just very good at sounding confident?" },
      { side: "gray", text: "Watch what they do after the plan stops working. The hard decisions reveal more than the pitch." },
      { side: "blue", text: "So diligence the response to reality, not just the original insight." }
    ]
  },
  {
    id: "karl-deisseroth", name: "Karl Deisseroth", initials: "KD", accent: "indigo",
    messages: [
      { side: "gray", text: "The most useful tools often begin with a question that existing methods cannot answer." },
      { side: "blue", text: "I love that framing. Let the biological question define the technology—not the reverse." },
      { side: "gray", text: "Exactly. Build with the phenomenon in view." }
    ]
  },
  {
    id: "shaun-maguire", name: "Shaun Maguire", initials: "SM", accent: "ember",
    messages: [
      { side: "blue", text: "I keep thinking the best frontier investments look unreasonable before the technical inflection is obvious." },
      { side: "gray", text: "That is usually the point. You need a real technical view and the conviction to be early." },
      { side: "blue", text: "Technical depth first, consensus later." }
    ]
  },
  {
    id: "anjney-midha", name: "Anjney Midha", initials: "AM", accent: "violet",
    messages: [
      { side: "gray", text: "A model demo is interesting. A new behavior people repeat is a company." },
      { side: "blue", text: "So the question is not only what the model can do, but what habit it makes newly possible." },
      { side: "gray", text: "Yes—distribution begins with a behavior worth returning to." }
    ]
  },
  {
    id: "brian-chesky", name: "Brian Chesky", initials: "BC", accent: "coral",
    messages: [
      { side: "blue", text: "How do you protect craft when the company grows beyond the founders touching every screen?" },
      { side: "gray", text: "Make quality part of the operating system. Review the real experience, not abstractions of it." },
      { side: "blue", text: "The product is the details the organization learns to notice." }
    ]
  },
  {
    id: "bruce-dunlevie", name: "Bruce Dunlevie", initials: "BD", accent: "forest",
    messages: [
      { side: "gray", text: "The enduring partnerships are built before you know exactly how large the outcome can become." },
      { side: "blue", text: "Because the decision is ultimately about people, judgment, and the capacity to keep learning." },
      { side: "gray", text: "And being the call they want to make when things get difficult." }
    ]
  }
];

const imaginedList = document.querySelector("#conversationList");
const imaginedChat = document.querySelector("#messageChat");
const imaginedRecipient = document.querySelector("#messageRecipient");
const imaginedSearch = document.querySelector("#messageSearch");
let imaginedActiveId = imaginedConversations[0].id;

function lastPreview(conversation) {
  const last = conversation.messages.at(-1);
  return `${last.side === "blue" ? "You: " : ""}${last.text}`;
}

function renderImaginedList(query = "") {
  const normalized = query.trim().toLowerCase();
  imaginedList.innerHTML = imaginedConversations
    .filter(conversation => `${conversation.name} ${lastPreview(conversation)}`.toLowerCase().includes(normalized))
    .map(conversation => `<button class="conversation${conversation.id === imaginedActiveId ? " selected" : ""}" data-conversation="${conversation.id}"><span class="avatar ${conversation.accent}">${conversation.initials}</span><span class="conversation-copy"><strong>${conversation.name}</strong><span>${lastPreview(conversation)}</span></span></button>`)
    .join("");
  imaginedList.querySelectorAll("[data-conversation]").forEach(button => button.addEventListener("click", () => openImaginedConversation(button.dataset.conversation)));
}

function openImaginedConversation(id) {
  const conversation = imaginedConversations.find(item => item.id === id) || imaginedConversations[0];
  imaginedActiveId = conversation.id;
  imaginedRecipient.textContent = conversation.name;
  imaginedChat.innerHTML = `<div class="imagined-disclaimer">A fictional exchange inspired by their public work—not a real conversation.</div>${conversation.messages.map(message => `<span class="bubble ${message.side}">${message.text}</span>`).join("")}<small>Delivered</small>`;
  renderImaginedList(imaginedSearch.value);
  imaginedChat.scrollTop = imaginedChat.scrollHeight;
}

imaginedSearch.addEventListener("input", () => renderImaginedList(imaginedSearch.value));

const cleanMessageForm = document.querySelector("#messageForm").cloneNode(true);
document.querySelector("#messageForm").replaceWith(cleanMessageForm);
cleanMessageForm.addEventListener("submit", event => {
  event.preventDefault();
  const input = cleanMessageForm.querySelector("#messageText");
  const value = input.value.trim();
  if (!value) return;
  const conversation = imaginedConversations.find(item => item.id === imaginedActiveId);
  conversation.messages.push({ side: "blue", text: value.replace(/[<>]/g, "") });
  input.value = "";
  openImaginedConversation(imaginedActiveId);
});

renderImaginedList();
openImaginedConversation(imaginedActiveId);
