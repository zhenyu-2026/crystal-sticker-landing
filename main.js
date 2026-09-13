(function () {
  const cfg = window.SITE_CONFIG || {};
  const wa = (cfg.whatsappE164 || "0000000000").replace(/\D/g, "");
  const email = cfg.email || "hello@example.com";
  const waUrl = "https://wa.me/" + wa;
  const waText = encodeURIComponent(
    "Hi! I'm interested in custom crystal UV stickers. Could you share photos and options?"
  );
  const waUrlWithText = waUrl + "?text=" + waText;

  const ids = ["navWhatsApp", "heroWhatsApp", "pathWhatsApp", "contactWhatsApp"];
  ids.forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.href = waUrlWithText;
  });

  const mail = document.getElementById("contactEmail");
  if (mail) {
    mail.href = "mailto:" + email;
    mail.textContent = email;
  }
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
        "B2B inquiry — Crystal UV Stickers",
        "Name: " + (data.get("name") || ""),
        "Contact: " + (data.get("contact") || ""),
        "Interest: " + (data.get("interest") || ""),
        "Qty: " + (data.get("qty") || ""),
        "Country: " + (data.get("country") || ""),
        "Notes: " + (data.get("notes") || ""),
      ].join("\n");
      const mailto =
        "mailto:" +
        email +
        "?subject=" +
        encodeURIComponent("B2B inquiry — Crystal UV Stickers") +
        "&body=" +
        encodeURIComponent(body);
      window.location.href = mailto;
      if (success) success.classList.add("show");
    });
  }
})();
