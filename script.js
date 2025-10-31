// Mobile nav toggle (accessible)
;(() => {
  const toggle = document.querySelector(".nav-toggle")
  const nav = document.getElementById("site-nav")
  if (!toggle || !nav) return
  toggle.addEventListener("click", () => {
    const open = nav.getAttribute("data-open") === "true"
    nav.setAttribute("data-open", String(!open))
    toggle.setAttribute("aria-expanded", String(!open))
  })
})()

// Product gallery thumbs -> main image
;(() => {
  const mainImg = document.getElementById("mainImg")
  const thumbs = document.querySelectorAll(".thumb")
  if (!mainImg || !thumbs.length) return

  thumbs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-src")
      if (!src) return
      mainImg.src = src
      thumbs.forEach((b) => b.classList.remove("is-active"))
      btn.classList.add("is-active")
    })
  })
})()

// Cart quantity updates
;(() => {
  const table = document.querySelector(".cart-table")
  if (!table) return

  const updateRow = (tr) => {
    const priceCell = tr.querySelector("[data-price]")
    const qtyInput = tr.querySelector(".qty")
    const subtotalCell = tr.querySelector(".subtotal")
    if (!priceCell || !qtyInput || !subtotalCell) return

    const price = Number.parseFloat(priceCell.getAttribute("data-price") || "0")
    const qty = Math.max(1, Number.parseInt(qtyInput.value || "1", 10))
    const subtotal = (price * qty).toFixed(2)
    subtotalCell.textContent = `$${subtotal}`
  }

  const recalcTotals = () => {
    const subtotals = table.querySelectorAll(".subtotal")
    let sum = 0
    subtotals.forEach((td) => {
      const val = Number.parseFloat(td.textContent.replace(/[^0-9.]/g, "")) || 0
      sum += val
    })
    const sub = document.getElementById("cart-subtotal")
    const total = document.getElementById("cart-total")
    if (sub) sub.textContent = `$${sum.toFixed(2)}`
    if (total) total.textContent = `$${sum.toFixed(2)}`
  }

  table.addEventListener("input", (e) => {
    const target = e.target
    if (!(target instanceof HTMLInputElement) || !target.classList.contains("qty")) return
    const tr = target.closest("tr")
    if (!tr) return
    updateRow(tr)
    recalcTotals()
  })

  table.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove")
    if (!btn) return
    const tr = btn.closest("tr")
    if (tr) tr.remove()
    recalcTotals()
  })

  // Initial calc
  table.querySelectorAll("tbody tr").forEach(updateRow)
  recalcTotals()
})()
