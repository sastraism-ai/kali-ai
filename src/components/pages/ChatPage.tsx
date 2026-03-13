import { useEffect, useRef, useState } from 'react'
import { ArrowUp, LogOut, PanelLeftClose, PanelLeftOpen, SquarePen, X } from 'lucide-react'
import logo from '../../assets/logo.png'

type ChatPageProps = {
  onBackHome: () => void
  onLogout: () => void
  userName: string
  userPhotoURL: string | null
}

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

type ChatThread = {
  id: string
  title: string
  intro: string
  locked?: boolean
  messages: ChatMessage[]
}

function createInitialThreads(userName: string): ChatThread[] {
  return [
    {
      id: 'new-chat',
      title: 'New chat',
      intro: `${userName}`,
      messages: [],
    },
    {
      id: 'product-notes',
      title: 'Product notes',
      intro: `${userName}`,
      locked: true,
      messages: [
        {
          id: 'product-notes-1',
          role: 'assistant',
          content:
            'KALI is designed for drafting, summarizing, and refining internal work in one calm workspace.',
        },
        {
          id: 'product-notes-2',
          role: 'assistant',
          content:
            'Keep this thread as a reference view for what the product is about and how the model should feel to users.',
        },
        {
          id: 'product-notes-3',
          role: 'assistant',
          content:
            'Normal prompts belong in standard chats. Product notes stay read-only so the experience remains clean and predictable.',
        },
      ],
    },
  ]
}

export function ChatPage({
  onBackHome,
  onLogout,
  userName,
  userPhotoURL,
}: ChatPageProps) {
  const [threads, setThreads] = useState<ChatThread[]>(() => createInitialThreads(userName))
  const [activeThreadId, setActiveThreadId] = useState('new-chat')
  const [draft, setDraft] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const messagesRef = useRef<HTMLDivElement | null>(null)

  const activeThread = threads.find((thread) => thread.id === activeThreadId) ?? threads[0]
  const showIntroState = activeThread.messages.length === 0 && !activeThread.locked

  useEffect(() => {
    setThreads((currentThreads) => {
      const newChat = currentThreads.find((thread) => thread.id === 'new-chat')
      const otherThreads = currentThreads.filter(
        (thread) => thread.id !== 'new-chat' && thread.id !== 'product-notes',
      )

      return [
        {
          id: 'new-chat',
          title: newChat?.title ?? 'New chat',
          intro: `${userName}`,
          messages: newChat?.messages ?? [],
        },
        createInitialThreads(userName)[1],
        ...otherThreads,
      ]
    })
  }, [userName])

  useEffect(() => {
    const textarea = textareaRef.current

    if (!textarea) {
      return
    }

    textarea.style.height = '0px'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 220)}px`
  }, [draft, activeThreadId])

  useEffect(() => {
    const messagesEl = messagesRef.current

    if (!messagesEl) {
      return
    }

    messagesEl.scrollTo({
      top: messagesEl.scrollHeight,
      behavior: 'smooth',
    })
  }, [activeThreadId, activeThread.messages.length])

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId)
  }

  const handleDeleteThread = (threadId: string) => {
    if (threadId === 'new-chat' || threadId === 'product-notes') {
      return
    }

    setThreads((currentThreads) => currentThreads.filter((thread) => thread.id !== threadId))

    if (activeThreadId === threadId) {
      setActiveThreadId('new-chat')
      setDraft('')
    }
  }

  const createNewThread = (): ChatThread => ({
    id: `thread-${Date.now()}`,
    title: 'New chat',
    intro: `${userName}`,
    messages: [],
  })

  const handleNewChat = () => {
    const newThread = createNewThread()
    setThreads((currentThreads) => [
      newThread,
      ...currentThreads.filter((thread) => thread.id !== 'new-chat'),
    ])
    setActiveThreadId(newThread.id)
    setDraft('')
  }

  const handleSendMessage = () => {
    const trimmedDraft = draft.trim()

    if (!trimmedDraft || activeThread.locked) {
      return
    }

    const timestamp = Date.now()
    const userMessage: ChatMessage = {
      id: `user-${timestamp}`,
      role: 'user',
      content: trimmedDraft,
    }

    const assistantMessage: ChatMessage = {
      id: `assistant-${timestamp}`,
      role: 'assistant',
      content:
        'Message received. Replace this placeholder response with your real model call so replies render here like ChatGPT.',
    }

    setThreads((currentThreads) =>
      currentThreads.map((thread) => {
        if (thread.id !== activeThreadId) {
          return thread
        }

        return {
          ...thread,
          title: thread.messages.length === 0 ? trimmedDraft.slice(0, 30) || 'New chat' : thread.title,
          messages: [...thread.messages, userMessage, assistantMessage],
        }
      }),
    )

    setDraft('')
  }

  return (
    <div className="h-screen overflow-hidden bg-white text-[#171717]">
      <main className="grid h-screen overflow-hidden transition-all duration-300 ease-in-out" style={{ gridTemplateColumns: sidebarCollapsed ? '88px 1fr' : '280px 1fr' }}>
        <aside className="flex h-screen flex-col overflow-hidden border-r border-[#E5E5E5] bg-white">
          <button
            type="button"
            onClick={onBackHome}
            className={`mx-4 mt-4 hover:cursor-pointer flex items-center gap-3 rounded-2xl border border-[#E5E5E5] bg-white px-3 py-3 text-left transition hover:border-[#FACC15] hover:bg-[#FEF9C3] ${
              sidebarCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <img src={logo} alt="KALI" className="h-9 w-9 object-contain" />
            {!sidebarCollapsed ? (<>
              <span className="bg-gradient-to-tr from-[#CA8A04] via-[#FACC15] to-[#A16207] bg-clip-text text-base font-semibold text-transparent">
                KALI
              </span>
              <span className='text-xs text-gray-500'>
              for the better future
              </span>
            </>
            ) : null}
          </button>

          {sidebarCollapsed ? (
            <div className="px-4 py-4">
              <div className="rounded-[1.4rem] border border-[#E5E5E5] bg-[#FCFCFC] p-2">
                <button
                  type="button"
                  onClick={handleNewChat}
                  title="New chat"
                  className="flex h-11 w-full items-center justify-center rounded-xl text-[#171717] transition hover:cursor-pointer hover:bg-[#FEF9C3]"
                >
                  <SquarePen size={18} />
                </button>
                <div className="mx-2 border-t border-[#E5E5E5]" />
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed((current) => !current)}
                  title="Expand sidebar"
                  className="mt-2 flex h-11 w-full items-center justify-center rounded-xl text-[#404040] transition hover:cursor-pointer hover:bg-[#FEF9C3]"
                >
                  <PanelLeftOpen size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-4">
              <button
                type="button"
                onClick={handleNewChat}
                className="flex h-11 flex-1 items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white text-sm font-medium text-[#171717] transition hover:cursor-pointer hover:border-[#FACC15] hover:bg-[#FEF9C3]"
              >
                New chat
              </button>
              <button
                type="button"
                onClick={() => setSidebarCollapsed((current) => !current)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E5E5E5] bg-white text-[#404040] transition hover:cursor-pointer hover:border-[#FACC15] hover:bg-[#FEF9C3]"
              >
                <PanelLeftClose size={18} />
              </button>
            </div>
          )}

          {!sidebarCollapsed ? (
            <div className="px-4 pb-3">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#8A7A62] uppercase">
                Chats
              </p>
            </div>
          ) : null}

          <div className="scrollbar-thin flex-1 space-y-1.5 overflow-y-auto px-3 pb-4">
            {threads.map((thread) => {
              const isActive = thread.id === activeThread.id

              return (
                <div
                  key={thread.id}
                  className={`group relative rounded-2xl border transition ${
                    isActive
                      ? 'border-[#FACC15] bg-[#FEF9C3]'
                      : 'border-transparent hover:border-[#E5E5E5] hover:bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectThread(thread.id)}
                    className={`w-full hover:cursor-pointer rounded-2xl px-3.5 py-3 text-left text-sm leading-5 ${
                      isActive ? 'text-[#171717]' : 'text-[#525252]'
                    }`}
                  >
                    {sidebarCollapsed ? (
                      <div className="flex justify-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#CA8A04]" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-3 pr-8">
                        <span>{thread.title}</span>
                        {thread.locked ? (
                          <span className="rounded-full border border-[#E5E5E5] bg-white px-2 py-1 text-[10px] font-semibold tracking-[0.14em] text-[#8A7A62] uppercase">
                            Notes
                          </span>
                        ) : null}
                      </div>
                    )}
                  </button>

                  {!sidebarCollapsed && thread.id !== 'new-chat' && thread.id !== 'product-notes' ? (
                    <button
                      type="button"
                      aria-label={`Delete ${thread.title}`}
                      onClick={(event) => {
                        event.stopPropagation()
                        handleDeleteThread(thread.id)
                      }}
                      className="absolute hover:cursor-pointer top-1/2 right-2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[#8A7A62] opacity-0 transition hover:bg-white hover:text-[#171717] group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  ) : null}
                </div>
              )
            })}
          </div>

          <div className="border-t border-[#E5E5E5] p-4">
            <div className="flex items-center justify-between gap-3">
              {sidebarCollapsed ? (
                <div className="flex w-full justify-center">
                  {userPhotoURL ? (
                    <img
                      src={userPhotoURL}
                      alt={userName}
                      className="h-10 w-10 rounded-full border border-[#E5E5E5] object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-sm font-semibold text-[#171717]">
                      {userName.trim().charAt(0).toUpperCase() || 'N'}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    {userPhotoURL ? (
                      <img
                        src={userPhotoURL}
                        alt={userName}
                        className="h-10 w-10 rounded-full border border-[#E5E5E5] object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-sm font-semibold text-[#171717]">
                        {userName.trim().charAt(0).toUpperCase() || 'N'}
                      </div>
                    )}
                    <p className="text-sm font-medium text-[#171717]">{userName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onLogout}
                    className="flex h-10 w-10 hover:cursor-pointer items-center justify-center rounded-xl border border-[#E5E5E5] bg-white text-[#6d665b] transition hover:border-[#FACC15] hover:bg-[#FEF9C3]"
                  >
                    <LogOut size={16} />
                  </button>
                </>
              )}
            </div>
            {sidebarCollapsed ? (
              <button
                type="button"
                onClick={onLogout}
                className="mt-3 hover:cursor-pointer flex w-full items-center justify-center rounded-xl border border-[#E5E5E5] bg-white py-2 text-[#6d665b] transition hover:border-[#FACC15] hover:bg-[#FEF9C3]"
              >
                <LogOut size={16} />
              </button>
            ) : null}
          </div>
        </aside>

        <section className="flex h-screen min-h-0 flex-col overflow-hidden bg-white">
          <header className="flex items-center justify-between border-b border-[#E5E5E5] px-6 py-4 md:px-8">
            <div className="rounded-full border border-[#E5E5E5] bg-white px-4 py-2 text-xs font-semibold tracking-[0.16em] text-[#817767] uppercase">
              {activeThread.locked ? 'Model notes' : 'Workspace'}
            </div>
            {userPhotoURL ? (
              <img
                src={userPhotoURL}
                alt={userName}
                className="h-10 w-10 rounded-full border border-[#E5E5E5] object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] text-sm font-medium text-white">
                {userName.trim().charAt(0).toUpperCase() || 'N'}
              </div>
            )}
          </header>

          <div className="flex min-h-0 flex-1 flex-col px-6 pb-6 pt-4 md:px-8">
            <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col">
              {showIntroState ? (
                <div className="flex flex-1 items-center justify-center">
                  <div className="w-full max-w-2xl text-center">
                    <p className="text-xs font-semibold tracking-[0.22em] text-[#8A7A62] uppercase">
                      New conversation
                    </p>
                    <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#171717] md:text-6xl">
                      Hello, <span className='bg-gradient-to-tr from-[#CA8A04] via-[#FACC15] to-[#A16207] bg-clip-text text-transparent'>{activeThread.intro}</span>
                    </h1>
                  </div>
                </div>
              ) : (
                <div ref={messagesRef} className="scrollbar-thin flex-1 overflow-y-auto">
                  <div className="mx-auto max-w-3xl space-y-6 pb-6">
                    {activeThread.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-[1.6rem] px-5 py-4 text-[15px] leading-7 md:max-w-2xl ${
                            message.role === 'user'
                              ? 'rounded-br-md bg-[#171717] text-white'
                              : 'rounded-bl-md border border-[#E5E5E5] bg-white text-[#171717]'
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#E5E5E5] bg-white p-4">
                  <textarea
                    ref={textareaRef}
                    className="scrollbar-thin max-h-[220px] min-h-[56px] w-full resize-none overflow-y-auto border-0 bg-transparent px-1 text-base leading-7 text-[#171717] outline-none"
                    placeholder={activeThread.locked ? 'Model notes are read-only.' : 'Message'}
                    value={draft}
                    disabled={activeThread.locked}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <div className="mt-4 flex items-center justify-between border-t border-[#E5E5E5] pt-3">
                    <div className="text-sm text-[#737373]">
                      {activeThread.locked ? 'Reference only' : 'Shift + Enter for a new line'}
                    </div>
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      disabled={activeThread.locked}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] hover:cursor-pointer text-white transition hover:bg-gradient-to-tr hover:from-[#CA8A04] hover:via-[#FACC15] hover:to-[#A16207] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      <ArrowUp size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* TODO: Add your model API base URL and chat endpoint wiring here so sent prompts create real assistant messages. */}
              {/* TODO: Add your provider auth/session link or SDK hookup here before connecting real model responses. */}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
