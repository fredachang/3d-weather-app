export const fade = (enterDuration: number, delayDuration: number) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: enterDuration,
      delay: delayDuration,
      ease: "linear",
    },
  },
});
