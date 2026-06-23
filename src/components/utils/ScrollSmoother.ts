import { ScrollTrigger } from "gsap/ScrollTrigger";

export class ScrollSmoother {
  private static instance: ScrollSmoother;

  static create(_options: any) {
    this.instance = new ScrollSmoother();
    return this.instance;
  }

  scrollTop(val: number) {
    if (val === 0) {
      window.scrollTo(0, 0);
    }
  }

  paused(state: boolean) {
    if (state) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.overflowY = "auto";
    }
  }

  scrollTo(target: any, smooth?: boolean, _position?: string) {
    let element: HTMLElement | null = null;
    if (typeof target === "string") {
      element = document.querySelector(target);
    } else if (target instanceof HTMLElement) {
      element = target;
    }
    if (element) {
      element.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start"
      });
    }
  }

  static refresh(_force?: boolean) {
    ScrollTrigger.refresh();
  }
}
