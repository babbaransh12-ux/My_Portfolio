export class SplitText {
  elements: HTMLElement[] = [];
  originalHTMLs: string[] = [];
  words: HTMLElement[] = [];
  chars: HTMLElement[] = [];

  constructor(target: any, options?: { type?: string; linesClass?: string }) {
    if (typeof target === 'string') {
      this.elements = Array.from(document.querySelectorAll(target));
    } else if (Array.isArray(target)) {
      target.forEach(t => {
        if (typeof t === 'string') {
          this.elements.push(...Array.from(document.querySelectorAll<HTMLElement>(t)));
        } else if (t instanceof HTMLElement) {
          this.elements.push(t);
        }
      });
    } else if (target instanceof HTMLElement) {
      this.elements = [target];
    } else if (target instanceof NodeList) {
      this.elements = Array.from(target) as HTMLElement[];
    }

    this.elements.forEach(el => {
      this.originalHTMLs.push(el.innerHTML);
    });

    const type = options?.type || "words,chars";
    const wantChars = type.includes("chars");

    this.elements.forEach(el => {
      const text = el.textContent || "";
      el.innerHTML = "";

      const wordsArray = text.split(/(\s+)/);
      wordsArray.forEach(wordOrSpace => {
        if (wordOrSpace.trim() === "") {
          el.appendChild(document.createTextNode(wordOrSpace));
        } else {
          const wordWrapper = document.createElement("span");
          wordWrapper.className = options?.linesClass || "split-line";
          wordWrapper.style.display = "inline-block";
          wordWrapper.style.overflow = "hidden";
          wordWrapper.style.verticalAlign = "bottom";

          const wordSpan = document.createElement("span");
          wordSpan.className = "split-word";
          wordSpan.style.display = "inline-block";

          if (wantChars) {
            const charsArray = wordOrSpace.split("");
            charsArray.forEach(char => {
              const charSpan = document.createElement("span");
              charSpan.className = "split-char";
              charSpan.style.display = "inline-block";
              charSpan.textContent = char;
              wordSpan.appendChild(charSpan);
              this.chars.push(charSpan);
            });
          } else {
            wordSpan.textContent = wordOrSpace;
          }

          wordWrapper.appendChild(wordSpan);
          el.appendChild(wordWrapper);
          this.words.push(wordSpan);
        }
      });
    });
  }

  revert() {
    this.elements.forEach((el, index) => {
      el.innerHTML = this.originalHTMLs[index];
    });
  }
}
