import { useEffect, useMemo, useRef, useState } from 'react'

const profileImage = 'https://raw.githubusercontent.com/sg2499/Personal-Documents/main/PP.jpg'
const resumeUrl = 'https://raw.githubusercontent.com/sg2499/Personal-Documents/main/SHAILESH%20GUPTA%20-%20New%20Resume.pdf'
const githubUrl = 'https://github.com/sg2499'
const blogUrl = 'https://prismatic-metrics.blogspot.com/'
const linkedinUrl = 'https://www.linkedin.com/in/shailesh-gupta-7b7278188'
const defaultApiBase = import.meta.env.VITE_SHAILESHGPT_API_BASE || 'https://shaileshgpt-backend.onrender.com'

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'AI Bot', id: 'ai-bot' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
]

const stats = [
  { value: '2+', label: 'Years of experience' },
  { value: '9+', label: 'Flagship project showcases' },
  { value: '3', label: 'Major education anchors' },
  { value: '6+', label: 'Certifications highlighted' },
]

const highlights = [
  '2 years of industry experience',
  'Ex-Teleperformance',
  'IIT Roorkee + IIIT Bangalore',
  'Python · PySpark · Azure',
  'AI / LLM engineering focus',
  'GitHub projects + technical blog',
]

const education = [
  {
    school: 'Indian Institute of Technology, Roorkee',
    program: 'Executive Post Graduate Program in Data Science & AI',
    period: '2024 – 2025',
    detail:
      'Advanced postgraduate training focused on data science, artificial intelligence, modern ML workflows, and transition toward applied AI engineering.',
  },
  {
    school: 'IIIT Bangalore',
    program: 'Executive Program in Data Science',
    period: '2021 – 2022',
    detail:
      'Structured program that strengthened foundations in machine learning, analytics, and practical data science problem solving.',
  },
  {
    school: 'KIIT University, Bhubaneswar',
    program: 'B.Tech in Electronics & Telecommunication',
    period: '2018 – 2022',
    detail:
      'Engineering background that shaped analytical thinking, technical discipline, and problem-solving rigor.',
  },
]

const skillGroups = [
  {
    title: 'Machine Learning & AI',
    items: ['Supervised Learning', 'Unsupervised Learning', 'Regression', 'Classification', 'NLP', 'Time Series Forecasting', 'LLMs & GenAI'],
  },
  {
    title: 'LLM / GenAI Stack',
    items: ['OpenAI API', 'LangChain', 'HuggingFace', 'RAG Pipelines', 'Prompt Engineering', 'Basic Agentic Workflows', 'Fine Tuning'],
  },
  {
    title: 'Deep Learning',
    items: ['ANN', 'CNN', 'RNN', 'LSTM', 'Transformers', 'TensorFlow', 'Keras'],
  },
  {
    title: 'Data Engineering & Cloud',
    items: ['PySpark', 'Azure Databricks', 'Azure Data Factory', 'Delta Lake', 'Distributed Data Processing', 'Batch Inference'],
  },
  {
    title: 'Deployment & Tools',
    items: ['FastAPI', 'ML Pipelines', 'Model Versioning', 'CI/CD Integration', 'Git', 'Azure DevOps', 'Streamlit', 'SQL'],
  },
]

const projects = [
  {
    title: 'ShaileshGPT Portfolio Chatbot',
    category: 'Agentic RAG Product',
    description:
      'A personal AI twin integrated into this portfolio. It uses a structured knowledge base, streaming chat, JD-fit analysis, recruiter lead capture, Pushover + SendGrid notifications, and a polished website widget experience.',
    stack: ['Agentic RAG', 'FastAPI', 'Gradio', 'OpenAI', 'React', 'SendGrid'],
    repo: githubUrl,
    featured: true,
  },
  {
    title: 'Deep Research Agent',
    category: 'Agentic AI System',
    description:
      'A multi-agent deep research system built with Gradio, OpenAI Agents SDK, Pydantic, SendGrid, and web search. It follows a clarification-first workflow, creates structured research plans, runs targeted evidence gathering, and generates professional long-form reports with optional email delivery.',
    stack: ['OpenAI Agents SDK', 'Gradio', 'Pydantic', 'Web Search', 'SendGrid'],
    repo: 'https://github.com/sg2499/Deep-Research-Agent',
  },
  {
    title: 'OpenAI-Enhanced QA ChatBot',
    category: 'Applied GenAI',
    description:
      'An applied AI project focused on question-answering workflows using modern LLM and retrieval patterns, built to demonstrate practical GenAI integration and production-minded AI application design.',
    stack: ['OpenAI API', 'LangChain', 'Python', 'LLM', 'RAG'],
    repo: 'https://github.com/sg2499/OpenAI-Enhanced-QA-ChatBot',
  },
  {
    title: 'IPL Win Probability Predictor',
    category: 'Machine Learning',
    description:
      'A cricket analytics application that predicts match-winning probabilities in real time using engineered match features, ensemble models, and an interactive Streamlit interface.',
    stack: ['Python', 'Scikit-learn', 'XGBoost', 'Streamlit'],
    repo: 'https://github.com/sg2499/IPL-Win-Probability-Predictor',
  },
  {
    title: 'Movie Recommender System',
    category: 'Recommendation System',
    description:
      'A recommendation engine combining content-based logic and personalization thinking to generate relevant movie suggestions while showcasing practical recommendation-system design.',
    stack: ['Python', 'Recommendation Systems', 'NLP', 'Streamlit'],
    repo: 'https://github.com/sg2499/Movie-Recommender-System',
  },
  {
    title: 'Udemy Course Recommendation System',
    category: 'NLP',
    description:
      'A content-based recommendation project using TF-IDF vectorization and cosine similarity to surface relevant courses from textual metadata in a modular, portfolio-ready pipeline.',
    stack: ['Python', 'TF-IDF', 'Cosine Similarity', 'NLP'],
    repo: 'https://github.com/sg2499/Udemy-Course-Recommendation-System',
  },
  {
    title: 'Stock Price Predictor',
    category: 'Time Series',
    description:
      'A forecasting-focused application using deep learning concepts to model stock movement trends, compare predicted vs actual values, and present results through a clean interface.',
    stack: ['TensorFlow', 'Keras', 'Time Series', 'Streamlit'],
    repo: 'https://github.com/sg2499/Stock-Price-Predictor',
  },
  {
    title: 'IMDB Sentiment Analysis',
    category: 'Deep Learning',
    description:
      'A sentiment classification app built with recurrent neural networks to analyze movie review text and classify sentiment through an intuitive NLP demonstration app.',
    stack: ['RNN', 'TensorFlow', 'Keras', 'NLP'],
    repo: 'https://github.com/sg2499/IMDB-Sentiment-Analysis-using-Simple-RNN',
  },
  {
    title: 'Campus Placement Predictor',
    category: 'Applied ML',
    description:
      'A practical machine learning application that predicts student placement outcomes using academic and profile signals, packaged as a portfolio-ready Streamlit app.',
    stack: ['Python', 'Machine Learning', 'Streamlit', 'EDA'],
    repo: 'https://github.com/sg2499/Campus-Placement-Predictor',
  },
  {
    title: 'Hamlet Next Word Prediction',
    category: 'Language Modeling',
    description:
      "A sequence-modeling project using LSTM-based deep learning to predict the next word from Shakespeare's Hamlet, highlighting applied NLP and language modeling fundamentals.",
    stack: ['LSTM', 'Deep Learning', 'TensorFlow', 'NLP'],
    repo: 'https://github.com/sg2499/Hamlet-Next-Word-Prediction-LSTM',
  },
]

const certifications = [
  'AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents',
  'Executive Post Graduate Certification in Data Science & Artificial Intelligence - IIT Roorkee',
  'Executive Program in Data Science — IIIT Bangalore',
  'Microsoft SQL',
  'Data Science',
  'Artificial Intelligence',
]

const blogPosts = [
  { title: 'Deep Research Agent', href: 'https://prismatic-metrics.blogspot.com/2026/04/deep-research-agent-author-shailesh.html' },
  { title: 'Movie Recommender System', href: blogUrl },
  { title: 'Stock Price Predictor', href: blogUrl },
  { title: 'Campus Placement Predictor', href: blogUrl },
  { title: 'IPL Win Probability Predictor', href: blogUrl },
  { title: 'Udemy Course Recommendation System', href: blogUrl },
]

const contactLinks = [
  { label: 'LinkedIn', href: linkedinUrl },
  { label: 'GitHub', href: githubUrl },
  { label: 'Prismatic Metrics', href: blogUrl },
  { label: 'Email', href: 'mailto:shaileshgupta841@gmail.com' },
]

const starterQuestions = [
  'What kind of AI and ML work has Shailesh done?',
  'Is Shailesh a good fit for an Applied AI role?',
  'Tell me about his Teleperformance experience.',
  'Which project best proves his LLM direction?',
]

function classNames(...items) {
  return items.filter(Boolean).join(' ')
}

function MarkdownLite({ text }) {
  const html = useMemo(() => {
    const safe = (text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    return safe
      .replace(/^### (.*)$/gm, '<h3>$1</h3>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^- (.*)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\n\n/g, '<br/><br/>')
  }, [text])

  return <div className="bot-markdown" dangerouslySetInnerHTML={{ __html: html }} />
}

function ShaileshGPTWidget({ apiBase = defaultApiBase }) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('chat')
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hey, I’m ShaileshGPT — Shailesh’s portfolio twin. Ask me about his work, projects, skills, JD fit, or whether he treats cricket like a second operating system.",
    },
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [leadStatus, setLeadStatus] = useState('')
  const [jdStatus, setJdStatus] = useState('')
  const [jdQuestion, setJdQuestion] = useState('Is Shailesh a good fit for this role?')
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    website: '',
    other_contact: '',
    message: '',
  })
  const [jdFile, setJdFile] = useState(null)
  const bottomRef = useRef(null)

  const configured = Boolean(apiBase)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open, tab])

  const updateLead = (field, value) => {
    setLeadForm((prev) => ({ ...prev, [field]: value }))
  }

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message])
  }

  const streamChat = async (question) => {
    if (!configured) {
      addMessage({
        role: 'assistant',
        content:
          'The bot backend is not connected yet. Add VITE_SHAILESHGPT_API_BASE in Vercel and point it to your deployed FastAPI backend.',
      })
      return
    }

    const userMessage = { role: 'user', content: question }
    const historyForApi = messages.map(({ role, content }) => ({ role, content }))

    setMessages((prev) => [...prev, userMessage, { role: 'assistant', content: '' }])
    setIsStreaming(true)

    try {
      const response = await fetch(`${apiBase}/chat_stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history: historyForApi }),
      })

      if (!response.ok || !response.body) {
        throw new Error('Chat stream unavailable')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let buffer = ''
      let answer = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const events = buffer.split('\n\n')
        buffer = events.pop() || ''

        for (const event of events) {
          const dataLine = event.split('\n').find((line) => line.startsWith('data: '))
          if (!dataLine) continue

          const payload = JSON.parse(dataLine.slice(6))
          if (payload.error) throw new Error(payload.error)
          if (payload.token) {
            answer += payload.token
            setMessages((prev) => {
              const next = [...prev]
              next[next.length - 1] = { role: 'assistant', content: answer }
              return next
            })
          }
        }
      }
    } catch (error) {
      setMessages((prev) => {
        const next = [...prev]
        next[next.length - 1] = {
          role: 'assistant',
          content:
            'The portfolio assistant is temporarily unavailable. Very dramatic, yes — but the rest of the site still shows the receipts.',
        }
        return next
      })
    } finally {
      setIsStreaming(false)
    }
  }

  const handleSubmit = async (event) => {
    event?.preventDefault()
    const question = input.trim()
    if (!question || isStreaming) return
    setInput('')
    await streamChat(question)
  }

  const handleStarter = async (question) => {
    setOpen(true)
    setTab('chat')
    await streamChat(question)
  }

  const submitLead = async (event) => {
    event.preventDefault()
    if (!configured) {
      setLeadStatus('The contact endpoint is not connected yet. Add your API backend URL in Vercel.')
      return
    }

    setLeadStatus('Sending...')
    try {
      const response = await fetch(`${apiBase}/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leadForm, source: 'Portfolio website widget' }),
      })
      const data = await response.json()
      setLeadStatus(data.message || 'Sent.')
    } catch (error) {
      setLeadStatus('Could not send right now. The internet chose chaos, apparently.')
    }
  }

  const analyzeJd = async (event) => {
    event.preventDefault()
    if (!configured) {
      setJdStatus('The JD analysis backend is not connected yet. Add VITE_SHAILESHGPT_API_BASE in Vercel.')
      return
    }
    if (!jdFile) {
      setJdStatus('Upload a JD first. Even the best all-rounder needs to see the pitch.')
      return
    }

    setTab('chat')
    setJdStatus('Analyzing JD...')
    const userContent = `Uploaded JD: ${jdFile.name}\nQuestion: ${jdQuestion}`
    setMessages((prev) => [...prev, { role: 'user', content: userContent }, { role: 'assistant', content: '' }])

    try {
      const form = new FormData()
      form.append('file', jdFile)
      form.append('question', jdQuestion)

      const response = await fetch(`${apiBase}/jd_fit`, {
        method: 'POST',
        body: form,
      })

      if (!response.ok) throw new Error('JD analysis failed')
      const data = await response.json()
      const answer = data.answer || 'JD analysis finished, but no answer came back.'

      setMessages((prev) => {
        const next = [...prev]
        next[next.length - 1] = { role: 'assistant', content: answer }
        return next
      })
      setJdStatus('Analysis complete.')
    } catch (error) {
      setMessages((prev) => {
        const next = [...prev]
        next[next.length - 1] = {
          role: 'assistant',
          content: 'Could not analyze that JD right now. The backend pulled a hamstring.',
        }
        return next
      })
      setJdStatus('Could not analyze JD.')
    }
  }

  return (
    <>
      <section id="ai-bot" className="scroll-mt-24 mt-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-blue-400/20 bg-blue-500/10 p-8">
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">ShaileshGPT</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              A portfolio that does not just sit there looking pretty.
            </h2>
            <p className="mt-5 text-sm leading-8 text-white/70 md:text-base">
              I built a personal AI twin into this website so recruiters and collaborators can ask questions directly,
              compare a job description against my profile, and leave contact details without hunting across tabs like it is a side quest.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                'Streaming portfolio chat',
                'Recruiter JD-fit analysis',
                'Lead capture via Pushover + SendGrid',
                'Grounded answers from my profile and projects',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-neutral-950/40 px-4 py-3 text-sm text-white/75">
                  {item}
                </div>
              ))}
            </div>
            <button
              onClick={() => setOpen(true)}
              className="mt-7 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:scale-[1.02]"
            >
              Launch ShaileshGPT
            </button>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
            <div className="rounded-[1.5rem] border border-white/10 bg-neutral-950/80 p-5">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <img src={profileImage} alt="ShaileshGPT" className="h-11 w-11 rounded-full object-cover object-top ring-2 ring-blue-300/40" />
                <div>
                  <div className="font-semibold">ShaileshGPT</div>
                  <div className="text-xs text-white/50">AI portfolio assistant · Agentic RAG · Recruiter mode</div>
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-white/72">
                Ask me whether Shailesh fits your AI role, what he built at Teleperformance, which project proves his LLM direction,
                or why cricket is probably the fastest way to start a conversation.
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {starterQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => handleStarter(question)}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left text-sm leading-6 text-white/75 transition hover:border-blue-300/30 hover:bg-blue-500/10"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-blue-500 to-cyan-400 text-2xl shadow-2xl shadow-blue-950/40 transition hover:scale-105"
        aria-label="Open ShaileshGPT"
      >
        <span>{open ? '×' : '💬'}</span>
      </button>

      {open && (
        <div className="fixed bottom-28 right-6 z-50 flex h-[720px] max-h-[calc(100vh-8rem)] w-[430px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[1.5rem] border border-white/15 bg-neutral-950 shadow-2xl shadow-blue-950/40">
          <div className="border-b border-white/10 bg-gradient-to-br from-blue-500/20 to-cyan-400/10 p-4">
            <div className="flex items-center gap-3">
              <img src={profileImage} alt="ShaileshGPT" className="h-11 w-11 rounded-full object-cover object-top ring-2 ring-cyan-200/40" />
              <div>
                <div className="font-semibold">ShaileshGPT</div>
                <div className="text-xs leading-5 text-white/55">Ask, compare a JD, or connect with Shailesh.</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-b border-white/10 bg-neutral-950 p-3">
            {[
              { id: 'chat', label: 'Chat' },
              { id: 'jd', label: 'JD Fit' },
              { id: 'connect', label: 'Connect' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={classNames(
                  'flex-1 rounded-full px-3 py-2 text-xs font-semibold transition',
                  tab === item.id ? 'bg-blue-500 text-white' : 'bg-white/5 text-white/65 hover:bg-white/10'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto bg-[#050914] p-4">
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={classNames(
                        'max-w-[86%] rounded-2xl border px-4 py-3 text-sm leading-7',
                        message.role === 'user'
                          ? 'ml-auto border-cyan-200/15 bg-blue-500/20 text-white'
                          : 'border-white/10 bg-white/[0.055] text-white/78'
                      )}
                    >
                      <MarkdownLite text={message.content} />
                    </div>
                  ))}
                  {isStreaming && (
                    <div className="w-fit rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs text-white/50">
                      ShaileshGPT is typing...
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2 border-t border-white/10 bg-neutral-950 p-3">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask anything about Shailesh..."
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                />
                <button
                  disabled={isStreaming}
                  className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Send
                </button>
              </form>
            </>
          )}

          {tab === 'jd' && (
            <form onSubmit={analyzeJd} className="flex-1 overflow-y-auto bg-[#050914] p-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm leading-7 text-white/70">
                Upload a JD and I will compare it with Shailesh&apos;s profile: skills, projects, certifications, experience, and current AI direction.
              </div>
              <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Job Description</label>
              <input
                type="file"
                accept=".pdf,.txt,.md,.csv"
                onChange={(event) => setJdFile(event.target.files?.[0] || null)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white/70 file:mr-3 file:rounded-xl file:border-0 file:bg-blue-500 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white"
              />
              <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Question</label>
              <textarea
                value={jdQuestion}
                onChange={(event) => setJdQuestion(event.target.value)}
                rows={4}
                className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-3 text-sm leading-6 text-white outline-none placeholder:text-white/35"
              />
              <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white">
                Analyze JD Fit
              </button>
              {jdStatus && <div className="mt-4 text-sm leading-6 text-white/60">{jdStatus}</div>}
            </form>
          )}

          {tab === 'connect' && (
            <form onSubmit={submitLead} className="flex-1 overflow-y-auto bg-[#050914] p-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4 text-sm leading-7 text-white/70">
                Leave your details and Shailesh will get notified directly. Email, phone, LinkedIn, GitHub, website — whatever route works.
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ['name', 'Name'],
                  ['email', 'Email'],
                  ['phone', 'Phone'],
                  ['linkedin', 'LinkedIn'],
                  ['github', 'GitHub'],
                  ['website', 'Website'],
                ].map(([field, label]) => (
                  <input
                    key={field}
                    value={leadForm[field]}
                    onChange={(event) => updateLead(field, event.target.value)}
                    placeholder={label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                  />
                ))}
              </div>
              <input
                value={leadForm.other_contact}
                onChange={(event) => updateLead('other_contact', event.target.value)}
                placeholder="Other contact route"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
              />
              <textarea
                value={leadForm.message}
                onChange={(event) => updateLead('message', event.target.value)}
                placeholder="Message / intent"
                rows={4}
                className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white outline-none placeholder:text-white/35"
              />
              <button className="mt-4 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white">
                Send Details
              </button>
              {leadStatus && <div className="mt-4 text-sm leading-6 text-white/60">{leadStatus}</div>}
            </form>
          )}
        </div>
      )}
    </>
  )
}

function App() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.14),transparent_25%)]" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <div className="text-lg font-semibold tracking-wide">Shailesh Gupta</div>
            <div className="text-xs text-white/60">Data Scientist · AI / LLM Engineer Track</div>
          </div>
          <nav className="hidden gap-3 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 md:block"
          >
            Let&apos;s Connect
          </button>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-6 pb-20 pt-10 lg:px-8 lg:pt-16">
        <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="mb-5 inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-200">
              Open to full-time roles in Data Science, Applied AI, and AI Engineering
            </div>
            <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Turning <span className="text-blue-300">real-world data science experience</span> into modern, practical, and visible AI engineering work.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
              I am Shailesh Gupta, a Data Scientist with hands-on experience building predictive models, PySpark-based pipelines, and Azure Databricks workflows for business problems. I now bring that same practical mindset into AI, LLM tooling, retrieval workflows, and portfolio projects that reflect both technical depth and execution.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('ai-bot')}
                className="rounded-2xl bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:scale-[1.02]"
              >
                Ask ShaileshGPT
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                View Projects
              </button>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-blue-400/30 bg-blue-500/10 px-6 py-3 text-sm font-medium text-blue-200 transition hover:bg-blue-500/15"
              >
                Download Resume
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -bottom-8 -right-4 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-blue-950/30 backdrop-blur-sm">
              <div className="grid gap-5 md:grid-cols-[0.92fr_1.08fr] md:items-center">
                <div className="rounded-[1.5rem] border border-white/10 bg-neutral-900/70 p-3">
                  <img src={profileImage} alt="Shailesh Gupta" className="aspect-[4/4.6] w-full rounded-[1.25rem] object-cover object-top" />
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-neutral-900 p-6">
                  <div className="text-sm uppercase tracking-[0.2em] text-white/45">Professional Snapshot</div>
                  <div className="mt-6 space-y-5">
                    <div>
                      <div className="text-xs text-white/45">Current Identity</div>
                      <div className="mt-1 text-lg font-medium">Data Scientist | Aspiring AI / LLM Engineer</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/45">Education Layer</div>
                      <div className="mt-1 text-sm leading-7 text-white/75">IIT Roorkee · IIIT Bangalore · KIIT University</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/45">Core Strengths</div>
                      <div className="mt-1 text-sm leading-7 text-white/75">Predictive modeling, ML pipelines, PySpark, Azure Databricks, batch inference, technical storytelling, and applied GenAI upskilling.</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/45">Current Focus</div>
                      <div className="mt-1 text-sm leading-7 text-white/75">LLM engineering, RAG workflows, agentic systems, OpenAI-based applications, and end-to-end portfolio building.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
              <div className="text-3xl font-semibold text-blue-300">{item.value}</div>
              <div className="mt-2 text-sm text-white/60">{item.label}</div>
            </div>
          ))}
        </section>

        <ShaileshGPTWidget />

        <section id="about" className="scroll-mt-24 mt-24 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">About</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">A professional profile designed to explain not just what I know, but how I build.</h2>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/75">
            <p className="leading-8">
              My background combines production-grade machine learning experience, structured data science education, and an active shift toward applied AI engineering. I started in industry by working on business-critical ML use cases, where success depended not just on model accuracy, but on workflows, stakeholder alignment, and usable outcomes.
            </p>
            <p className="mt-5 leading-8">
              That foundation was strengthened through academic and professional learning at IIT Roorkee and IIIT Bangalore, and is now expanding through hands-on work in LLMs, RAG pipelines, prompt engineering, agentic systems, and AI application building. I aim to be the kind of practitioner who can understand the business problem, build the technical system, and communicate the result clearly.
            </p>
          </div>
        </section>

        <section id="experience" className="scroll-mt-24 mt-24">
          <div className="mb-8">
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">Experience</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Production experience that gives weight to the portfolio.</h2>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-2xl font-semibold">Data Scientist · Teleperformance</h3>
                <p className="mt-2 text-white/60">June 2022 – April 2024 · Gurugram, India</p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">Full-time industry role</div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                'Engineered predictive ML models for credit collection risk to improve targeted interventions and collection efficiency.',
                'Built employee attrition prediction workflows to support proactive retention strategies and better HR decision-making.',
                'Architected and automated end-to-end ML pipelines using Azure Databricks, PySpark, Delta Lake, and ADF.',
                'Worked across ingestion, feature engineering, model training, batch inference, stakeholder collaboration, and dashboard-oriented delivery.',
              ].map((point) => (
                <div key={point} className="rounded-2xl border border-white/10 bg-neutral-900/60 p-5 text-sm leading-7 text-white/75">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="mb-8">
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">Education</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Academic depth that supports the technical journey.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {education.map((item) => (
              <div key={item.school} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-blue-200">{item.period}</div>
                <h3 className="mt-3 text-xl font-semibold leading-8">{item.school}</h3>
                <div className="mt-2 text-sm font-medium text-white/80">{item.program}</div>
                <p className="mt-4 text-sm leading-7 text-white/65">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 mt-24">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">Skills & Stack</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">A blend of classic data science, deployment thinking, and modern AI tooling.</h2>
            </div>
            <div className="max-w-xl text-sm leading-7 text-white/60">
              The stack below reflects what I have used professionally, what I have built publicly, and where I am actively deepening capability for the next phase of my career.
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/[0.07]">
                <div className="text-lg font-medium">{group.title}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full bg-neutral-900 px-3 py-2 text-sm text-white/70 ring-1 ring-white/10">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 mt-24">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">Featured Projects</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Work that shows both technical range and future direction.</h2>
            </div>
            <div className="max-w-xl text-sm leading-7 text-white/60">
              These projects reflect my movement across recommendation systems, forecasting, deep learning, applied NLP, and emerging AI engineering workflows.
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {projects.map((project) => (
              <div key={project.title} className={classNames('group rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/20', project.featured ? 'border-blue-300/30 bg-blue-500/10' : 'border-white/10 bg-white/5 hover:bg-white/[0.07]')}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-3 inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65">Featured</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/68">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full bg-neutral-900 px-3 py-1.5 text-xs text-white/70 ring-1 ring-white/10">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={project.repo} target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-2 text-sm text-white/75 transition hover:bg-neutral-800">
                    GitHub Repo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">Certifications & Learning</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Visible upskilling with a clear AI trajectory.</h2>
            <div className="mt-6 grid gap-3">
              {certifications.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-neutral-900/60 px-4 py-4 text-sm text-white/72 transition hover:bg-neutral-900">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">Writing & Public Presence</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">I don’t just build projects. I also make the work visible.</h2>
            <p className="mt-5 text-sm leading-8 text-white/70">
              Through LinkedIn activity and my blog, Prismatic Metrics, I share project launches, learning progress, AI milestones, and technical writeups that extend my profile beyond a static resume.
            </p>
            <div className="mt-6 grid gap-3">
              {blogPosts.map((post) => (
                <a key={post.title} href={post.href} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-neutral-900/60 p-4 text-left text-sm text-white/72 transition hover:bg-neutral-900">
                  {post.title}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 mt-24">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/5 p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">Contact</div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Let’s connect around data, AI, hiring, products, and meaningful work.</h2>
                <p className="mt-5 max-w-2xl text-sm leading-8 text-white/70 md:text-base">
                  Whether you are a recruiter evaluating fit, a founder looking for an AI-minded data professional, a business stakeholder exploring collaboration, or a fellow builder who wants to connect, this site is designed to make that next step easy.
                </p>
              </div>
              <div className="grid gap-3">
                {contactLinks.map((link) => (
                  <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined} className="rounded-2xl border border-white/10 bg-neutral-900/60 px-5 py-4 text-left text-sm text-white/80 transition hover:bg-neutral-900">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 border-t border-white/10 pt-8 text-sm text-white/45">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} Shailesh Gupta</div>
            <div>Data Scientist · Applied AI · LLM Engineering Track</div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
