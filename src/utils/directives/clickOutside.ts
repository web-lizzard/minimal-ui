export type BindingObject<T> = {
  value: T;
};

export type ClickOutsideBinding = () => void;

const controller = new AbortController();

export const clickOutside = {
  mounted(el: Element, binding: BindingObject<ClickOutsideBinding>) {
    document.addEventListener(
      'click',
      (e: MouseEvent) => {
        if (!binding.value) {
          return;
        }
        const isOutside = (e.target as HTMLElement).contains(el);
        isOutside && binding.value();
      },
      {
        signal: controller.signal,
      }
    );
  },
  unmounted() {
    controller.abort();
  },
};
