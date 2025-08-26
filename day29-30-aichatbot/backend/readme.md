# 🚦 Before Optimisation (Sequential Flow)

1. **Save user message in DB** — ~2s  
2. **Generate vector for user message** — ~3s  
3. **Query Pinecone for related memories** — ~5s  
4. **Save user message in Pinecone** — ~7s  
5. **Fetch chat history from DB** — ~2s  
6. **Generate response from the AI** — ~4s  
7. **Save AI response in DB** — ~2s  
8. **Generate vector for AI response** — ~3s  
9. **Send response to client**  

**Total user wait time (critical path):**  
2 + 3 + 5 + 7 + 2 + 4 = **23s before client sees a response**  

**Background ops after response:**  
Minimal (because everything was blocking before).  

---

# ⚡ After Optimisation (Parallel & Async Flow)

1. **Save user message in DB (2s) + Generate vector for user message (3s)** — run in **parallel**, so cost = **3s**  
2. **Save user message in Pinecone (7s)** — async, doesn’t block  
3. **Query Pinecone for related memories (5s) + Fetch chat history from DB (2s)** — parallel, so cost = **5s**  
4. **Generate response from AI** — ~4s  
5. **Send response to client** ✅  

**Total user wait time (critical path):**  
max(3, 5) + 4 = **9s before client sees a response**  

6. **Save AI response in DB (2s) + Generate vector for AI response (3s)** — async, runs after response is sent.  

---

# 📊 Comparison

| Stage                         | Before Optimisation | After Optimisation |
|-------------------------------|----------------------|---------------------|
| DB Save + Vector              | 5s                   | 3s (parallel)       |
| Retrieval (Pinecone + history)| 7s                   | 5s (parallel)       |
| AI Response                   | 4s                   | 4s                  |
| **Critical Path Total**       | **23s**              | **9s**              |
| Non-blocking background ops   | Minimal              | Pinecone save (7s) + AI response save/vector (3s) |

---

✅ **Result:**  
- User sees AI response in **9s instead of 23s**.  
- Background tasks still happen, but they no longer slow down the conversation.  
- The system feels **2.5x faster** to the user.  
