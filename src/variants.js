export const fade = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    transition: {
      ease: 'easeInOut',
      opacity: 0,
    },
  },
};

export const sidebarSlideIn = {
  hidden: {
    x: '-100%',
  },
  visible: {
    x: 0,
  },
};

export const moveHeaderContent = {
  initial: {
    paddingLeft: 0,
  },
  right: {
    paddingLeft: '250px',
  },
};

export const rotate180 = {
  rotate180: {
    rotate: 180,
  },
  rotate0: {
    rotate: 0,
  },
};
