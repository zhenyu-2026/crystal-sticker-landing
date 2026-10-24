(function () {
  const cfg = window.SITE_CONFIG || {};
  const wa = (cfg.whatsappE164 || "0000000000").replace(/\D/g, "");

  function decodeEmail(config) {
    const user = config && config.emailUser;
    const host = config && config.emailHost;
    if (typeof user !== "string" || typeof host !== "string") return "";
    if (!user || !host) return "";
    return user + "@" + host;
  }

  const email = decodeEmail(cfg);

  function sanitizeSource(raw) {
    if (!raw || typeof raw !== "string") return "";
    const cleaned = raw.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
    return cleaned.slice(0, 48);
  }

  function getLeadSource() {
    const params = new URLSearchParams(window.location.search);
    const fromUrl =
      sanitizeSource(params.get("src")) || sanitizeSource(params.get("utm_source"));
    if (fromUrl) return fromUrl;
    return sanitizeSource(cfg.defaultSource) || "website";
  }

  const leadSource = getLeadSource();
  const viaLabel = "via:" + leadSource;

  function buildWhatsAppText(context) {
    const lines = [
      "Hi! I'm interested in your crystal UV stickers / UV-DTF printers.",
      "Context: " + (context || "general inquiry"),
      viaLabel,
    ];
    return lines.join("\n");
  }

  function waHref(context) {
    const text = encodeURIComponent(buildWhatsAppText(context));
    return "https://wa.me/" + wa + "?text=" + text;
  }

  const waLinks = [
    { id: "navWhatsApp", context: "nav" },
    { id: "heroWhatsApp", context: "hero" },
    { id: "pathWhatsApp", context: "B2C custom stickers" },
    { id: "printerWhatsApp", context: "UV printer quote" },
    { id: "contactWhatsApp", context: "contact footer" },
  ];
  waLinks.forEach(function (item) {
    const el = document.getElementById(item.id);
    if (el) el.href = waHref(item.context);
  });

  document.querySelectorAll("[data-wa-context]").forEach(function (el) {
    const ctx = el.getAttribute("data-wa-context") || "general";
    el.href = waHref(ctx);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  const mail = document.getElementById("contactEmail");
  if (mail) {
    mail.textContent = "Email us";
    if (email) {
      const subject = "Inquiry — Crystal UV & UV Printers (" + viaLabel + ")";
      const body =
        "Hello,\n\nI'd like a quote or sample info.\n\n" + viaLabel + "\n";
      mail.href =
        "mailto:" +
        email +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
    }
  }

  const sourceNote = document.getElementById("sourceNote");
  if (sourceNote) sourceNote.textContent = "Lead tag on WhatsApp & email: " + viaLabel;

  if (cfg.brand) {
    const b = document.getElementById("brandName");
    if (b) b.textContent = cfg.brand;
  }
  if (cfg.factoryTag) {
    const t = document.getElementById("factoryTag");
    if (t) t.textContent = cfg.factoryTag;
  }

  const form = document.getElementById("inquiryForm");
  const success = document.getElementById("formSuccess");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const body = [
        "B2B inquiry — Crystal UV Stickers & UV Printers",
        viaLabel,
        "Name: " + (data.get("name") || ""),
        "Contact: " + (data.get("contact") || ""),
        "Interest: " + (data.get("interest") || ""),
        "Qty: " + (data.get("qty") || ""),
        "Country: " + (data.get("country") || ""),
        "Notes: " + (data.get("notes") || ""),
      ].join("\n");
      if (!email) return;
      const mailto =
        "mailto:" +
        email +
        "?subject=" +
        encodeURIComponent("B2B inquiry (" + viaLabel + ")") +
        "&body=" +
        encodeURIComponent(body);
      window.location.href = mailto;
      if (success) success.classList.add("show");
    });
  }
})();
