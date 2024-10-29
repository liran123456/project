let messages = document.getElementById('chatbot-messages');
const chatbot = document.getElementById('chatbot');
const chatbotIcon = document.getElementById('chatbot-icon');

function toggleChatbot() {
    const isHidden = chatbot.classList.contains('hidden');
    chatbot.classList.toggle('hidden', !isHidden);
    chatbot.style.display = isHidden ? 'block' : 'none';
    chatbotIcon.style.visibility = isHidden ? 'hidden' : 'visible';
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const userMessage = input.value.trim();
    if (userMessage) {
        displayMessage('user', userMessage);
        input.value = '';
        generateResponse(userMessage);
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function displayMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerText = text;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}

function generateResponse(userMessage) {
    let response = "מצטער, אני לא בטוח איך לעזור עם זה כרגע.";

    const responses = {
        'recommendation': [
            { keywords: ['המלצה', 'מה כדאי', 'מומלץ'], response: "מומלץ לבדוק את המוצרים הפופולריים שלנו בקטגוריית הגיימינג." },
            { keywords: ['מסך', 'מחשב', 'מארז'], response: "אני ממליץ על מסכי גיימינג עם קצב רענון גבוה ומעבדים מתקדמים." }
        ],
        'support': [
            { keywords: ['תמיכה', 'בעיה', 'עזרה'], response: "צוות התמיכה שלנו ישמח לעזור. ניתן ליצור קשר בצ'אט או בטלפון." },
            { keywords: ['שירות לקוחות', 'צור קשר'], response: "ניתן ליצור קשר עם שירות הלקוחות במספר 1-800-000-000." }
        ],
        'product_info': [
            { keywords: ['מה זה', 'מידע על', 'איך זה עובד'], response: "המוצר שלנו מציע ביצועים מעולים ומתאים לשימושים מגוונים." },
            { keywords: ['מעבד', 'זיכרון', 'מערכת קירור'], response: "המעבד הזה כולל טכנולוגיה מתקדמת ומותאם למשחקים." }
        ],
        'purchase': [
            { keywords: ['מחיר', 'קנייה', 'היכן ניתן לקנות'], response: "ניתן לרכוש את המוצרים באתר שלנו בעמוד החנות." },
            { keywords: ['זמן אספקה', 'משלוח'], response: "המשלוחים מגיעים תוך 3-5 ימי עסקים לכל הארץ." }
        ],
        'general': [
            { keywords: ['מי אתם', 'אודות', 'היסטוריה'], response: "אנחנו חנות שמתמחה במכירת ציוד גיימינג ומחשבים." },
            { keywords: ['איך ליצור קשר', 'פרטים', 'טלפון'], response: "אנחנו זמינים בטלפון 1-800-000-000 או בצ'אט באתר." }
        ]
    };

    for (let category in responses) {
        for (let item of responses[category]) {
            if (checkKeywords(userMessage, item.keywords)) {
                response = item.response;
                break;
            }
        }
    }

    displayMessage('bot', response);
}

function checkKeywords(message, keywords) {
    for (let keyword of keywords) {
        if (message.includes(keyword)) {
            return true;
        }
    }
    return false;
}
