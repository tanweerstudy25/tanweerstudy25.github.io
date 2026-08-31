/* =========================================================
   TANWEER PORTFOLIO - MAIN JAVASCRIPT
   DARK ↔ LIGHT THEME + VISITOR COUNTER
   ========================================================= */


/* =========================================================
   1. DARK / LIGHT THEME
   ========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    themeToggle
        ? themeToggle.querySelector("i")
        : null;


/* Load saved theme */

let currentTheme =
    localStorage.getItem("tanweerTheme");


/* Reset old theme values */

if (
    currentTheme !== "dark" &&
    currentTheme !== "light"
) {
    currentTheme = "dark";
}


/* Apply theme */

function applyTheme() {

    document.body.classList.remove(
        "theme-purple",
        "theme-green",
        "theme-light"
    );


    /* WHITE / LIGHT */

    if (currentTheme === "light") {

        document.body.classList.add(
            "theme-light"
        );

        if (themeIcon) {
            themeIcon.className =
                "fa-solid fa-sun";
        }

        if (themeToggle) {
            themeToggle.setAttribute(
                "title",
                "Switch to Dark Theme"
            );
        }

    }


    /* DARK */

    else {

        if (themeIcon) {
            themeIcon.className =
                "fa-solid fa-moon";
        }

        if (themeToggle) {
            themeToggle.setAttribute(
                "title",
                "Switch to White Theme"
            );
        }

    }


    localStorage.setItem(
        "tanweerTheme",
        currentTheme
    );

}


/* Theme button click */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            if (currentTheme === "dark") {
                currentTheme = "light";
            }
            else {
                currentTheme = "dark";
            }

            applyTheme();

        }
    );

}


/* Apply theme when page opens */

applyTheme();

/* =========================================================
   MOBILE NAVIGATION MENU
   ========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const menuIcon =
    menuToggle
        ? menuToggle.querySelector("i")
        : null;


/* Open / Close Mobile Menu */

if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            navMenu.classList.toggle("open");

            const isOpen =
                navMenu.classList.contains("open");


            /* Change hamburger to X */

            if (menuIcon) {

                menuIcon.className =
                    isOpen
                        ? "fa-solid fa-xmark"
                        : "fa-solid fa-bars";

            }


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        }
    );


    /* Close menu after clicking menu link */

    navMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove("open");

                    if (menuIcon) {
                        menuIcon.className =
                            "fa-solid fa-bars";
                    }

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });


    /* Close when clicking outside */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navMenu.classList.remove("open");

                if (menuIcon) {
                    menuIcon.className =
                        "fa-solid fa-bars";
                }

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* Reset menu when returning to desktop */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 760) {

                navMenu.classList.remove("open");

                if (menuIcon) {
                    menuIcon.className =
                        "fa-solid fa-bars";
                }

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}

/* =========================================================
   2. PROJECT CARDS - 3D EFFECT
   ========================================================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        function(e) {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -6;

            const rotateY =
                ((x - centerX) / centerX) * 7;


            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)
                 scale(1.02)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        function() {

            card.style.transform =
                "perspective(1000px) " +
                "rotateX(0deg) " +
                "rotateY(0deg) " +
                "translateY(0) " +
                "scale(1)";

        }
    );

});



/* =========================================================
   3. LIVE GOATCOUNTER VISITOR COUNTER
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const visitorCount =
            document.getElementById(
                "visitor-count"
            );


        if (!visitorCount) {
            return;
        }


      fetch(
    "https://live-visitor-counter.tanweerstudy25.workers.dev/",
    {
        cache: "no-store"
    }
)  

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Visitor counter unavailable"
                );

            }

            return response.json();

        })


        .then(data => {

            visitorCount.textContent =
                data.count_unique ||
                data.count ||
                "0";

        })


        .catch(error => {

            console.log(
                "GoatCounter:",
                error
            );

            visitorCount.textContent =
                "—";

        });

    }
);
/* =========================================================
   4. TANWEER AI ASSISTANT
   CLOUDFLARE WORKERS AI CHAT
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =====================================================
           CHAT ELEMENTS
        ===================================================== */

        const aiChatToggle =
            document.getElementById(
                "aiChatToggle"
            );

        const aiChatWindow =
            document.getElementById(
                "aiChatWindow"
            );

        const aiChatClose =
            document.getElementById(
                "aiChatClose"
            );

        const aiChatForm =
            document.getElementById(
                "aiChatForm"
            );

        const aiChatInput =
            document.getElementById(
                "aiChatInput"
            );

        const aiChatMessages =
            document.getElementById(
                "aiChatMessages"
            );

        const aiChatSend =
            document.getElementById(
                "aiChatSend"
            );

        const quickButtons =
            document.querySelectorAll(
                ".ai-quick-btn"
            );


        /* =====================================================
           ONLY RUN ON PAGE WITH AI CHAT
        ===================================================== */

        if (
            !aiChatToggle ||
            !aiChatWindow ||
            !aiChatClose ||
            !aiChatForm ||
            !aiChatInput ||
            !aiChatMessages
        ) {

            return;

        }


        /* =====================================================
           CLOUDFLARE AI WORKER
        ===================================================== */

        const AI_API_URL =
            "https://tanweer-ai-assistant.tanweerstudy25.workers.dev/";
               /* =====================================================
           AI CHAT SESSION ID
        ===================================================== */

        const AI_SESSION_STORAGE_KEY =
            "tanweerAiSessionId";


        let AI_SESSION_ID =
            sessionStorage.getItem(
                AI_SESSION_STORAGE_KEY
            );


        if (!AI_SESSION_ID) {

            AI_SESSION_ID =
                (
                    typeof crypto !== "undefined" &&
                    typeof crypto.randomUUID === "function"
                )
                    ? crypto.randomUUID()
                    : "chat-" +
                      Date.now() +
                      "-" +
                      Math.random()
                          .toString(36)
                          .slice(2, 10);


            sessionStorage.setItem(
                AI_SESSION_STORAGE_KEY,
                AI_SESSION_ID
            );

        }


        /* =====================================================
           OPEN CHAT
        ===================================================== */

        function openAiChat() {

            aiChatWindow.classList.add(
                "is-open"
            );

            aiChatWindow.setAttribute(
                "aria-hidden",
                "false"
            );

            aiChatToggle.setAttribute(
                "aria-expanded",
                "true"
            );


            setTimeout(
                function () {

                    aiChatInput.focus();

                },
                250
            );

        }


        /* =====================================================
           CLOSE CHAT
        ===================================================== */

        function closeAiChat() {

            aiChatWindow.classList.remove(
                "is-open"
            );

            aiChatWindow.setAttribute(
                "aria-hidden",
                "true"
            );

            aiChatToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* =====================================================
           TOGGLE BUTTON
        ===================================================== */

        aiChatToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    aiChatWindow.classList.contains(
                        "is-open"
                    );


                if (isOpen) {

                    closeAiChat();

                }

                else {

                    openAiChat();

                }

            }
        );


        /* =====================================================
           CLOSE BUTTON
        ===================================================== */

        aiChatClose.addEventListener(
            "click",
            closeAiChat
        );


        /* =====================================================
           ESC KEY CLOSE
        ===================================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    aiChatWindow.classList.contains(
                        "is-open"
                    )
                ) {

                    closeAiChat();

                }

            }
        );


        /* =====================================================
           SCROLL CHAT TO BOTTOM
        ===================================================== */

        function scrollChatBottom() {

            aiChatMessages.scrollTop =
                aiChatMessages.scrollHeight;

        }


        /* =====================================================
           ADD USER MESSAGE
        ===================================================== */

        function addUserMessage(
            message
        ) {

            const messageRow =
                document.createElement(
                    "div"
                );


            messageRow.className =
                "ai-message ai-message-user";


            const bubble =
                document.createElement(
                    "div"
                );


            bubble.className =
                "ai-message-bubble";


            /* SAFE TEXT - NO HTML INJECTION */

            bubble.textContent =
                message;


            messageRow.appendChild(
                bubble
            );


            aiChatMessages.appendChild(
                messageRow
            );


            scrollChatBottom();

        }

        /* =====================================================
           SAFE PROFESSIONAL AI RESPONSE FORMATTER
        ===================================================== */

        function appendAiInlineFormatting(
            target,
            text
        ) {

            const source =
                String(text || "");

            const pattern =
                /(\*\*[^*]+\*\*|`[^`]+`)/g;

            let lastIndex = 0;
            let match;


            while (
                (
                    match =
                        pattern.exec(source)
                ) !== null
            ) {

                if (
                    match.index >
                    lastIndex
                ) {

                    target.appendChild(
                        document.createTextNode(
                            source.slice(
                                lastIndex,
                                match.index
                            )
                        )
                    );

                }


                const token =
                    match[0];


                /* BOLD TEXT */

                if (
                    token.startsWith("**") &&
                    token.endsWith("**")
                ) {

                    const strong =
                        document.createElement(
                            "strong"
                        );

                    strong.className =
                        "ai-response-bold";

                    strong.textContent =
                        token.slice(
                            2,
                            -2
                        );

                    target.appendChild(
                        strong
                    );

                }


                /* INLINE CODE */

                else if (
                    token.startsWith("`") &&
                    token.endsWith("`")
                ) {

                    const code =
                        document.createElement(
                            "code"
                        );

                    code.className =
                        "ai-inline-code";

                    code.textContent =
                        token.slice(
                            1,
                            -1
                        );

                    target.appendChild(
                        code
                    );

                }


                lastIndex =
                    pattern.lastIndex;

            }


            if (
                lastIndex <
                source.length
            ) {

                target.appendChild(
                    document.createTextNode(
                        source.slice(
                            lastIndex
                        )
                    )
                );

            }

        }



        function formatAiResponse(
            message
        ) {

            const container =
                document.createElement(
                    "div"
                );


            container.className =
                "ai-rich-response";


            const lines =
                String(
                    message || ""
                )
                .replace(
                    /\r\n/g,
                    "\n"
                )
                .split(
                    "\n"
                );


            let currentList =
                null;

            let currentListType =
                null;

            let insideCodeBlock =
                false;

            let codeLines =
                [];


            function resetList() {

                currentList =
                    null;

                currentListType =
                    null;

            }


            function addParagraph(
                text,
                className = ""
            ) {

                const paragraph =
                    document.createElement(
                        "p"
                    );


                paragraph.className =
                    className
                        ? "ai-response-paragraph " +
                          className
                        : "ai-response-paragraph";


                appendAiInlineFormatting(
                    paragraph,
                    text
                );


                container.appendChild(
                    paragraph
                );

            }


            function addCodeBlock() {

                if (
                    !codeLines.length
                ) {

                    return;

                }


                const wrapper =
                    document.createElement(
                        "div"
                    );


                wrapper.className =
                    "ai-code-block";


                const codeHeader =
                    document.createElement(
                        "div"
                    );


                codeHeader.className =
                    "ai-code-header";


                const codeIcon =
                    document.createElement(
                        "i"
                    );


                codeIcon.className =
                    "fa-solid fa-terminal";


                const codeLabel =
                    document.createElement(
                        "span"
                    );


                codeLabel.textContent =
                    "Command / Code";


                codeHeader.appendChild(
                    codeIcon
                );


                codeHeader.appendChild(
                    codeLabel
                );


                const pre =
                    document.createElement(
                        "pre"
                    );


                const code =
                    document.createElement(
                        "code"
                    );


                code.textContent =
                    codeLines.join(
                        "\n"
                    );


                pre.appendChild(
                    code
                );


                wrapper.appendChild(
                    codeHeader
                );


                wrapper.appendChild(
                    pre
                );


                container.appendChild(
                    wrapper
                );


                codeLines =
                    [];

            }


            lines.forEach(
                rawLine => {

                    const trimmed =
                        rawLine.trim();


                    /* CODE FENCE */

                    if (
                        trimmed.startsWith(
                            "```"
                        )
                    ) {

                        resetList();


                        if (
                            !insideCodeBlock
                        ) {

                            insideCodeBlock =
                                true;

                            codeLines =
                                [];

                        }

                        else {

                            insideCodeBlock =
                                false;

                            addCodeBlock();

                        }


                        return;

                    }


                    if (
                        insideCodeBlock
                    ) {

                        codeLines.push(
                            rawLine
                        );

                        return;

                    }


                    /* EMPTY LINE */

                    if (!trimmed) {

                        resetList();

                        return;

                    }


                    /* MARKDOWN HEADING */

                    const headingMatch =
                        trimmed.match(
                            /^(#{1,3})\s+(.+)$/
                        );


                    if (
                        headingMatch
                    ) {

                        resetList();


                        const heading =
                            document.createElement(
                                "div"
                            );


                        heading.className =
                            "ai-response-heading ai-heading-" +
                            headingMatch[1].length;


                        appendAiInlineFormatting(
                            heading,
                            headingMatch[2]
                        );


                        container.appendChild(
                            heading
                        );


                        return;

                    }


                    /* BULLET LIST */

                    const bulletMatch =
                        trimmed.match(
                            /^[-*•]\s+(.+)$/
                        );


                    if (
                        bulletMatch
                    ) {

                        if (
                            !currentList ||
                            currentListType !==
                                "ul"
                        ) {

                            currentList =
                                document.createElement(
                                    "ul"
                                );


                            currentList.className =
                                "ai-response-list";


                            container.appendChild(
                                currentList
                            );


                            currentListType =
                                "ul";

                        }


                        const item =
                            document.createElement(
                                "li"
                            );


                        appendAiInlineFormatting(
                            item,
                            bulletMatch[1]
                        );


                        currentList.appendChild(
                            item
                        );


                        return;

                    }


                    /* NUMBERED LIST */

                    const numberMatch =
                        trimmed.match(
                            /^\d+[.)]\s+(.+)$/
                        );


                    if (
                        numberMatch
                    ) {

                        if (
                            !currentList ||
                            currentListType !==
                                "ol"
                        ) {

                            currentList =
                                document.createElement(
                                    "ol"
                                );


                            currentList.className =
                                "ai-response-list ai-response-numbered";


                            container.appendChild(
                                currentList
                            );


                            currentListType =
                                "ol";

                        }


                        const item =
                            document.createElement(
                                "li"
                            );


                        appendAiInlineFormatting(
                            item,
                            numberMatch[1]
                        );


                        currentList.appendChild(
                            item
                        );


                        return;

                    }


                    resetList();


                    /* WARNING */

                    if (
                        /^(⚠️|warning:|important:)/i
                            .test(trimmed)
                    ) {

                        addParagraph(
                            trimmed,
                            "ai-callout ai-callout-warning"
                        );

                        return;

                    }


                    /* SUCCESS / VERIFICATION */

                    if (
                        /^(✅|verification:|expected result:|result:)/i
                            .test(trimmed)
                    ) {

                        addParagraph(
                            trimmed,
                            "ai-callout ai-callout-success"
                        );

                        return;

                    }


                    /* TIP / NOTE */

                    if (
                        /^(💡|tip:|note:|professional tip:)/i
                            .test(trimmed)
                    ) {

                        addParagraph(
                            trimmed,
                            "ai-callout ai-callout-tip"
                        );

                        return;

                    }


                    /* NORMAL PARAGRAPH */

                    addParagraph(
                        trimmed
                    );

                }
            );


            if (
                insideCodeBlock &&
                codeLines.length
            ) {

                addCodeBlock();

            }


            return container;

        }
        /* =====================================================
           ADD AI MESSAGE
        ===================================================== */

        function addAiMessage(
            message
        ) {

            const messageRow =
                document.createElement(
                    "div"
                );


            messageRow.className =
                "ai-message ai-message-bot";


            const icon =
                document.createElement(
                    "div"
                );


            icon.className =
                "ai-message-icon";


            icon.innerHTML =
                '<i class="fa-solid fa-robot"></i>';


            const bubble =
                document.createElement(
                    "div"
                );


            bubble.className =
                "ai-message-bubble";


           /* SAFE PROFESSIONAL AI RESPONSE */

            bubble.appendChild(
                formatAiResponse(
                    message
                )
            );


            messageRow.appendChild(
                icon
            );


            messageRow.appendChild(
                bubble
            );


            aiChatMessages.appendChild(
                messageRow
            );


            scrollChatBottom();

        }


        /* =====================================================
           AI TYPING INDICATOR
        ===================================================== */

        function showTypingIndicator() {

            const messageRow =
                document.createElement(
                    "div"
                );


            messageRow.className =
                "ai-message ai-message-bot";


            messageRow.id =
                "aiTypingMessage";


            const icon =
                document.createElement(
                    "div"
                );


            icon.className =
                "ai-message-icon";


            icon.innerHTML =
                '<i class="fa-solid fa-robot"></i>';


            const bubble =
                document.createElement(
                    "div"
                );


            bubble.className =
                "ai-message-bubble";


            const typing =
                document.createElement(
                    "div"
                );


            typing.className =
                "ai-typing";


            typing.innerHTML = `

                <span></span>
                <span></span>
                <span></span>

            `;


            bubble.appendChild(
                typing
            );


            messageRow.appendChild(
                icon
            );


            messageRow.appendChild(
                bubble
            );


            aiChatMessages.appendChild(
                messageRow
            );


            scrollChatBottom();

        }


        /* =====================================================
           REMOVE TYPING INDICATOR
        ===================================================== */

        function removeTypingIndicator() {

            const typingMessage =
                document.getElementById(
                    "aiTypingMessage"
                );


            if (typingMessage) {

                typingMessage.remove();

            }

        }


        /* =====================================================
           SEND BUTTON LOADING STATE
        ===================================================== */

        function setAiLoading(
            loading
        ) {

            aiChatInput.disabled =
                loading;


            if (aiChatSend) {

                aiChatSend.disabled =
                    loading;


                aiChatSend.innerHTML =
                    loading

                        ? '<i class="fa-solid fa-spinner fa-spin"></i>'

                        : '<i class="fa-solid fa-paper-plane"></i>';

            }

        }


        /* =====================================================
           SEND MESSAGE TO CLOUDFLARE AI
        ===================================================== */

        async function sendMessageToAi(
            message
        ) {

            const cleanMessage =
                String(
                    message || ""
                ).trim();


            if (!cleanMessage) {

                return;

            }


            /* OPEN CHAT IF QUICK BUTTON USED */

            openAiChat();


            /* SHOW USER MESSAGE */

            addUserMessage(
                cleanMessage
            );


            /* CLEAR INPUT */

            aiChatInput.value =
                "";


            /* LOADING */

            setAiLoading(
                true
            );


            showTypingIndicator();


            try {

                const response =
                    await fetch(

                        AI_API_URL,

                        {

                            method:
                                "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    {
                                         message:
                                             cleanMessage,

                                              session_id:
                                                   AI_SESSION_ID
                                    }
                                )

                        }

                    );


                const data =
                    await response.json();


                removeTypingIndicator();


                if (!response.ok) {

                    throw new Error(

                        data.error ||
                        data.details ||
                        "AI service unavailable"

                    );

                }


                const reply =
                    data.reply ||
                    "Sorry, I could not generate a response.";


                addAiMessage(
                    reply
                );

            }


            catch (error) {

                removeTypingIndicator();


                console.error(
                    "Tanweer AI Assistant:",
                    error
                );


                addAiMessage(

                    "Sorry, I’m having trouble connecting to the AI service right now. Please try again in a moment."

                );

            }


            finally {

                setAiLoading(
                    false
                );


                aiChatInput.focus();

            }

        }


        /* =====================================================
           CHAT FORM SUBMIT
        ===================================================== */

        aiChatForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const message =
                    aiChatInput.value.trim();


                if (!message) {

                    return;

                }


                sendMessageToAi(
                    message
                );

            }
        );


        /* =====================================================
           QUICK QUESTION BUTTONS
        ===================================================== */

        quickButtons.forEach(

            button => {

                button.addEventListener(
                    "click",
                    function () {

                        const question =
                            button.getAttribute(
                                "data-question"
                            );


                        if (question) {

                            sendMessageToAi(
                                question
                            );

                        }

                    }
                );

            }

        );


        /* =====================================================
           INITIAL ACCESSIBILITY STATE
        ===================================================== */

        aiChatToggle.setAttribute(
            "aria-expanded",
            "false"
        );


    }
);


/* =========================================================
   TANWEER AI ASSISTANT END
========================================================= */
