const download = document.querySelector(".download");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");

dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("change", handleSize);
shareBtn.addEventListener("click", handleShare);

const defaultUrl = "https://arrghe64.github.io/CV-Dev/";
let colorLight = "#fff";
let colorDark = "#000";
let text = "defaultUrl";
let size = 300;

function handleDarkColor(e) {
   colorDark = e.target.value;
   generateQRCode();
}

function handleLightColor(e) {
   colorLight = e.target.value;
   generateQRCode();
}

function handleQRText(e) {
   const value = e.target.value;
   text = value;
   if (!value) {
      text = defaultUrl;
   }
   generateQRCode();
}

async function generateQRCode() {
   qrContainer.innerHTML = "";
   new QRCode("qr-code", {
      text,
      height: size,
      width: size,
      colorLight,
      colorDark,
   });
   download.href = await resolveDataUrl();
}

async function handleShare() {
   setTimeout(async () => {
      try {
         const base64url = await resolveDataUrl();
         const blob = await (await fetch(base64url)).blob();
         const file = new File([blob], "QRCode.png", {
            type: blob.type,
         });
         await navigator.share({
            files: [file],
            title: text,
         });
      } catch (error) {
         alert("Votre navigateur ne supporte pas le partage.")
      }
   }, 100);
}

function handleSize(e) {
   size = e.target.value;
   generateQRCode();
}

function resolveDataUrl() {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         const img = document.querySelector("#qr-code img");
         if (img.currentSrc) {
            resolve(img.currentSrc);
            return;
         }
         const convas = document.querySelector("canvas");
         resolve(canvas.toDataUrl());
      }, 50);
   });
}
generateQRCode();