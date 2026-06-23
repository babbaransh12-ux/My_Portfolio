import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export class SplitText {
  elements: HTMLElement[] = [];
  originalHTMLs: string[] = [];
  words: HTMLElement[] = [];
  chars: HTMLElement[] = [];

  constructor(target: any, options: { type?: string; linesClass?: string } = {}) {
    if (typeof target === "string") {
      this.elements = Array.from(document.querySelectorAll(target));
    } else if (Array.isArray(target)) {
      target.forEach((t) => {
        if (typeof t === "string") {
          this.elements.push(...Array.from(document.querySelectorAll(t)));
        } else if (t instanceof HTMLElement) {
          this.elements.push(t);
        }
      });
    } else if (target instanceof HTMLElement) {
      this.elements = [target];
    } else if (target instanceof NodeList) {
      this.elements = Array.from(target) as HTMLElement[];
    }

    this.elements.forEach((el) => {
      this.originalHTMLs.push(el.innerHTML);
      this.split(el, options);
    });
  }

  split(el: HTMLElement, options: { type?: string; linesClass?: string }) {
    const text = el.textContent || "";
    const type = options.type || "chars,words,lines";
    const linesClass = options.linesClass || "split-line";

    el.innerHTML = "";

    // Split into characters (with nested word structures to handle overflow hidden animation)
    if (type.includes("chars")) {
      const words = text.split(/(\s+)/);
      words.forEach((word) => {
        if (/\s+/.test(word)) {
          el.appendChild(document.createTextNode(word));
          return;
        }

        const wordWrapper = document.createElement("span");
        wordWrapper.className = linesClass;
        wordWrapper.style.display = "inline-block";
        wordWrapper.style.overflow = "hidden";
        wordWrapper.style.verticalAlign = "top";

        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";

        for (let i = 0; i < word.length; i++) {
          const charSpan = document.createElement("span");
          charSpan.style.display = "inline-block";
          charSpan.textContent = word[i];
          wordSpan.appendChild(charSpan);
          this.chars.push(charSpan);
        }

        wordWrapper.appendChild(wordSpan);
        el.appendChild(wordWrapper);
      });
    } else if (type.includes("words")) {
      // Split into words
      const words = text.split(/(\s+)/);
      words.forEach((word) => {
        if (/\s+/.test(word)) {
          el.appendChild(document.createTextNode(word));
          return;
        }

        const wordWrapper = document.createElement("span");
        wordWrapper.className = linesClass;
        wordWrapper.style.display = "inline-block";
        wordWrapper.style.overflow = "hidden";
        wordWrapper.style.verticalAlign = "top";

        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.textContent = word;

        wordWrapper.appendChild(wordSpan);
        el.appendChild(wordWrapper);
        this.words.push(wordSpan);
      });
    }
  }

  revert() {
    this.elements.forEach((el, index) => {
      el.innerHTML = this.originalHTMLs[index];
    });
  }
}

export class ScrollSmoother {
  static create(options: any) {
    return new ScrollSmoother();
  }

  static refresh(value?: boolean) {
    ScrollTrigger.refresh();
  }

  scrollTop(value?: number) {
    if (value !== undefined) {
      window.scrollTo({ top: value });
    }
    return window.scrollY;
  }

  paused(value?: boolean) {
    if (value !== undefined) {
      document.body.style.overflowY = value ? "hidden" : "auto";
    }
    return document.body.style.overflowY === "hidden";
  }

  scrollTo(target: any, smooth?: boolean, position?: string) {
    if (typeof target === "string") {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
      }
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
    }
  }
}
